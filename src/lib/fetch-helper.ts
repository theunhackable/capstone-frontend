// src/utils/fetchHelper.ts
const API_BASE_URL = "http://localhost:5000"; // Flask backend URL

// Track refresh state to avoid multiple refresh requests
let isRefreshing = false;
let failedQueue: any[] = [];

// Process failed requests after refresh
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Fetch helper with auto-refresh logic
const fetchHelper = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem("access_token");

  // Add Authorization header if access token is available
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  // Merge headers and options
  const finalOptions = {
    ...options,
    headers: { ...headers, ...options.headers },
  };

  try {
    let res = await fetch(`${API_BASE_URL}${url}`, finalOptions);

    // Check for 401 - Token expired, try refreshing
    if (res.status === 401 && !options._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            finalOptions.headers = {
              ...finalOptions.headers,
              Authorization: `Bearer ${token}`,
            };
            return fetch(`${API_BASE_URL}${url}`, finalOptions);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      options._retry = true;

      try {
        const newAccessToken = await refreshToken();
        finalOptions.headers.Authorization = `Bearer ${newAccessToken}`;
        res = await fetch(`${API_BASE_URL}${url}`, finalOptions);
      } catch (err) {
        console.error("Token refresh failed", err);
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

// Refresh token function
const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token available. Please log in.");
  }

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh token. Please log in again.");
  }

  const data = await res.json();
  const newAccessToken = data.access_token;
  const newRefreshToken = data.refresh_token;

  // Update tokens in localStorage
  localStorage.setItem("access_token", newAccessToken);
  localStorage.setItem("refresh_token", newRefreshToken);

  processQueue(null, newAccessToken);
  return newAccessToken;
};

export default fetchHelper;

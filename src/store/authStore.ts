import { AuthData, AuthState } from "@/types";
import { create } from "zustand";

const useAuthStore = create<AuthState>((set) => ({
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  access_token:
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken") || null
      : null,
  refresh_token:
    typeof window !== "undefined"
      ? localStorage.getItem("refreshToken") || null
      : null,

  setAuth: (authData: AuthData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(authData.user));

      localStorage.setItem("accessToken", authData.access_token as string);
      localStorage.setItem("refreshToken", authData.refresh_token as string);
    }
    set({
      user: authData.user,
      access_token: authData.access_token,
      refresh_token: authData.refresh_token,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    set({ user: null, access_token: null, refresh_token: null });
  },
}));

export default useAuthStore;

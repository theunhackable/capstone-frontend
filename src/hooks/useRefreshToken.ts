import axios from "@/api/axios";

import useAuthStore from "@/store/authStore";
import { AccessToken } from "@/types";

const useRefreshToken = () => {
  const { setAuth, refresh_token, user } = useAuthStore();

  const refresh = async () => {
    try {
      const response = await axios.get<AccessToken>("/auth/refresh", {
        headers: {
          Authorization: `Bearer: ${refresh_token}`,
        },
      });

      setAuth({
        refresh_token,
        access_token: response.data.access_token,
        user,
      });

      console.log("New Access Token:", response.data.access_token);

      return response.data.access_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;

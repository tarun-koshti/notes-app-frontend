import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

const userService = {
  getMyProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No Token Found, Please Login Again.");
      }
      const result = await axios.get(`${baseUrl}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  updateMyProfile: async (payload) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No Token Found.");
      }
      const result = await axios.patch(`${baseUrl}/api/users/me`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};
export default userService;

import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

const authenticationService = {
  signup: async (payload) => {
    try {
      const result = await axios.post(
        `${baseUrl}/api/users/signup`,
        payload
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (payload) => {
    try {
      const result = await axios.post(
        `${baseUrl}/api/users/login`,
        payload
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  verifyOtp: async (payload) => {
    try {
      const result = await axios.post(
        `${baseUrl}/api/users/verifyOtp`,
        payload
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (payload) => {
    try {
      const result = await axios.patch(
        `${baseUrl}/authentication/update-password`,
        payload
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
    return true;
  },
  getToken: () => {
    const token = localStorage.getItem("token");
    return token;
  },
};

export default authenticationService;

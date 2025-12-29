import api from "./api";

/**
 * Auth related API calls
 */

const authService = {
  /**
   * Login user
   */
  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  },

  /**
   * Register user
   */
  register: async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem("token");
  }
};

export default authService;

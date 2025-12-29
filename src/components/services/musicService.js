import api from "./api";

/**
 * Music related API calls
 */

const musicService = {
  /**
   * Fetch all songs
   */
  getAllSongs: async () => {
    const res = await api.get("/music");
    return res.data;
  },

  /**
   * Fetch single song by ID
   */
  getSongById: async (id) => {
    const res = await api.get(`/music/${id}`);
    return res.data;
  },

  /**
   * Upload a new song (Admin)
   */
  uploadSong: async (formData) => {
    const res = await api.post("/music/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  }
};

export default musicService;

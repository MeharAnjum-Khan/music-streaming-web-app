import api from "./api";

/**
 * Podcast related API calls
 */

const podcastService = {
  /**
   * Fetch all podcasts
   */
  getAllPodcasts: async () => {
    const res = await api.get("/podcasts");
    return res.data;
  },

  /**
   * Fetch podcast by ID
   */
  getPodcastById: async (id) => {
    const res = await api.get(`/podcasts/${id}`);
    return res.data;
  },

  /**
   * Upload new podcast (Admin)
   */
  uploadPodcast: async (formData) => {
    const res = await api.post("/podcasts/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  }
};

export default podcastService;

import api from "./api";

/**
 * Playlist related API calls
 */

const playlistService = {
  /**
   * Get all playlists of user
   */
  getUserPlaylists: async () => {
    const res = await api.get("/playlists");
    return res.data;
  },

  /**
   * Get playlist by ID
   */
  getPlaylistById: async (id) => {
    const res = await api.get(`/playlists/${id}`);
    return res.data;
  },

  /**
   * Create new playlist
   */
  createPlaylist: async (data) => {
    const res = await api.post("/playlists", data);
    return res.data;
  },

  /**
   * Add song to playlist
   */
  addSongToPlaylist: async (playlistId, songId) => {
    const res = await api.post(`/playlists/${playlistId}/songs`, {
      songId
    });
    return res.data;
  }
};

export default playlistService;

// Central place to fetch music data (API / mock / static)
export const musicService = {
  getAllSongs: async () => {
    // Later you can replace this with API call
    return [
      {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        audioUrl: "/songs/blinding-lights.mp3",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop",
      },
      {
        id: 2,
        title: "Shape of You",
        artist: "Ed Sheeran",
        audioUrl: "/songs/shape-of-you.mp3",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      },
    ];
  },
};

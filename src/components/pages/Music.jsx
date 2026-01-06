import { useEffect, useState } from "react";

// ✅ Correct path: pages → components → src → services
//import { musicService } from "../../services/musicService";
import { musicService } from "../services/musicService";


// ✅ Correct path: pages → components → MusicCard
import MusicCard from "../MusicCard";


const Music = () => {
  const [songs, setSongs] = useState([]);

  // ✅ Fetch songs once when component loads
  useEffect(() => {
    musicService.getAllSongs().then((data) => {
      setSongs(data);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Your Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {songs.map((song) => (
          <MusicCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Music;

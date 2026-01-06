import { FaPlay } from "react-icons/fa";

// ✅ FIXED PATH
import { usePlayer } from "./context/PlayerContext";

const MusicCard = ({ song, playlist, onClick }) => {
  const { playSong } = usePlayer();

  // Handle both song and playlist data structures
  const displayData = song || playlist;

  if (!displayData) {
    return null; // Or some fallback UI
  }

  const title = displayData.title || "Unknown Title";
  const subtitle = song ? song.artist : (playlist ? `${playlist.songs} Songs` : "");
  const cover = song ? song.cover : (playlist ? playlist.image : "");

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (song) {
      playSong(song);
    }
  };

  return (
    <div 
      className="group bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 cursor-pointer border border-white/5 hover:border-white/20 relative" 
      onClick={handleClick}
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg shadow-lg">
        <img 
          src={cover} 
          alt={title} 
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
        />
        {song && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                playSong(song);
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-white p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
            >
              <FaPlay />
            </button>
          </div>
        )}
      </div>
      
      <h4 className="font-bold text-lg truncate mb-1">{title}</h4>
      <p className="text-slate-400 text-sm truncate">{subtitle}</p>
    </div>
  );
};

export default MusicCard;


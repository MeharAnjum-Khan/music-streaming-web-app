import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { musicService } from "../services/musicService";
import MusicCard from "../MusicCard";
import { Search as SearchIcon, Home, Music as MusicIcon, Library, Podcast } from "lucide-react";

const Search = () => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    musicService.getAllSongs().then((data) => {
      setSongs(data);
      setFilteredSongs(data);
    });
  }, []);

  useEffect(() => {
    const results = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSongs(results);
  }, [searchQuery, songs]);

  return (
    <div className="p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-6">Search</h1>
        <div className="relative max-w-2xl group">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for songs or artists..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-lg shadow-2xl"
          />
        </div>
      </header>

      <section>
        {filteredSongs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredSongs.map((song) => (
              <MusicCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <SearchIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-xl text-slate-400">
              No results found for "<span className="text-white italic">{searchQuery}</span>"
            </p>
            <p className="text-slate-500 mt-2 text-sm">Try searching for something else</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Search;

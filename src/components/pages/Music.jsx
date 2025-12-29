// import React, { useState, useRef, useEffect } from 'react';
// import './Music.css';

// const Music = () => {
//   // State for player controls
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(70);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [isShuffled, setIsShuffled] = useState(false);
//   const [isRepeating, setIsRepeating] = useState(false);
//   const [playlistOpen, setPlaylistOpen] = useState(false);
  
//   // Mock music data
//   const [playlist, setPlaylist] = useState([
//     {
//       id: 1,
//       title: 'Midnight City',
//       artist: 'M83',
//       album: 'Hurry Up, We\'re Dreaming',
//       duration: '4:04',
//       cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     },
//     {
//       id: 2,
//       title: 'Blinding Lights',
//       artist: 'The Weeknd',
//       album: 'After Hours',
//       duration: '3:22',
//       cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     },
//     {
//       id: 3,
//       title: 'Levitating',
//       artist: 'Dua Lipa',
//       album: 'Future Nostalgia',
//       duration: '3:24',
//       cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     },
//     {
//       id: 4,
//       title: 'Good 4 U',
//       artist: 'Olivia Rodrigo',
//       album: 'SOUR',
//       duration: '2:58',
//       cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     },
//     {
//       id: 5,
//       title: 'Stay',
//       artist: 'The Kid LAROI, Justin Bieber',
//       album: 'F*CK LOVE 3',
//       duration: '2:23',
//       cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     },
//     {
//       id: 6,
//       title: 'Heat Waves',
//       artist: 'Glass Animals',
//       album: 'Dreamland',
//       duration: '3:59',
//       cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     }
//   ]);
  
//   // Audio player reference
//   const audioRef = useRef(null);
  
//   // Current track
//   const currentTrack = playlist[currentTrackIndex];
  
//   // Handle play/pause
//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
    
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//     }
//   };
  
//   // Handle next track
//   const playNextTrack = () => {
//     if (isShuffled) {
//       // Play random track
//       const randomIndex = Math.floor(Math.random() * playlist.length);
//       setCurrentTrackIndex(randomIndex);
//     } else {
//       // Play next in order
//       setCurrentTrackIndex((prevIndex) => 
//         prevIndex === playlist.length - 1 ? 0 : prevIndex + 1
//       );
//     }
    
//     setIsPlaying(true);
//   };
  
//   // Handle previous track
//   const playPreviousTrack = () => {
//     if (currentTime > 3) {
//       // If track has been playing for more than 3 seconds, restart it
//       setCurrentTime(0);
//       if (audioRef.current) {
//         audioRef.current.currentTime = 0;
//       }
//     } else {
//       // Otherwise go to previous track
//       setCurrentTrackIndex((prevIndex) => 
//         prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
//       );
//     }
    
//     setIsPlaying(true);
//   };
  
//   // Handle time update
//   const handleTimeUpdate = () => {
//     if (audioRef.current) {
//       setCurrentTime(audioRef.current.currentTime);
//       setDuration(audioRef.current.duration || 0);
//     }
//   };
  
//   // Handle seek
//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
    
//     if (audioRef.current) {
//       audioRef.current.currentTime = newTime;
//     }
//   };
  
//   // Handle volume change
//   const handleVolumeChange = (e) => {
//     const newVolume = parseInt(e.target.value);
//     setVolume(newVolume);
    
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume / 100;
//     }
//   };
  
//   // Format time in MM:SS
//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };
  
//   // Handle track selection from playlist
//   const selectTrack = (index) => {
//     setCurrentTrackIndex(index);
//     setIsPlaying(true);
//   };
  
//   // Simulate audio playback with useEffect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (isPlaying && audioRef.current) {
//         if (currentTime >= duration && duration > 0) {
//           if (isRepeating) {
//             // Repeat the same track
//             setCurrentTime(0);
//             if (audioRef.current) {
//               audioRef.current.currentTime = 0;
//               audioRef.current.play();
//             }
//           } else {
//             // Play next track
//             playNextTrack();
//           }
//         } else if (isPlaying) {
//           setCurrentTime(prev => prev + 0.5);
//         }
//       }
//     }, 500);
    
//     return () => clearInterval(interval);
//   }, [isPlaying, currentTime, duration, isRepeating, isShuffled]);
  
//   return (
//     <div className="music-container">
//       <header className="music-header">
//         <h1>Music Player</h1>
//         <p>Now playing: {currentTrack.title} by {currentTrack.artist}</p>
//       </header>
      
//       <div className="music-player">
//         <div className="player-main">
//           <div className="album-art">
//             <div className="album-cover">
//               <img src={currentTrack.cover} alt={currentTrack.album} />
//               <div className="vinyl-record"></div>
//               <div className={`spin-animation ${isPlaying ? 'spinning' : ''}`}></div>
//             </div>
            
//             <div className="track-info">
//               <h2 className="track-title">{currentTrack.title}</h2>
//               <p className="track-artist">{currentTrack.artist}</p>
//               <p className="track-album">{currentTrack.album}</p>
              
//               <div className="progress-section">
//                 <div className="time-display">
//                   <span>{formatTime(currentTime)}</span>
//                   <span>{formatTime(duration)}</span>
//                 </div>
//                 <input
//                   type="range"
//                   min="0"
//                   max={duration || 100}
//                   value={currentTime}
//                   onChange={handleSeek}
//                   className="progress-bar"
//                 />
//               </div>
//             </div>
//           </div>
          
//           <div className="player-controls">
//             <div className="control-buttons">
//               <button 
//                 className={`control-btn ${isShuffled ? 'active' : ''}`}
//                 onClick={() => setIsShuffled(!isShuffled)}
//                 title="Shuffle"
//               >
//                 <i className="shuffle-icon">↪</i>
//               </button>
              
//               <button 
//                 className="control-btn"
//                 onClick={playPreviousTrack}
//                 title="Previous"
//               >
//                 <i className="prev-icon">⏮</i>
//               </button>
              
//               <button 
//                 className="play-btn"
//                 onClick={togglePlay}
//                 title={isPlaying ? 'Pause' : 'Play'}
//               >
//                 {isPlaying ? '⏸' : '▶'}
//               </button>
              
//               <button 
//                 className="control-btn"
//                 onClick={playNextTrack}
//                 title="Next"
//               >
//                 <i className="next-icon">⏭</i>
//               </button>
              
//               <button 
//                 className={`control-btn ${isRepeating ? 'active' : ''}`}
//                 onClick={() => setIsRepeating(!isRepeating)}
//                 title="Repeat"
//               >
//                 <i className="repeat-icon">🔁</i>
//               </button>
//             </div>
            
//             <div className="volume-control">
//               <i className="volume-icon">🔊</i>
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={volume}
//                 onChange={handleVolumeChange}
//                 className="volume-slider"
//               />
//               <span className="volume-percent">{volume}%</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="playlist-section">
//           <div className="playlist-header">
//             <h3>Playlist ({playlist.length} songs)</h3>
//             <button 
//               className="toggle-playlist-btn"
//               onClick={() => setPlaylistOpen(!playlistOpen)}
//             >
//               {playlistOpen ? '▼ Hide' : '▲ Show'} Playlist
//             </button>
//           </div>
          
//           {playlistOpen && (
//             <div className="playlist">
//               {playlist.map((track, index) => (
//                 <div 
//                   key={track.id} 
//                   className={`playlist-item ${index === currentTrackIndex ? 'active' : ''}`}
//                   onClick={() => selectTrack(index)}
//                 >
//                   <div className="item-number">{index + 1}</div>
//                   <div className="item-cover">
//                     <img src={track.cover} alt={track.album} />
//                   </div>
//                   <div className="item-info">
//                     <h4>{track.title}</h4>
//                     <p>{track.artist}</p>
//                   </div>
//                   <div className="item-duration">{track.duration}</div>
//                   <div className="item-status">
//                     {index === currentTrackIndex && (
//                       isPlaying ? '▶ Now Playing' : '⏸ Paused'
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Hidden audio element for simulation */}
//       <audio 
//         ref={audioRef}
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
//         style={{ display: 'none' }}
//       />
      
//       <div className="music-stats">
//         <div className="stat-card">
//           <h4>Total Listening Time</h4>
//           <p className="stat-value">42 hours</p>
//         </div>
//         <div className="stat-card">
//           <h4>Most Played Artist</h4>
//           <p className="stat-value">The Weeknd</p>
//         </div>
//         <div className="stat-card">
//           <h4>Favorite Genre</h4>
//           <p className="stat-value">Pop / Electronic</p>
//         </div>
//         <div className="stat-card">
//           <h4>Playlist Count</h4>
//           <p className="stat-value">6</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Music;


import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Play, 
  Pause, 
  Heart, 
  MoreVertical,
  Download,
  Share2,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Music as MusicIcon
} from 'lucide-react';

const Music = () => {
  // ========== STATE MANAGEMENT ==========
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [musicLibrary, setMusicLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // ========== MOCK DATA ==========
  const genres = ['all', 'pop', 'rock', 'hip-hop', 'jazz', 'electronic', 'classical', 'indie'];
  
  const mockSongs = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      genre: "pop",
      duration: "3:20",
      release: "2020",
      plays: "2.1B",
      liked: true,
      explicit: true
    },
    {
      id: 2,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      genre: "rock",
      duration: "5:55",
      release: "1975",
      plays: "1.8B",
      liked: true,
      explicit: false
    },
    {
      id: 3,
      title: "God's Plan",
      artist: "Drake",
      album: "Scorpion",
      genre: "hip-hop",
      duration: "3:19",
      release: "2018",
      plays: "1.5B",
      liked: false,
      explicit: true
    },
    {
      id: 4,
      title: "Take Five",
      artist: "Dave Brubeck",
      album: "Time Out",
      genre: "jazz",
      duration: "5:24",
      release: "1959",
      plays: "850M",
      liked: true,
      explicit: false
    },
    {
      id: 5,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      genre: "rock",
      duration: "8:02",
      release: "1971",
      plays: "1.2B",
      liked: false,
      explicit: false
    },
    {
      id: 6,
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep",
      genre: "pop",
      duration: "3:14",
      release: "2019",
      plays: "1.7B",
      liked: true,
      explicit: true
    },
    {
      id: 7,
      title: "Moonlight Sonata",
      artist: "Ludwig van Beethoven",
      album: "Piano Sonata No. 14",
      genre: "classical",
      duration: "15:00",
      release: "1801",
      plays: "650M",
      liked: false,
      explicit: false
    },
    {
      id: 8,
      title: "Midnight City",
      artist: "M83",
      album: "Hurry Up, We're Dreaming",
      genre: "electronic",
      duration: "4:04",
      release: "2011",
      plays: "980M",
      liked: true,
      explicit: false
    }
  ];

  // ========== LIFECYCLE HOOKS ==========
  useEffect(() => {
    // Simulate API call
    const fetchMusic = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setMusicLibrary(mockSongs);
      setFavorites(mockSongs.filter(song => song.liked));
      setLoading(false);
    };
    fetchMusic();
  }, []);

  // ========== EVENT HANDLERS ==========
  const handlePlayPause = (songId) => {
    if (currentPlaying === songId) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(songId);
    }
  };

  const handleToggleFavorite = (songId) => {
    setFavorites(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  // ========== FILTERED MUSIC ==========
  const filteredMusic = musicLibrary.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/4"></div>
          <div className="h-12 bg-slate-800 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-800 rounded"></div>)}
          </div>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 md:p-8">
      {/* ========== HEADER ========== */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Music Library
          </span>
        </h1>
        <p className="text-slate-400">Browse and play your favorite tracks</p>
      </header>

      {/* ========== STATS CARDS ========== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Songs</p>
              <p className="text-2xl font-bold">{musicLibrary.length}</p>
            </div>
            <MusicIcon className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Favorites</p>
              <p className="text-2xl font-bold">{favorites.length}</p>
            </div>
            <Heart className="w-8 h-8 text-rose-400" />
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Most Played</p>
              <p className="text-2xl font-bold">2.1B</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Duration</p>
              <p className="text-2xl font-bold">44:30</p>
            </div>
            <Clock className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* ========== SEARCH AND FILTERS ========== */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search songs, artists, or albums..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>
          
          {/* Genre Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={selectedGenre}
              onChange={(e) => handleGenreSelect(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              {genres.map(genre => (
                <option key={genre} value={genre} className="bg-slate-900">
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ========== MUSIC TABLE ========== */}
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-slate-400 font-medium">#</th>
                <th className="text-left p-4 text-slate-400 font-medium">Title</th>
                <th className="text-left p-4 text-slate-400 font-medium">Album</th>
                <th className="text-left p-4 text-slate-400 font-medium">Genre</th>
                <th className="text-left p-4 text-slate-400 font-medium">Release</th>
                <th className="text-left p-4 text-slate-400 font-medium">Plays</th>
                <th className="text-left p-4 text-slate-400 font-medium">Duration</th>
                <th className="text-left p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMusic.map((song, index) => (
                <tr 
                  key={song.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="text-slate-400 mr-3 w-6">{index + 1}</span>
                      <button 
                        onClick={() => handlePlayPause(song.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
                      >
                        {currentPlaying === song.id ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded mr-3 flex items-center justify-center">
                        <MusicIcon className="w-5 h-5 text-white/70" />
                      </div>
                      <div>
                        <div className="font-medium flex items-center">
                          {song.title}
                          {song.explicit && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-slate-700 rounded text-slate-300">
                              E
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-slate-400">{song.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">{song.album}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300">
                      {song.genre}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                      {song.release}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-slate-300">{song.plays}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      {song.duration}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleToggleFavorite(song.id)}
                        className={`p-2 rounded-full ${favorites.includes(song.id) ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'}`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(song.id) ? 'fill-rose-400' : ''}`} />
                      </button>
                      <button className="p-2 rounded-full text-slate-400 hover:text-white">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full text-slate-400 hover:text-white">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full text-slate-400 hover:text-white">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* ========== EMPTY STATE ========== */}
        {filteredMusic.length === 0 && (
          <div className="p-8 text-center">
            <MusicIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No songs found</h3>
            <p className="text-slate-500">
              {searchQuery ? `No results for "${searchQuery}"` : 'Try changing your filters'}
            </p>
          </div>
        )}
      </div>

      {/* ========== GENRE TAGS ========== */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Browse by Genre</h3>
        <div className="flex flex-wrap gap-2">
          {genres.filter(g => g !== 'all').map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              className={`px-4 py-2 rounded-full transition ${
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Music;
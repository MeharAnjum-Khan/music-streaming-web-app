
// // Import React and necessary hooks
// import React, { useState, useEffect } from 'react';
// // Import routing utilities for navigation
// import { Link } from 'react-router-dom';
// // Import icons from lucide-react
// import { 
//   Music, 
//   Podcast, 
//   Home as HomeIcon, 
//   Search, 
//   Library, 
//   User, 
//   Play, 
//   Pause, 
//   Heart, 
//   MoreVertical,
//   TrendingUp,
//   Clock,
//   Shuffle,
//   SkipBack,
//   SkipForward,
//   Volume2
// } from 'lucide-react';
// // Import custom components (to be created later)
// //import MusicCard from '../components/MusicCard';
// //import Player from '../components/Player/AudioPlayer';

// const Home = () => {
//   // ========== STATE MANAGEMENT ==========
  
//   // State for controlling audio playback
//   const [isPlaying, setIsPlaying] = useState(false);
//   // State for currently playing track
//   const [currentTrack, setCurrentTrack] = useState(null);
//   // State for search query
//   const [searchQuery, setSearchQuery] = useState('');
//   // State for loading status
//   const [loading, setLoading] = useState(true);
//   // State for user's favorite tracks
//   const [favorites, setFavorites] = useState([]);
//   // State for recently played tracks
//   const [recentlyPlayed, setRecentlyPlayed] = useState([]);
//   // State for featured playlists
//   const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
//   // State for new releases
//   const [newReleases, setNewReleases] = useState([]);

//   // ========== MOCK DATA ==========
//   // In production, this data would come from Firebase/API
  
//   // Mock data for featured playlists
//   const mockPlaylists = [
//     {
//       id: 1,
//       title: "Today's Top Hits",
//       description: "The biggest songs right now",
//       image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
//       songs: 50,
//       color: "from-purple-600 to-pink-600"
//     },
//     {
//       id: 2,
//       title: "Chill Vibes",
//       description: "Relax and unwind",
//       image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w-400&h=400&fit=crop",
//       songs: 30,
//       color: "from-blue-600 to-cyan-600"
//     },
//     {
//       id: 3,
//       title: "Workout Energy",
//       description: "High-energy tracks for your workout",
//       image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop",
//       songs: 40,
//       color: "from-red-600 to-orange-600"
//     },
//     {
//       id: 4,
//       title: "Indie Mix",
//       description: "Discover new independent artists",
//       image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
//       songs: 35,
//       color: "from-green-600 to-emerald-600"
//     }
//   ];

//   // Mock data for recently played tracks
//   const mockRecentTracks = [
//     {
//       id: 1,
//       title: "Blinding Lights",
//       artist: "The Weeknd",
//       album: "After Hours",
//       duration: "3:20",
//       plays: "2.1B",
//       liked: true
//     },
//     {
//       id: 2,
//       title: "Stay",
//       artist: "The Kid LAROI, Justin Bieber",
//       album: "F*CK LOVE 3",
//       duration: "2:21",
//       plays: "1.8B",
//       liked: false
//     },
//     {
//       id: 3,
//       title: "Good 4 U",
//       artist: "Olivia Rodrigo",
//       album: "SOUR",
//       duration: "2:58",
//       plays: "1.5B",
//       liked: true
//     },
//     {
//       id: 4,
//       title: "Levitating",
//       artist: "Dua Lipa",
//       album: "Future Nostalgia",
//       duration: "3:23",
//       plays: "1.9B",
//       liked: true
//     }
//   ];

//   // ========== LIFECYCLE HOOKS ==========
  
//   /**
//    * useEffect hook runs when component mounts
//    * Simulates API call to fetch user data
//    */
//   useEffect(() => {
//     // Simulate API call delay
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // In production: await fetchUserData(), fetchPlaylists(), etc.
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // Set mock data
//         setFeaturedPlaylists(mockPlaylists);
//         setRecentlyPlayed(mockRecentTracks);
//         setFavorites(mockRecentTracks.filter(track => track.liked));
        
//         // Set a default playing track
//         setCurrentTrack(mockRecentTracks[0]);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
    
//     // Cleanup function (runs when component unmounts)
//     return () => {
//       // Cleanup audio or subscriptions if needed
//       console.log('Home component unmounting');
//     };
//   }, []); // Empty dependency array means run once on mount

//   // ========== EVENT HANDLERS ==========
  
//   /**
//    * Handle play/pause toggle
//    */
//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//     // In production: Control actual audio player
//     console.log(isPlaying ? 'Pausing track' : 'Playing track', currentTrack?.title);
//   };

//   /**
//    * Handle track selection
//    * @param {Object} track - The selected track object
//    */
//   const handleTrackSelect = (track) => {
//     setCurrentTrack(track);
//     setIsPlaying(true);
//     console.log('Selected track:', track.title);
    
//     // Add to recently played (if not already there)
//     if (!recentlyPlayed.some(t => t.id === track.id)) {
//       setRecentlyPlayed(prev => [track, ...prev.slice(0, 9)]); // Keep only 10 most recent
//     }
//   };

//   /**
//    * Handle favorite toggle
//    * @param {number} trackId - ID of track to toggle favorite
//    */
//   const handleToggleFavorite = (trackId) => {
//     setFavorites(prev => {
//       const isCurrentlyFavorite = prev.some(track => track.id === trackId);
//       if (isCurrentlyFavorite) {
//         // Remove from favorites
//         return prev.filter(track => track.id !== trackId);
//       } else {
//         // Add to favorites
//         const trackToAdd = recentlyPlayed.find(track => track.id === trackId);
//         return trackToAdd ? [...prev, trackToAdd] : prev;
//       }
//     });
//   };

//   /**
//    * Handle search input
//    * @param {Event} e - Input change event
//    */
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     // In production: Implement search functionality
//     console.log('Search query:', e.target.value);
//   };

//   /**
//    * Handle user logout
//    */
//   const handleLogout = () => {
//     localStorage.removeItem('music_token');
//     localStorage.removeItem('user_email');
//     localStorage.removeItem('user_name');
//     window.location.href = '/login'; // Full page reload to clear state
//   };

//   // ========== HELPER FUNCTIONS ==========
  
//   /**
//    * Format large numbers with abbreviations
//    * @param {number} num - Number to format
//    * @returns {string} - Formatted string
//    */
//   const formatNumber = (num) => {
//     if (num >= 1000000000) {
//       return (num / 1000000000).toFixed(1) + 'B';
//     }
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + 'M';
//     }
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K';
//     }
//     return num.toString();
//   };

//   // ========== CONDITIONAL RENDERING ==========
  
//   // Show loading skeleton while data is being fetched
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-8">
//         <div className="animate-pulse space-y-8">
//           {/* Loading skeleton for header */}
//           <div className="h-12 bg-slate-800 rounded-lg w-1/3"></div>
          
//           {/* Loading skeleton for playlists */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="h-64 bg-slate-800 rounded-xl"></div>
//             ))}
//           </div>
          
//           {/* Loading skeleton for recently played */}
//           <div className="h-96 bg-slate-800 rounded-xl"></div>
//         </div>
//       </div>
//     );
//   }

//   // ========== MAIN RENDER ==========
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      
//       {/* ========== MAIN LAYOUT CONTAINER ========== */}
//       <div className="flex">
        
//         {/* ========== SIDEBAR NAVIGATION ========== */}
//         <aside className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 min-h-screen p-6 hidden md:block">
          
//           {/* Logo/Brand */}
//           <div className="flex items-center space-x-3 mb-10">
//             <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-2 rounded-lg">
//               <Music className="w-8 h-8" />
//             </div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
//               MelodyFlow
//             </h1>
//           </div>

//           {/* Main Navigation */}
//           <nav className="space-y-2 mb-8">
//             <Link to="/" className="flex items-center space-x-3 p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
//               <HomeIcon className="w-5 h-5" />
//               <span className="font-medium">Home</span>
//             </Link>
//             <Link to="/search" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition">
//               <Search className="w-5 h-5" />
//               <span className="font-medium">Search</span>
//             </Link>
//             <Link to="/music" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition">
//               <Music className="w-5 h-5" />
//               <span className="font-medium">Your Library</span>
//             </Link>
//             <Link to="/playlist" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition">
//               <Library className="w-5 h-5" />
//               <span className="font-medium">Playlists</span>
//             </Link>
//             <Link to="/podcasts" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition">
//               <Podcast className="w-5 h-5" />
//               <span className="font-medium">Podcasts</span>
//             </Link>
//           </nav>

//           {/* User Playlists Section */}
//           <div className="mb-8">
//             <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
//               Your Playlists
//             </h3>
//             <div className="space-y-2">
//               <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition w-full text-left">
//                 <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded"></div>
//                 <span className="text-sm">Liked Songs</span>
//               </button>
//               <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition w-full text-left">
//                 <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded"></div>
//                 <span className="text-sm">Study Focus</span>
//               </button>
//               <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition w-full text-left">
//                 <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded"></div>
//                 <span className="text-sm">Morning Energy</span>
//               </button>
//             </div>
//           </div>

//           {/* User Profile Section */}
//           <div className="mt-auto pt-6 border-t border-white/10">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
//                 <User className="w-6 h-6" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium">{localStorage.getItem('user_name') || 'Guest User'}</p>
//                 <p className="text-xs text-slate-400">Premium Member</p>
//               </div>
//               <button 
//                 onClick={handleLogout}
//                 className="text-sm text-rose-400 hover:text-rose-300 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </aside>

//         {/* ========== MAIN CONTENT AREA ========== */}
//         <main className="flex-1 p-6 md:p-8">
          
//           {/* ========== HEADER SECTION ========== */}
//           <header className="mb-8">
//             <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                   Good morning, <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
//                     {localStorage.getItem('user_name') || 'Music Lover'}
//                   </span>
//                 </h1>
//                 <p className="text-slate-400">Your personalized music dashboard</p>
//               </div>
              
//               {/* Search Bar */}
//               <div className="mt-4 md:mt-0 relative max-w-md w-full md:w-auto">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearch}
//                     placeholder="Search songs, artists, or podcasts..."
//                     className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//               <div className="bg-white/5 rounded-xl p-4 border border-white/10">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-slate-400 text-sm">Listening Time</p>
//                     <p className="text-2xl font-bold">42h 18m</p>
//                   </div>
//                   <Clock className="w-8 h-8 text-cyan-400" />
//                 </div>
//               </div>
//               <div className="bg-white/5 rounded-xl p-4 border border-white/10">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-slate-400 text-sm">Favorite Tracks</p>
//                     <p className="text-2xl font-bold">{favorites.length}</p>
//                   </div>
//                   <Heart className="w-8 h-8 text-rose-400" />
//                 </div>
//               </div>
//               <div className="bg-white/5 rounded-xl p-4 border border-white/10">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-slate-400 text-sm">Trending Artist</p>
//                     <p className="text-2xl font-bold">The Weeknd</p>
//                   </div>
//                   <TrendingUp className="w-8 h-8 text-purple-400" />
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* ========== FEATURED PLAYLISTS SECTION ========== */}
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold">Made For You</h2>
//               <Link to="/music" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
//                 See all
//               </Link>
//             </div>
            
//             {/* Playlist Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {featuredPlaylists.map((playlist) => (
//                 <div 
//                   key={playlist.id}
//                   className="group bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
//                   onClick={() => console.log('Navigate to playlist:', playlist.id)}
//                 >
//                   {/* Playlist Image */}
//                   <div className="relative mb-4 overflow-hidden rounded-xl">
//                     <div className={`aspect-square bg-gradient-to-br ${playlist.color} rounded-xl`}>
//                       {/* In production: Use actual image */}
//                       <div className="w-full h-full flex items-center justify-center">
//                         <Music className="w-16 h-16 text-white/50" />
//                       </div>
//                     </div>
//                     {/* Play Button Overlay */}
//                     <button className="absolute bottom-2 right-2 bg-cyan-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
//                       <Play className="w-5 h-5 text-white" fill="white" />
//                     </button>
//                   </div>
                  
//                   {/* Playlist Info */}
//                   <h3 className="font-bold text-lg mb-1">{playlist.title}</h3>
//                   <p className="text-slate-400 text-sm mb-2">{playlist.description}</p>
//                   <div className="flex items-center justify-between text-xs text-slate-500">
//                     <span>{playlist.songs} songs</span>
//                     <span>• Updated today</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* ========== RECENTLY PLAYED SECTION ========== */}
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold">Recently Played</h2>
//               <button 
//                 onClick={() => setRecentlyPlayed([])}
//                 className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
//               >
//                 Clear history
//               </button>
//             </div>
            
//             {/* Tracks Table */}
//             <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-white/10">
//                       <th className="text-left p-4 text-slate-400 font-medium">#</th>
//                       <th className="text-left p-4 text-slate-400 font-medium">Title</th>
//                       <th className="text-left p-4 text-slate-400 font-medium">Album</th>
//                       <th className="text-left p-4 text-slate-400 font-medium">Plays</th>
//                       <th className="text-left p-4 text-slate-400 font-medium">Duration</th>
//                       <th className="text-left p-4 text-slate-400 font-medium"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recentlyPlayed.map((track, index) => (
//                       <tr 
//                         key={track.id}
//                         className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer"
//                         onClick={() => handleTrackSelect(track)}
//                       >
//                         <td className="p-4">
//                           <div className="flex items-center">
//                             <span className="text-slate-400 mr-3">{index + 1}</span>
//                             <button 
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handlePlayPause();
//                               }}
//                               className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
//                             >
//                               {isPlaying && currentTrack?.id === track.id ? (
//                                 <Pause className="w-4 h-4 text-white" />
//                               ) : (
//                                 <Play className="w-4 h-4 text-white" />
//                               )}
//                             </button>
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           <div className="flex items-center">
//                             <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded mr-3 flex items-center justify-center">
//                               <Music className="w-5 h-5 text-white/70" />
//                             </div>
//                             <div>
//                               <div className="font-medium">{track.title}</div>
//                               <div className="text-sm text-slate-400">{track.artist}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="p-4 text-slate-300">{track.album}</td>
//                         <td className="p-4">
//                           <div className="flex items-center">
//                             <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
//                             <span className="text-slate-300">{track.plays}</span>
//                           </div>
//                         </td>
//                         <td className="p-4 text-slate-300">{track.duration}</td>
//                         <td className="p-4">
//                           <div className="flex items-center space-x-2">
//                             <button 
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleToggleFavorite(track.id);
//                               }}
//                               className={`p-2 rounded-full ${favorites.some(f => f.id === track.id) ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'}`}
//                             >
//                               <Heart className={`w-5 h-5 ${favorites.some(f => f.id === track.id) ? 'fill-rose-400' : ''}`} />
//                             </button>
//                             <button className="p-2 rounded-full text-slate-400 hover:text-white">
//                               <MoreVertical className="w-5 h-5" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </section>

       
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Home;




// Import React and necessary hooks
import React, { useState, useEffect } from 'react';
// Import routing utilities for navigation
import { Link } from 'react-router-dom';
// Import icons from lucide-react
import { 
  Music, 
  Podcast, 
  Home as HomeIcon, 
  Search, 
  Library, 
  User, 
  Play, 
  Pause, 
  Heart, 
  MoreVertical,
  TrendingUp,
  Clock,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2
} from 'lucide-react';
// Import custom components
import MusicCard from '../MusicCard';
import Player from '../player/AudioPlayer';  // Player folder is at same level as pages folder

const Home = () => {
  // ========== STATE MANAGEMENT ==========
  
  // State for controlling audio playback
  const [isPlaying, setIsPlaying] = useState(false);
  // State for currently playing track
  const [currentTrack, setCurrentTrack] = useState(null);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for user's favorite tracks
  const [favorites, setFavorites] = useState([]);
  // State for recently played tracks
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  // State for featured playlists
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  // State for new releases
  const [newReleases, setNewReleases] = useState([]);

  // ========== MOCK DATA ==========
  // In production, this data would come from Firebase/API
  
  // Mock data for featured playlists
  const mockPlaylists = [
    {
      id: 1,
      title: "Today's Top Hits",
      description: "The biggest songs right now",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      songs: 50,
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 2,
      title: "Chill Vibes",
      description: "Relax and unwind",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w-400&h=400&fit=crop",
      songs: 30,
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: 3,
      title: "Workout Energy",
      description: "High-energy tracks for your workout",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop",
      songs: 40,
      color: "from-red-600 to-orange-600"
    },
    {
      id: 4,
      title: "Indie Mix",
      description: "Discover new independent artists",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      songs: 35,
      color: "from-green-600 to-emerald-600"
    }
  ];

  // Mock data for recently played tracks
  const mockRecentTracks = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      plays: "2.1B",
      liked: true
    },
    {
      id: 2,
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      album: "F*CK LOVE 3",
      duration: "2:21",
      plays: "1.8B",
      liked: false
    },
    {
      id: 3,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      duration: "2:58",
      plays: "1.5B",
      liked: true
    },
    {
      id: 4,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: "3:23",
      plays: "1.9B",
      liked: true
    }
  ];

  // ========== LIFECYCLE HOOKS ==========
  
  /**
   * useEffect hook runs when component mounts
   * Simulates API call to fetch user data
   */
  useEffect(() => {
    // Simulate API call delay
    const fetchData = async () => {
      setLoading(true);
      try {
        // In production: await fetchUserData(), fetchPlaylists(), etc.
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set mock data
        setFeaturedPlaylists(mockPlaylists);
        setRecentlyPlayed(mockRecentTracks);
        setFavorites(mockRecentTracks.filter(track => track.liked));
        
        // Set a default playing track
        setCurrentTrack(mockRecentTracks[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Cleanup function (runs when component unmounts)
    return () => {
      // Cleanup audio or subscriptions if needed
      console.log('Home component unmounting');
    };
  }, []); // Empty dependency array means run once on mount

  // ========== EVENT HANDLERS ==========
  
  /**
   * Handle play/pause toggle
   */
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In production: Control actual audio player
    console.log(isPlaying ? 'Pausing track' : 'Playing track', currentTrack?.title);
  };

  /**
   * Handle track selection
   * @param {Object} track - The selected track object
   */
  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    console.log('Selected track:', track.title);
    
    // Add to recently played (if not already there)
    if (!recentlyPlayed.some(t => t.id === track.id)) {
      setRecentlyPlayed(prev => [track, ...prev.slice(0, 9)]); // Keep only 10 most recent
    }
  };

  /**
   * Handle favorite toggle
   * @param {number} trackId - ID of track to toggle favorite
   */
  const handleToggleFavorite = (trackId) => {
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.some(track => track.id === trackId);
      if (isCurrentlyFavorite) {
        // Remove from favorites
        return prev.filter(track => track.id !== trackId);
      } else {
        // Add to favorites
        const trackToAdd = recentlyPlayed.find(track => track.id === trackId);
        return trackToAdd ? [...prev, trackToAdd] : prev;
      }
    });
  };

  /**
   * Handle search input
   * @param {Event} e - Input change event
   */
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // In production: Implement search functionality
    console.log('Search query:', e.target.value);
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    localStorage.removeItem('music_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    window.location.href = '/login'; // Full page reload to clear state
  };

  // ========== HELPER FUNCTIONS ==========
  
  /**
   * Format large numbers with abbreviations
   * @param {number} num - Number to format
   * @returns {string} - Formatted string
   */
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // ========== CONDITIONAL RENDERING ==========
  
  // Show loading skeleton while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-8">
        <div className="animate-pulse space-y-8">
          {/* Loading skeleton for header */}
          <div className="h-12 bg-slate-800 rounded-lg w-1/3"></div>
          
          {/* Loading skeleton for playlists */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-slate-800 rounded-xl"></div>
            ))}
          </div>
          
          {/* Loading skeleton for recently played */}
          <div className="h-96 bg-slate-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="p-6 md:p-8">
      {/* ========== HEADER SECTION ========== */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Good morning, <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {localStorage.getItem('user_name') || 'Music Lover'}
              </span>
            </h1>
            <p className="text-slate-400">Your personalized music dashboard</p>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4 md:mt-0 relative max-w-md w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search songs, artists, or podcasts..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Listening Time</p>
                <p className="text-2xl font-bold">42h 18m</p>
              </div>
              <Clock className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Favorite Tracks</p>
                <p className="text-2xl font-bold">{favorites.length}</p>
              </div>
              <Heart className="w-8 h-8 text-rose-400" />
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Trending Artist</p>
                <p className="text-2xl font-bold">The Weeknd</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
      </header>

          {/* ========== FEATURED PLAYLISTS SECTION ========== */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Made For You</h2>
              <Link to="/music" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                See all
              </Link>
            </div>
            
            {/* Playlist Grid - Use MusicCard component */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPlaylists.map((playlist) => (
                <MusicCard 
                  key={playlist.id}
                  playlist={playlist}
                  onClick={() => console.log('Navigate to playlist:', playlist.id)}
                />
              ))}
            </div>
          </section>

          {/* ========== RECENTLY PLAYED SECTION ========== */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recently Played</h2>
              <button 
                onClick={() => setRecentlyPlayed([])}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                Clear history
              </button>
            </div>
            
            {/* Tracks Table */}
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-slate-400 font-medium">#</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Title</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Album</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Plays</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Duration</th>
                      <th className="text-left p-4 text-slate-400 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentlyPlayed.map((track, index) => (
                      <tr 
                        key={track.id}
                        className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer"
                        onClick={() => handleTrackSelect(track)}
                      >
                        <td className="p-4">
                          <div className="flex items-center">
                            <span className="text-slate-400 mr-3">{index + 1}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayPause();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
                            >
                              {isPlaying && currentTrack?.id === track.id ? (
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
                              <Music className="w-5 h-5 text-white/70" />
                            </div>
                            <div>
                              <div className="font-medium">{track.title}</div>
                              <div className="text-sm text-slate-400">{track.artist}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">{track.album}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-slate-300">{track.plays}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">{track.duration}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(track.id);
                              }}
                              className={`p-2 rounded-full ${favorites.some(f => f.id === track.id) ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'}`}
                            >
                              <Heart className={`w-5 h-5 ${favorites.some(f => f.id === track.id) ? 'fill-rose-400' : ''}`} />
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
            </div>
          </section>
          
          {/* Add the Player component at the bottom */}
          {/* Global Player handles this now */}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Play, 
  Pause, 
  Heart, 
  MoreVertical,
  Users,
  Clock,
  Music,
  Share2,
  Download,
  ListMusic,
  FolderPlus
} from 'lucide-react';

const Playlist = () => {
  // ========== STATE MANAGEMENT ==========
  const [searchQuery, setSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', description: '', isPublic: true });

  // ========== MOCK DATA ==========
  const mockPlaylists = [
    {
      id: 1,
      name: "Morning Energy",
      description: "Start your day with these upbeat tracks",
      owner: "You",
      songs: 25,
      duration: "1h 45m",
      likes: 1240,
      isPublic: true,
      created: "2024-01-15",
      color: "from-amber-500 to-orange-600",
      songsList: [
        { id: 1, title: "Good Morning", artist: "Kanye West", duration: "3:15" },
        { id: 2, title: "Walking on Sunshine", artist: "Katrina & The Waves", duration: "3:43" },
        { id: 3, title: "Here Comes the Sun", artist: "The Beatles", duration: "3:05" }
      ]
    },
    {
      id: 2,
      name: "Study Focus",
      description: "Concentration music for productive sessions",
      owner: "You",
      songs: 18,
      duration: "1h 20m",
      likes: 890,
      isPublic: true,
      created: "2024-02-10",
      color: "from-blue-500 to-cyan-600",
      songsList: [
        { id: 4, title: "Clair de Lune", artist: "Claude Debussy", duration: "5:10" },
        { id: 5, title: "River Flows in You", artist: "Yiruma", duration: "3:47" }
      ]
    },
    {
      id: 3,
      name: "Workout Pump",
      description: "High energy tracks for your workout",
      owner: "You",
      songs: 30,
      duration: "2h 15m",
      likes: 2100,
      isPublic: true,
      created: "2024-03-05",
      color: "from-red-500 to-rose-600",
      songsList: [
        { id: 6, title: "Eye of the Tiger", artist: "Survivor", duration: "4:05" },
        { id: 7, title: "Stronger", artist: "Kanye West", duration: "5:12" }
      ]
    },
    {
      id: 4,
      name: "Chill Evening",
      description: "Relax and unwind with these smooth tracks",
      owner: "Alex Johnson",
      songs: 22,
      duration: "1h 35m",
      likes: 1560,
      isPublic: true,
      created: "2024-01-28",
      color: "from-purple-500 to-pink-600",
      songsList: [
        { id: 8, title: "Summertime", artist: "Ella Fitzgerald", duration: "4:55" },
        { id: 9, title: "Moon River", artist: "Audrey Hepburn", duration: "2:42" }
      ]
    },
    {
      id: 5,
      name: "Road Trip Mix",
      description: "Perfect companions for long drives",
      owner: "You",
      songs: 35,
      duration: "2h 30m",
      likes: 1870,
      isPublic: true,
      created: "2024-02-22",
      color: "from-green-500 to-emerald-600",
      songsList: [
        { id: 10, title: "Life is a Highway", artist: "Tom Cochrane", duration: "4:26" },
        { id: 11, title: "On the Road Again", artist: "Willie Nelson", duration: "2:35" }
      ]
    },
    {
      id: 6,
      name: "Liked Songs",
      description: "Your collection of favorite tracks",
      owner: "You",
      songs: 142,
      duration: "8h 45m",
      likes: 0,
      isPublic: false,
      created: "2023-12-01",
      color: "from-rose-500 to-red-600",
      songsList: [
        { id: 12, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
        { id: 13, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" }
      ]
    }
  ];

  // ========== LIFECYCLE HOOKS ==========
  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setPlaylists(mockPlaylists);
      setLoading(false);
    };
    fetchPlaylists();
  }, []);

  // ========== EVENT HANDLERS ==========
  const handlePlayPause = (songId) => {
    setCurrentPlaying(currentPlaying === songId ? null : songId);
  };

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleBackToList = () => {
    setSelectedPlaylist(null);
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylist.name.trim()) return;
    
    const newPlaylistObj = {
      id: playlists.length + 1,
      name: newPlaylist.name,
      description: newPlaylist.description,
      owner: "You",
      songs: 0,
      duration: "0m",
      likes: 0,
      isPublic: newPlaylist.isPublic,
      created: new Date().toISOString().split('T')[0],
      color: "from-slate-500 to-slate-700",
      songsList: []
    };

    setPlaylists([newPlaylistObj, ...playlists]);
    setNewPlaylist({ name: '', description: '', isPublic: true });
    setShowCreateModal(false);
  };

  const handleDeletePlaylist = (playlistId) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      setPlaylists(playlists.filter(p => p.id !== playlistId));
      if (selectedPlaylist?.id === playlistId) {
        setSelectedPlaylist(null);
      }
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  // ========== FILTERED PLAYLISTS ==========
  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-slate-800 rounded-xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  // ========== PLAYLIST DETAIL VIEW ==========
  if (selectedPlaylist) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 md:p-8">
        {/* ========== HEADER ========== */}
        <header className="mb-8">
          <button
            onClick={handleBackToList}
            className="text-cyan-400 hover:text-cyan-300 mb-4 flex items-center"
          >
            ← Back to Playlists
          </button>
          
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Playlist Cover */}
            <div className={`w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br ${selectedPlaylist.color} rounded-2xl flex items-center justify-center shadow-xl`}>
              <ListMusic className="w-20 h-20 text-white/50" />
            </div>
            
            {/* Playlist Info */}
            <div className="flex-1">
              <div className="mb-4">
                <span className="text-sm text-slate-400">PLAYLIST</span>
                <h1 className="text-4xl md:text-5xl font-bold mt-2">{selectedPlaylist.name}</h1>
                <p className="text-slate-300 mt-2">{selectedPlaylist.description}</p>
              </div>
              
              <div className="flex items-center flex-wrap gap-4 text-sm text-slate-400">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {selectedPlaylist.owner}
                </div>
                <div className="flex items-center">
                  <Music className="w-4 h-4 mr-2" />
                  {selectedPlaylist.songs} songs
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {selectedPlaylist.duration}
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  {selectedPlaylist.likes.toLocaleString()} likes
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${selectedPlaylist.isPublic ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-300'}`}>
                  {selectedPlaylist.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mt-6">
                <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full font-semibold flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Play All
                </button>
                <button className="p-3 rounded-full border border-white/20 hover:bg-white/10">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full border border-white/20 hover:bg-white/10">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full border border-white/20 hover:bg-white/10">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ========== SONGS LIST ========== */}
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-slate-400 font-medium">#</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Title</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Artist</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Duration</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedPlaylist.songsList.map((song, index) => (
                  <tr key={song.id} className="border-b border-white/5 hover:bg-white/5 transition">
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
                    <td className="p-4 font-medium">{song.title}</td>
                    <td className="p-4 text-slate-300">{song.artist}</td>
                    <td className="p-4 text-slate-300">{song.duration}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-full text-slate-400 hover:text-rose-400">
                          <Heart className="w-5 h-5" />
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
          
          {/* ========== EMPTY SONGS ========== */}
          {selectedPlaylist.songsList.length === 0 && (
            <div className="p-8 text-center">
              <Music className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No songs in this playlist</h3>
              <p className="text-slate-500 mb-4">Add songs to start listening</p>
              <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-full">
                Add Songs
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ========== MAIN PLAYLISTS LIST VIEW ==========
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 md:p-8">
      {/* ========== HEADER ========== */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Your Playlists
              </span>
            </h1>
            <p className="text-slate-400">Create and manage your music collections</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search playlists..."
                className="pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>
            
            {/* Create Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 rounded-full font-semibold flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Playlist
            </button>
          </div>
        </div>
      </header>

      {/* ========== STATS ========== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Playlists</p>
              <p className="text-2xl font-bold">{playlists.length}</p>
            </div>
            <ListMusic className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Songs</p>
              <p className="text-2xl font-bold">
                {playlists.reduce((sum, playlist) => sum + playlist.songs, 0)}
              </p>
            </div>
            <Music className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Duration</p>
              <p className="text-2xl font-bold">16h 30m</p>
            </div>
            <Clock className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Public Playlists</p>
              <p className="text-2xl font-bold">
                {playlists.filter(p => p.isPublic).length}
              </p>
            </div>
            <Users className="w-8 h-8 text-rose-400" />
          </div>
        </div>
      </div>

      {/* ========== PLAYLISTS GRID ========== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaylists.map(playlist => (
          <div 
            key={playlist.id}
            className="group bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
            onClick={() => handlePlaylistSelect(playlist)}
          >
            {/* Playlist Cover */}
            <div className="relative mb-4">
              <div className={`aspect-square bg-gradient-to-br ${playlist.color} rounded-xl flex items-center justify-center`}>
                <ListMusic className="w-16 h-16 text-white/50" />
              </div>
              
              {/* Play Button */}
              <button className="absolute bottom-2 right-2 p-3 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Playlist Info */}
            <div>
              <h3 className="font-bold text-lg mb-1 line-clamp-1">{playlist.name}</h3>
              <p className="text-sm text-slate-400 mb-3 line-clamp-2">{playlist.description}</p>
              
              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Music className="w-4 h-4 mr-1" />
                    {playlist.songs}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {playlist.duration}
                  </span>
                </div>
                
                <span className={`px-2 py-1 rounded text-xs ${playlist.isPublic ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-300'}`}>
                  {playlist.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center text-sm text-slate-400">
                <Users className="w-4 h-4 mr-2" />
                {playlist.owner}
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlaylist(playlist.id);
                  }}
                  className="p-2 rounded-full text-slate-400 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit
                  }}
                  className="p-2 rounded-full text-slate-400 hover:text-cyan-400"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========== EMPTY STATE ========== */}
      {filteredPlaylists.length === 0 && (
        <div className="text-center py-12">
          <FolderPlus className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No playlists found</h3>
          <p className="text-slate-500 mb-6">
            {searchQuery ? `No results for "${searchQuery}"` : 'Create your first playlist to get started'}
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 rounded-full font-semibold"
          >
            Create Playlist
          </button>
        </div>
      )}

      {/* ========== CREATE PLAYLIST MODAL ========== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-bold mb-4">Create New Playlist</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Playlist Name</label>
                <input
                  type="text"
                  value={newPlaylist.name}
                  onChange={(e) => setNewPlaylist({...newPlaylist, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="My Awesome Playlist"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-2">Description</label>
                <textarea
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({...newPlaylist, description: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  rows="3"
                  placeholder="Describe your playlist..."
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newPlaylist.isPublic}
                  onChange={(e) => setNewPlaylist({...newPlaylist, isPublic: e.target.checked})}
                  className="w-4 h-4 text-cyan-500 bg-white/5 border-white/10 rounded focus:ring-cyan-500/20"
                />
                <label htmlFor="isPublic" className="ml-2 text-sm text-slate-300">
                  Make playlist public
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 rounded-full font-semibold"
                disabled={!newPlaylist.name.trim()}
              >
                Create Playlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
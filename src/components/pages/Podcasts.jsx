// import React, { useState } from 'react';
// import './Podcasts.css';

// const Podcasts = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [subscriptions, setSubscriptions] = useState([
//     { id: 1, name: 'The Joe Rogan Experience', host: 'Joe Rogan', episodes: 2000, subscribed: true },
//     { id: 2, name: 'Serial', host: 'Sarah Koenig', episodes: 50, subscribed: true },
//     { id: 3, name: 'The Daily', host: 'The New York Times', episodes: 1000, subscribed: false },
//   ]);

//   const categories = [
//     'all', 'news', 'comedy', 'technology', 'business', 'health', 'education', 'entertainment'
//   ];

//   const podcasts = [
//     {
//       id: 1,
//       title: 'The Joe Rogan Experience',
//       host: 'Joe Rogan',
//       description: 'Long form conversations with a variety of guests',
//       category: 'comedy',
//       episodes: 2000,
//       duration: '2-3 hours',
//       rating: 4.8,
//       cover: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       featured: true
//     },
//     {
//       id: 2,
//       title: 'Serial',
//       host: 'Sarah Koenig',
//       description: 'Investigative journalism series',
//       category: 'news',
//       episodes: 50,
//       duration: '45-60 mins',
//       rating: 4.9,
//       cover: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//       featured: true
//     },
//     {
//       id: 3,
//       title: 'The Daily',
//       host: 'The New York Times',
//       description: 'Top news stories of the day',
//       category: 'news',
//       episodes: 1000,
//       duration: '20-30 mins',
//       rating: 4.7,
//       cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     },
//     {
//       id: 4,
//       title: 'How I Built This',
//       host: 'Guy Raz',
//       description: 'Stories of innovators and entrepreneurs',
//       category: 'business',
//       episodes: 300,
//       duration: '60 mins',
//       rating: 4.8,
//       cover: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     },
//     {
//       id: 5,
//       title: 'Science Vs',
//       host: 'Wendy Zukerman',
//       description: 'Science tackles popular myths',
//       category: 'education',
//       episodes: 150,
//       duration: '30-40 mins',
//       rating: 4.6,
//       cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     },
//     {
//       id: 6,
//       title: 'TechStuff',
//       host: 'Jonathan Strickland',
//       description: 'Technology explained in simple terms',
//       category: 'technology',
//       episodes: 800,
//       duration: '30 mins',
//       rating: 4.5,
//       cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
//     }
//   ];

//   const episodes = [
//     {
//       id: 1,
//       podcastId: 1,
//       title: '#2015 - Elon Musk',
//       description: 'Elon Musk returns to discuss Tesla, SpaceX, and the future of technology',
//       duration: '2:45:12',
//       date: '2024-01-15',
//       played: false
//     },
//     {
//       id: 2,
//       podcastId: 2,
//       title: 'Season 4, Episode 1: The Alibi',
//       description: 'A new investigation begins',
//       duration: '52:30',
//       date: '2024-01-10',
//       played: true
//     },
//     {
//       id: 3,
//       podcastId: 3,
//       title: 'The Fall of FTX',
//       description: 'Investigating the cryptocurrency exchange collapse',
//       duration: '28:45',
//       date: '2024-01-14',
//       played: false
//     }
//   ];

//   const toggleSubscription = (podcastId) => {
//     setSubscriptions(prev => 
//       prev.map(sub => 
//         sub.id === podcastId ? { ...sub, subscribed: !sub.subscribed } : sub
//       )
//     );
//   };

//   const filteredPodcasts = selectedCategory === 'all' 
//     ? podcasts 
//     : podcasts.filter(podcast => podcast.category === selectedCategory);

//   return (
//     <div className="podcasts-container">
//       <header className="podcasts-header">
//         <h1>Podcasts</h1>
//         <p>Discover and listen to your favorite podcasts</p>
//       </header>

//       {/* Featured Podcasts */}
//       <section className="featured-podcasts">
//         <h2>Featured Podcasts</h2>
//         <div className="featured-grid">
//           {podcasts.filter(p => p.featured).map(podcast => (
//             <div key={podcast.id} className="featured-card">
//               <div className="featured-cover">
//                 <img src={podcast.cover} alt={podcast.title} />
//                 <div className="featured-badge">Featured</div>
//               </div>
//               <div className="featured-info">
//                 <h3>{podcast.title}</h3>
//                 <p className="host">{podcast.host}</p>
//                 <p className="description">{podcast.description}</p>
//                 <div className="featured-meta">
//                   <span className="episodes">{podcast.episodes} episodes</span>
//                   <span className="rating">⭐ {podcast.rating}</span>
//                 </div>
//                 <button className="subscribe-btn">
//                   {subscriptions.find(s => s.id === podcast.id)?.subscribed ? 'Subscribed' : 'Subscribe'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <div className="podcasts-main">
//         <div className="podcasts-sidebar">
//           <div className="categories-section">
//             <h3>Categories</h3>
//             <div className="categories-list">
//               {categories.map(category => (
//                 <button
//                   key={category}
//                   className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="subscriptions-section">
//             <h3>Your Subscriptions</h3>
//             <div className="subscriptions-list">
//               {subscriptions.filter(s => s.subscribed).map(sub => (
//                 <div key={sub.id} className="subscription-item">
//                   <div className="sub-info">
//                     <h4>{sub.name}</h4>
//                     <p>{sub.host}</p>
//                   </div>
//                   <button 
//                     className="unsubscribe-btn"
//                     onClick={() => toggleSubscription(sub.id)}
//                   >
//                     Unsubscribe
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="podcasts-content">
//           <div className="content-header">
//             <h2>
//               {selectedCategory === 'all' ? 'All Podcasts' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
//             </h2>
//             <div className="sort-options">
//               <select className="sort-select">
//                 <option>Sort by Popularity</option>
//                 <option>Sort by Date</option>
//                 <option>Sort by Rating</option>
//               </select>
//             </div>
//           </div>

//           <div className="podcasts-grid">
//             {filteredPodcasts.map(podcast => (
//               <div key={podcast.id} className="podcast-card">
//                 <div className="podcast-cover">
//                   <img src={podcast.cover} alt={podcast.title} />
//                   <button 
//                     className={`subscribe-icon ${subscriptions.find(s => s.id === podcast.id)?.subscribed ? 'subscribed' : ''}`}
//                     onClick={() => toggleSubscription(podcast.id)}
//                     title={subscriptions.find(s => s.id === podcast.id)?.subscribed ? 'Unsubscribe' : 'Subscribe'}
//                   >
//                     {subscriptions.find(s => s.id === podcast.id)?.subscribed ? '✓' : '+'}
//                   </button>
//                 </div>
//                 <div className="podcast-info">
//                   <h3>{podcast.title}</h3>
//                   <p className="podcast-host">{podcast.host}</p>
//                   <p className="podcast-description">{podcast.description}</p>
//                   <div className="podcast-meta">
//                     <span className="meta-item">🎧 {podcast.episodes} eps</span>
//                     <span className="meta-item">⏱ {podcast.duration}</span>
//                     <span className="meta-item">⭐ {podcast.rating}</span>
//                   </div>
//                   <button className="play-btn">Play Latest</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Recent Episodes */}
//           <section className="recent-episodes">
//             <h3>Recent Episodes</h3>
//             <div className="episodes-list">
//               {episodes.map(episode => (
//                 <div key={episode.id} className="episode-card">
//                   <div className="episode-info">
//                     <div className="episode-header">
//                       <h4>{episode.title}</h4>
//                       <span className={`played-status ${episode.played ? 'played' : 'new'}`}>
//                         {episode.played ? 'Played' : 'New'}
//                       </span>
//                     </div>
//                     <p className="episode-description">{episode.description}</p>
//                     <div className="episode-meta">
//                       <span className="date">{episode.date}</span>
//                       <span className="duration">{episode.duration}</span>
//                     </div>
//                   </div>
//                   <div className="episode-actions">
//                     <button className="play-episode-btn">▶ Play</button>
//                     <button className="download-btn">⬇ Download</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Podcasts;


import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Play, 
  Pause, 
  Heart, 
  Download,
  Share2,
  Users,
  Clock,
  Calendar,
  TrendingUp,
  Headphones,
  Mic,
  Users as PodcastersIcon
} from 'lucide-react';

const Podcasts = () => {
  // ========== STATE MANAGEMENT ==========
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);

  // ========== MOCK DATA ==========
  const categories = ['all', 'technology', 'business', 'comedy', 'news', 'education', 'health', 'sports'];
  
  const mockPodcasts = [
    {
      id: 1,
      title: "The Tech Talk",
      host: "Alex Johnson",
      category: "technology",
      episodes: 245,
      duration: "45-60 min",
      subscribers: "1.2M",
      rating: 4.8,
      liked: true,
      image: "tech"
    },
    {
      id: 2,
      title: "Business Insights Daily",
      host: "Sarah Chen",
      category: "business",
      episodes: 180,
      duration: "30-45 min",
      subscribers: "850K",
      rating: 4.7,
      liked: false,
      image: "business"
    },
    {
      id: 3,
      title: "Comedy Hour",
      host: "Mike & Tom",
      category: "comedy",
      episodes: 320,
      duration: "60-75 min",
      subscribers: "2.1M",
      rating: 4.9,
      liked: true,
      image: "comedy"
    },
    {
      id: 4,
      title: "World News Now",
      host: "BBC Global",
      category: "news",
      episodes: 500,
      duration: "20-30 min",
      subscribers: "3.5M",
      rating: 4.6,
      liked: true,
      image: "news"
    },
    {
      id: 5,
      title: "Learn Something New",
      host: "Dr. Emily Ross",
      category: "education",
      episodes: 150,
      duration: "40-50 min",
      subscribers: "650K",
      rating: 4.8,
      liked: false,
      image: "education"
    },
    {
      id: 6,
      title: "Health & Wellness",
      host: "Dr. James Wilson",
      category: "health",
      episodes: 200,
      duration: "35-45 min",
      subscribers: "980K",
      rating: 4.7,
      liked: true,
      image: "health"
    },
    {
      id: 7,
      title: "Sports Analysis",
      host: "Former Pros",
      category: "sports",
      episodes: 275,
      duration: "50-65 min",
      subscribers: "1.5M",
      rating: 4.8,
      liked: false,
      image: "sports"
    },
    {
      id: 8,
      title: "Startup Stories",
      host: "VC Experts",
      category: "business",
      episodes: 120,
      duration: "45-55 min",
      subscribers: "720K",
      rating: 4.6,
      liked: true,
      image: "startup"
    }
  ];

  // ========== LIFECYCLE HOOKS ==========
  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setPodcasts(mockPodcasts);
      setSubscriptions(mockPodcasts.filter(pod => pod.liked));
      setLoading(false);
    };
    fetchPodcasts();
  }, []);

  // ========== EVENT HANDLERS ==========
  const handlePlayPause = (podcastId) => {
    setCurrentPlaying(currentPlaying === podcastId ? null : podcastId);
  };

  const handleToggleSubscription = (podcastId) => {
    setSubscriptions(prev => 
      prev.includes(podcastId) 
        ? prev.filter(id => id !== podcastId)
        : [...prev, podcastId]
    );
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleCategorySelect = (category) => setSelectedCategory(category);

  // ========== FILTERED PODCASTS ==========
  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         podcast.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || podcast.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/4"></div>
          <div className="h-12 bg-slate-800 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-48 bg-slate-800 rounded-xl"></div>)}
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
            Podcasts
          </span>
        </h1>
        <p className="text-slate-400">Listen to your favorite shows and discover new ones</p>
      </header>

      {/* ========== STATS CARDS ========== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Podcasts</p>
              <p className="text-2xl font-bold">{podcasts.length}</p>
            </div>
            <Headphones className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Subscriptions</p>
              <p className="text-2xl font-bold">{subscriptions.length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Episodes</p>
              <p className="text-2xl font-bold">1,990</p>
            </div>
            <Mic className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Listening Time</p>
              <p className="text-2xl font-bold">156h</p>
            </div>
            <Clock className="w-8 h-8 text-rose-400" />
          </div>
        </div>
      </div>

      {/* ========== SEARCH AND FILTERS ========== */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search podcasts, hosts, or topics..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-slate-900">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ========== PODCAST GRID ========== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {filteredPodcasts.map(podcast => {
          const colorMap = {
            technology: 'from-cyan-600 to-blue-600',
            business: 'from-purple-600 to-pink-600',
            comedy: 'from-amber-600 to-orange-600',
            news: 'from-rose-600 to-red-600',
            education: 'from-emerald-600 to-green-600',
            health: 'from-lime-600 to-green-600',
            sports: 'from-red-600 to-orange-600',
            startup: 'from-indigo-600 to-purple-600'
          };

          return (
            <div 
              key={podcast.id}
              className="group bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Podcast Image */}
              <div className="relative mb-4">
                <div className={`aspect-square bg-gradient-to-br ${colorMap[podcast.category] || 'from-slate-600 to-slate-800'} rounded-xl flex items-center justify-center`}>
                  <Headphones className="w-12 h-12 text-white/50" />
                </div>
                
                {/* Play Button */}
                <button
                  onClick={() => handlePlayPause(podcast.id)}
                  className={`absolute bottom-2 right-2 p-3 rounded-full transition-all ${
                    currentPlaying === podcast.id
                      ? 'bg-rose-500'
                      : 'bg-cyan-500 group-hover:opacity-100 opacity-0'
                  }`}
                >
                  {currentPlaying === podcast.id ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              {/* Podcast Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg line-clamp-1">{podcast.title}</h3>
                  <p className="text-sm text-slate-400">Host: {podcast.host}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                    {podcast.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span>{podcast.rating}/5</span>
                  </div>
                </div>

                {/* Podcast Stats */}
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                  <div className="flex items-center">
                    <Mic className="w-4 h-4 mr-2" />
                    {podcast.episodes} eps
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {podcast.duration}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center">
                    <PodcastersIcon className="w-4 h-4 mr-1 text-slate-400" />
                    <span className="text-sm">{podcast.subscribers}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleToggleSubscription(podcast.id)}
                      className={`p-2 rounded-full ${
                        subscriptions.includes(podcast.id)
                          ? 'text-rose-400'
                          : 'text-slate-400 hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${subscriptions.includes(podcast.id) ? 'fill-rose-400' : ''}`} />
                    </button>
                    <button className="p-2 rounded-full text-slate-400 hover:text-white">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========== EMPTY STATE ========== */}
      {filteredPodcasts.length === 0 && (
        <div className="text-center py-12">
          <Headphones className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No podcasts found</h3>
          <p className="text-slate-500">
            {searchQuery ? `No results for "${searchQuery}"` : 'Try selecting a different category'}
          </p>
        </div>
      )}

      {/* ========== CATEGORY FILTERS ========== */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Browse Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.filter(c => c !== 'all').map(category => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
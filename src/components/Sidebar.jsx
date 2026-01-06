import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search as SearchIcon, 
  AudioLines as AudioLinesIcon, 
  Library, 
  Podcast,
  User,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: SearchIcon, label: 'Search' },
    { to: '/music', icon: AudioLinesIcon, label: 'Your Library' },
    { to: '/playlist', icon: Library, label: 'Playlists' },
    { to: '/podcasts', icon: Podcast, label: 'Podcasts' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('music_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 min-h-screen p-6 hidden md:flex flex-col">
      <div className="flex items-center space-x-3 mb-10">
        <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-2 rounded-lg">
          <AudioLinesIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent leading-none">
            Stremix
          </h1>
          <p className="text-[10px] text-slate-400 font-medium tracking-wider mt-1 uppercase">Play Your Vibe</p>
        </div>
      </div>

      <nav className="space-y-2 mb-8">
        {navLinks.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-cyan-500/10 text-cyan-400' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-medium truncate text-white">{localStorage.getItem('user_name') || 'Guest User'}</p>
            <p className="text-xs text-slate-400">Premium Member</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-sm text-rose-400 hover:text-rose-300 transition w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

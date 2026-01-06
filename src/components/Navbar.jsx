import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  AudioLines,
  Mic2,
  ListMusic,
  LogOut,
  User
} from 'lucide-react';

const Navbar = () => {
  return (
    <aside className="w-64 bg-black text-white flex flex-col p-4">
      {/* App Logo */}
      <div className="flex items-center gap-3 mb-6">
        <AudioLines className="text-cyan-400" size={24} />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold leading-none">Stremix</h1>
          <p className="text-[9px] text-gray-400 font-medium tracking-wide mt-0.5 uppercase">Play Your Vibe</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <Home size={20} />
          Home
        </NavLink>

        <NavLink
          to="/music"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <AudioLines size={20} />
          Music
        </NavLink>

        <NavLink
          to="/podcasts"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <Mic2 size={20} />
          Podcasts
        </NavLink>

        <NavLink
          to="/playlist/1"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <ListMusic size={20} />
          Playlists
        </NavLink>
      </nav>

      {/* User section */}
      <div className="mt-auto pt-6 border-t border-gray-700">
        <div className="flex items-center gap-3 text-gray-300">
          <User size={20} />
          Guest User
        </div>

        <button className="mt-4 flex items-center gap-3 text-red-400 hover:text-red-500">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Navbar;

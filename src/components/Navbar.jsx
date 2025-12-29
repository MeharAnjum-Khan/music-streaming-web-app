import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Music,
  Mic2,
  ListMusic,
  LogOut,
  User
} from 'lucide-react';

const Navbar = () => {
  return (
    <aside className="w-64 bg-black text-white flex flex-col p-4">
      {/* App Logo */}
      <h1 className="text-xl font-bold mb-6">🎵 MyMusic</h1>

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
          <Music size={20} />
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

import React from 'react';
import Sidebar from './Sidebar';
import AudioPlayer from './player/AudioPlayer';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>
      <AudioPlayer />
    </div>
  );
};

export default Layout;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Music from './components/pages/Music';
import Podcasts from './components/pages/Podcasts';
import Playlist from './components/pages/Playlist';
import AdminUpload from './components/pages/AdminUpload';
import AudioPlayer from './components/player/AudioPlayer'; // Import AudioPlayer
import './App.css';

function App() {
  // You can manage player state here or pass props to AudioPlayer
  const audioPlayerProps = {
    audioSrc: "", // Initial empty or load from localStorage
    title: "No song selected",
    artist: "Select a song to play",
    thumbnail: "", // Optional: default thumbnail
  };

  return (
    <Router>
      <div className="app-container">
        {/* Main content area - all your pages */}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/music" element={<Music />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/admin" element={<AdminUpload />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

        {/* Global Audio Player - Fixed at bottom */}
        <div className="global-player">
          <AudioPlayer {...audioPlayerProps} />
        </div>
      </div>
    </Router>
  );
}

export default App;
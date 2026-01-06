import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Music from "./components/pages/Music";
import Search from "./components/pages/Search";
import Podcasts from "./components/pages/Podcasts";
import Playlist from "./components/pages/Playlist";
import AdminUpload from "./components/pages/AdminUpload";

import AudioPlayer from "./components/player/AudioPlayer";
import { PlayerProvider } from "./components/context/PlayerContext";
import Layout from "./components/Layout";

import "./App.css";

function App() {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/music" element={<Music />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/podcasts" element={<Podcasts />} />
                  <Route path="/playlist" element={<Playlist />} />
                  <Route path="/admin" element={<AdminUpload />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </PlayerProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Playlist from './components/pages/Playlist';
import AdminUpload from './components/pages/AdminUpload';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/admin" element={<AdminUpload />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
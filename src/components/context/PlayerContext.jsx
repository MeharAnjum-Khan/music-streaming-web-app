import React, { createContext, useState, useContext, useReducer, useEffect } from 'react';

/**
 * PlayerContext - Global state management for Spotify-like music player
 * Manages current track, queue, playback state, and player controls
 */

// Initial state
const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  queue: [],
  currentIndex: 0,
  repeatMode: 'none', // 'none', 'one', 'all'
  isShuffle: false,
  playlistContext: null, // Current playlist/album being played
};

// Reducer for complex state updates
const playerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true,
        currentIndex: 0,
      };
    
    case 'PLAY':
      return { ...state, isPlaying: true };
    
    case 'PAUSE':
      return { ...state, isPlaying: false };
    
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    
    case 'SET_VOLUME':
      return { ...state, volume: action.payload, isMuted: action.payload === 0 };
    
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };
    
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload.tracks,
        playlistContext: action.payload.context,
        currentIndex: 0,
      };
    
    case 'NEXT_TRACK':
      const nextIndex = (state.currentIndex + 1) % state.queue.length;
      return {
        ...state,
        currentIndex: nextIndex,
        currentTrack: state.queue[nextIndex],
        isPlaying: true,
      };
    
    case 'PREV_TRACK':
      const prevIndex = state.currentIndex > 0 ? state.currentIndex - 1 : state.queue.length - 1;
      return {
        ...state,
        currentIndex: prevIndex,
        currentTrack: state.queue[prevIndex],
        isPlaying: true,
      };
    
    case 'TOGGLE_SHUFFLE':
      return { ...state, isShuffle: !state.isShuffle };
    
    case 'SET_REPEAT':
      return { ...state, repeatMode: action.payload };
    
    default:
      return state;
  }
};

// Create context
const PlayerContext = createContext();

/**
 * PlayerProvider - Wraps the app to provide player state globally
 */
export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  
  // Save player state to localStorage
  useEffect(() => {
    localStorage.setItem('playerState', JSON.stringify({
      volume: state.volume,
      isMuted: state.isMuted,
      repeatMode: state.repeatMode,
      isShuffle: state.isShuffle,
    }));
  }, [state.volume, state.isMuted, state.repeatMode, state.isShuffle]);

  // Player actions
  const playTrack = (track) => {
    dispatch({ type: 'SET_TRACK', payload: track });
  };

  const playPlaylist = (tracks, context) => {
    dispatch({ type: 'SET_QUEUE', payload: { tracks, context } });
    if (tracks.length > 0) {
      dispatch({ type: 'SET_TRACK', payload: tracks[0] });
    }
  };

  const togglePlay = () => {
    dispatch({ type: 'TOGGLE_PLAY' });
  };

  const nextTrack = () => {
    dispatch({ type: 'NEXT_TRACK' });
  };

  const previousTrack = () => {
    dispatch({ type: 'PREV_TRACK' });
  };

  const setVolume = (volume) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const toggleMute = () => {
    dispatch({ type: 'TOGGLE_MUTE' });
  };

  const toggleShuffle = () => {
    dispatch({ type: 'TOGGLE_SHUFFLE' });
  };

  const setRepeatMode = (mode) => {
    dispatch({ type: 'SET_REPEAT', payload: mode });
  };

  const value = {
    ...state,
    playTrack,
    playPlaylist,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    toggleMute,
    toggleShuffle,
    setRepeatMode,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

/**
 * usePlayer - Custom hook to access player context
 */
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
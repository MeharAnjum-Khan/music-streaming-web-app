// import React, { createContext, useState, useContext, useRef } from 'react'

// /**
//  * Player Context
//  * Manages global audio player state
//  * Controls playback, queue, volume, and current track
//  */
// const PlayerContext = createContext()

// export const usePlayer = () => {
//   const context = useContext(PlayerContext)
//   if (!context) {
//     throw new Error('usePlayer must be used within a PlayerProvider')
//   }
//   return context
// }

// export const PlayerProvider = ({ children }) => {
//   // Audio element reference for direct DOM manipulation
//   const audioRef = useRef(null)
  
//   // Current playing track state - Set default track from template
//   const [currentTrack, setCurrentTrack] = useState({
//     id: '1',
//     title: 'Domestic Sweater',
//     artist: 'Wheeled',
//     coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
//     audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
//     type: 'song'
//   })
  
//   // Playback state
//   const [isPlaying, setIsPlaying] = useState(false)
  
//   // Volume state (0 to 1)
//   const [volume, setVolume] = useState(0.7)
  
//   // Progress state (0 to 100)
//   const [progress, setProgress] = useState(0)
  
//   // Duration of current track in seconds
//   const [duration, setDuration] = useState(0)
  
//   // Current playback time in seconds
//   const [currentTime, setCurrentTime] = useState(0)
  
//   // Playlist queue
//   const [queue, setQueue] = useState([])
  
//   // Repeat mode: 'none', 'one', 'all'
//   const [repeatMode, setRepeatMode] = useState('none')
  
//   // Shuffle state
//   const [isShuffle, setIsShuffle] = useState(false)

//   /**
//    * Play a specific track
//    * @param {Object} track - Track to play
//    */
//   const playTrack = (track) => {
//     if (track) {
//       setCurrentTrack(track)
//       setIsPlaying(true)
//       // Reset progress when changing tracks
//       setProgress(0)
//       setCurrentTime(0)
//     }
//   }

//   /**
//    * Toggle play/pause
//    */
//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying)
//   }

//   /**
//    * Skip to next track in queue
//    */
//   const nextTrack = () => {
//     if (queue.length > 0) {
//       const currentIndex = queue.findIndex(track => track.id === currentTrack?.id)
//       const nextIndex = (currentIndex + 1) % queue.length
//       playTrack(queue[nextIndex])
//     }
//   }

//   /**
//    * Go to previous track
//    */
//   const previousTrack = () => {
//     if (queue.length > 0) {
//       const currentIndex = queue.findIndex(track => track.id === currentTrack?.id)
//       const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1
//       playTrack(queue[prevIndex])
//     }
//   }

//   /**
//    * Update volume
//    * @param {number} newVolume - Volume level (0 to 1)
//    */
//   const updateVolume = (newVolume) => {
//     setVolume(newVolume)
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume
//     }
//   }

//   /**
//    * Seek to specific time in track
//    * @param {number} time - Time in seconds
//    */
//   const seekTo = (time) => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = time
//       setCurrentTime(time)
//       setProgress((time / duration) * 100)
//     }
//   }

//   /**
//    * Add tracks to queue
//    * @param {Array} tracks - Array of track objects
//    * @param {boolean} clearPrevious - Whether to clear existing queue
//    */
//   const addToQueue = (tracks, clearPrevious = false) => {
//     if (clearPrevious) {
//       setQueue(Array.isArray(tracks) ? tracks : [tracks])
//     } else {
//       setQueue(prev => [...prev, ...(Array.isArray(tracks) ? tracks : [tracks])])
//     }
//   }

//   /**
//    * Clear the entire queue
//    */
//   const clearQueue = () => {
//     setQueue([])
//   }

//   // Context value containing all player-related data and functions
//   const value = {
//     audioRef,
//     currentTrack,
//     isPlaying,
//     volume,
//     progress,
//     duration,
//     currentTime,
//     queue,
//     repeatMode,
//     isShuffle,
//     playTrack,
//     togglePlayPause,
//     nextTrack,
//     previousTrack,
//     updateVolume,
//     seekTo,
//     addToQueue,
//     clearQueue,
//     setDuration,
//     setCurrentTime,
//     setProgress,
//     setRepeatMode,
//     setIsShuffle
//   }

//   return (
//     <PlayerContext.Provider value={value}>
//       {children}
//     </PlayerContext.Provider>
//   )
// }

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
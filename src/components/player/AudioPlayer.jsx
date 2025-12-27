import React, { useRef, useState, useEffect } from 'react';
import './AudioPlayer.css';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

/**
 * Main AudioPlayer Component
 * Handles audio playback, controls, and coordinates between sub-components
 * 
 * @param {Object} props - Component props
 * @param {string} props.audioSrc - URL of the audio file to play
 * @param {string} props.title - Title of the audio track
 * @param {string} props.artist - Artist name
 * @param {string} props.thumbnail - URL of the track thumbnail image
 * @returns {JSX.Element} Audio player interface
 */
const AudioPlayer = ({ audioSrc, title = "No song selected", artist = "Select a song to play", thumbnail }) => {
  // Audio element reference for direct DOM manipulation
  const audioRef = useRef(null);
  
  // State management for player controls and status
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7); // Default volume at 70%
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0); // Normal playback speed
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none', 'all', 'one'
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [queue, setQueue] = useState([]);

  /**
   * Initialize audio duration when metadata is loaded
   * This ensures we have accurate duration before playback
   */
  useEffect(() => {
    const audio = audioRef.current;
    
    const setAudioData = () => {
      if (audio) {
        setDuration(audio.duration || 0);
      }
    };

    // Add event listeners for audio metadata and ended events
    audio?.addEventListener('loadedmetadata', setAudioData);
    audio?.addEventListener('ended', handleAudioEnded);

    // Cleanup function to remove event listeners
    return () => {
      audio?.removeEventListener('loadedmetadata', setAudioData);
      audio?.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  /**
   * Synchronize currentTime state with audio playback
   * Updates progress every 100ms for smooth visual feedback
   */
  useEffect(() => {
    let interval;
    
    if (isPlaying) {
      interval = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 100);
    }
    
    // Clear interval on cleanup or when playback stops
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  /**
   * Apply volume changes to audio element
   * Handles both volume level and mute state
   */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  /**
   * Toggle play/pause state
   * Handles both starting playback and pausing
   */
  const togglePlayPause = () => {
    const audio = audioRef.current;
    
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      // Attempt to play and handle potential errors
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  /**
   * Handle audio playback completion
   * Resets player state when track ends
   */
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  /**
   * Handle progress bar seek events
   * Updates audio position when user clicks/drags progress bar
   * 
   * @param {number} newTime - New time in seconds to seek to
   */
  const handleSeek = (newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  /**
   * Format time in seconds to MM:SS display format
   * 
   * @param {number} timeInSeconds - Time to format
   * @returns {string} Formatted time string (MM:SS)
   */
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  /**
   * Toggle between different playback speeds
   * Cycles through 0.5x, 1.0x, 1.5x, 2.0x speeds
   */
  const togglePlaybackRate = () => {
    const rates = [0.5, 1.0, 1.5, 2.0];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const nextRate = rates[nextIndex];
    
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  /**
   * Toggle repeat mode
   * Cycles through none → all → one → none
   */
  const toggleRepeatMode = () => {
    const modes = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  /**
   * Skip forward or backward by specified seconds
   * 
   * @param {number} seconds - Number of seconds to skip (positive for forward, negative for backward)
   */
  const skipTime = (seconds) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="audio-player">
      {/* Hidden audio element for actual playback */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      {/* Left: Track Info & Like Button */}
      <div className="player-track-info">
        <div className="track-thumbnail">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={`${title} album art`}
            />
          ) : (
            <div className="music-icon">🎵</div>
          )}
        </div>
        
        <div className="track-info">
          <h3 className="track-title">{title}</h3>
          <p className="track-artist">{artist}</p>
        </div>
        
        <button 
          className={`like-btn ${isLiked ? 'active' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
          title={isLiked ? "Remove from Liked Songs" : "Add to Liked Songs"}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Center: Player Controls */}
      <div className="player-controls-section">
        {/* Top Row: Playback Controls */}
        <div className="controls-row">
          <button 
            className="player-btn playback-rate-btn"
            onClick={togglePlaybackRate}
            title={`Playback Speed: ${playbackRate}x`}
          >
            {playbackRate}x
          </button>
          
          <button 
            className={`player-btn shuffle-btn ${isShuffle ? 'active' : ''}`}
            onClick={() => setIsShuffle(!isShuffle)}
            title={isShuffle ? "Disable shuffle" : "Enable shuffle"}
          >
            {isShuffle ? '🔀' : '↔️'}
          </button>
          
          <button 
            className="player-btn skip-btn"
            onClick={() => skipTime(-10)}
            title="Previous 10s"
          >
            ⏪
          </button>
          
          <button 
            className="player-btn play-pause-btn"
            onClick={togglePlayPause}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <button 
            className="player-btn skip-btn"
            onClick={() => skipTime(10)}
            title="Next 10s"
          >
            ⏩
          </button>
          
          <button 
            className={`player-btn repeat-btn ${repeatMode !== 'none' ? 'active' : ''}`}
            onClick={toggleRepeatMode}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === 'one' ? '🔂' : '🔁'}
          </button>
        </div>

        {/* Bottom Row: Progress Bar */}
        <div className="progress-section">
          <span className="time-display current-time">{formatTime(currentTime)}</span>
          
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            isPlaying={isPlaying}
          />
          
          <span className="time-display duration">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Queue Info */}
      <div className="player-extras">
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={setVolume}
          onToggleMute={() => setIsMuted(!isMuted)}
        />
        
        <div className="queue-info">
          <span className="queue-count">1/{queue.length || 1}</span>
          <span>in queue</span>
        </div>
        
        <button 
          className="player-btn queue-btn"
          onClick={() => setIsQueueOpen(!isQueueOpen)}
          title="Queue"
        >
          ≡
        </button>
      </div>

      {/* Status Footer */}
      <div className="player-footer">
        <span className="playback-info">
          {isPlaying ? "Now Playing" : "Paused"} • {playbackRate}x Speed • {Math.round(volume * 100)}% Volume
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
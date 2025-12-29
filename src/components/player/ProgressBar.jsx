
import React, { useState, useRef, useEffect } from 'react';
import './ProgressBar.css'; // Assuming you have a CSS file for styling

/**
 * ProgressBar Component
 * Visual representation of audio playback progress with interactive seeking
 * 
 * @param {Object} props - Component props
 * @param {number} props.currentTime - Current playback time in seconds
 * @param {number} props.duration - Total duration of audio in seconds
 * @param {Function} props.onSeek - Callback function when user seeks to a new position
 * @param {boolean} props.isPlaying - Whether audio is currently playing
 * @returns {JSX.Element} Progress bar interface
 */
const ProgressBar = ({ currentTime, duration, onSeek, isPlaying }) => {
  // Ref for the progress bar container to calculate click positions
  const progressBarRef = useRef(null);
  
  // State for drag interaction
  const [isDragging, setIsDragging] = useState(false);
  
  // Local time state for smooth dragging experience
  const [dragTime, setDragTime] = useState(currentTime);

  /**
   * Calculate progress percentage (0-100)
   * Handles edge cases where duration might be 0 or NaN
   */
  const progressPercentage = duration > 0 
    ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
    : 0;

  /**
   * Handle click on progress bar to seek to specific position
   * 
   * @param {React.MouseEvent} event - Mouse click event
   */
  const handleProgressClick = (event) => {
    if (!progressBarRef.current || !duration) return;
    
    // Get click position relative to progress bar
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    
    // Calculate new time based on click position
    const newTime = (clickX / width) * duration;
    
    // Call parent callback with clamped time value
    onSeek(Math.max(0, Math.min(newTime, duration)));
  };

  /**
   * Handle mouse down event for drag initiation
   */
  const handleMouseDown = () => {
    setIsDragging(true);
    setDragTime(currentTime);
  };

  /**
   * Handle mouse move during drag
   * 
   * @param {React.MouseEvent} event - Mouse move event
   */
  const handleMouseMove = (event) => {
    if (!isDragging || !progressBarRef.current || !duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    
    // Calculate new time based on drag position
    const newTime = (clickX / width) * duration;
    setDragTime(Math.max(0, Math.min(newTime, duration)));
  };

  /**
   * Handle mouse up to finalize drag and seek
   */
  const handleMouseUp = () => {
    if (isDragging) {
      onSeek(dragTime);
      setIsDragging(false);
    }
  };

  /**
   * Add/remove global mouse event listeners for drag handling
   */
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    const handleGlobalMouseMove = (event) => {
      if (isDragging) {
        handleMouseMove(event);
      }
    };

    // Add global listeners for drag outside component bounds
    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    // Cleanup function to remove listeners
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragTime]);

  /**
   * Format time for hover display
   * 
   * @param {number} time - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="progress-bar-container"
      ref={progressBarRef}
      onClick={handleProgressClick}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={duration || 0}
      aria-valuenow={currentTime}
      aria-label="Audio progress"
      tabIndex={0}
      // Allow keyboard navigation
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          onSeek(Math.max(0, currentTime - 5)); // Skip back 5 seconds
        } else if (e.key === 'ArrowRight') {
          onSeek(Math.min(duration, currentTime + 5)); // Skip forward 5 seconds
        }
      }}
    >
      {/* Background track of progress bar */}
      <div className="progress-bar-track">
        {/* Filled portion of progress bar */}
        <div 
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Hover preview time display */}
        <div 
          className="progress-bar-hover-time"
          style={{ left: `${isDragging ? (dragTime / duration) * 100 : progressPercentage}%` }}
        >
          {formatTime(isDragging ? dragTime : currentTime)}
        </div>
      </div>
      
      {/* Draggable handle */}
      <div 
        className="progress-bar-handle"
        style={{ left: `${progressPercentage}%` }}
        onMouseDown={handleMouseDown}
      />
      
      {/* Time labels */}
      <div className="progress-bar-labels">
        <span className="time-label current-time-label">
          {formatTime(currentTime)}
        </span>
        <span className="time-label duration-label">
          {formatTime(duration)}
        </span>
      </div>
      
      {/* Loading/Playing indicator */}
      <div className="progress-bar-status">
        <span className={`status-indicator ${isPlaying ? 'playing' : 'paused'}`}>
          {isPlaying ? '▶' : '⏸'}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
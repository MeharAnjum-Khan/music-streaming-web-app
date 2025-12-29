

import React, { useState, useRef, useEffect } from 'react';
import './VolumeControl.css'; // Assuming you have a CSS file for styling

/**
 * VolumeControl Component
 * Controls audio volume with mute toggle and slider
 * 
 * @param {Object} props - Component props
 * @param {number} props.volume - Current volume level (0-1)
 * @param {boolean} props.isMuted - Whether audio is muted
 * @param {Function} props.onVolumeChange - Callback when volume changes
 * @param {Function} props.onToggleMute - Callback to toggle mute state
 * @returns {JSX.Element} Volume control interface
 */
const VolumeControl = ({ volume, isMuted, onVolumeChange, onToggleMute }) => {
  // Ref for volume slider container
  const volumeSliderRef = useRef(null);
  
  // State for showing/hiding volume slider
  const [showSlider, setShowSlider] = useState(false);
  
  // State for drag interaction
  const [isDragging, setIsDragging] = useState(false);
  
  // Calculate volume percentage for display
  const volumePercentage = isMuted ? 0 : volume * 100;

  /**
   * Get appropriate volume icon based on volume level and mute state
   * 
   * @returns {string} Emoji representing current volume state
   */
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return '🔇'; // Muted icon
    } else if (volume < 0.3) {
      return '🔈'; // Low volume icon
    } else if (volume < 0.7) {
      return '🔉'; // Medium volume icon
    } else {
      return '🔊'; // High volume icon
    }
  };

  /**
   * Handle click on volume slider
   * 
   * @param {React.MouseEvent} event - Mouse click event
   */
  const handleVolumeClick = (event) => {
    if (!volumeSliderRef.current) return;
    
    const rect = volumeSliderRef.current.getBoundingClientRect();
    const clickY = rect.bottom - event.clientY; // Invert Y-axis for bottom-up slider
    const height = rect.height;
    
    // Calculate new volume (0-1) from click position
    const newVolume = Math.max(0, Math.min(1, clickY / height));
    
    // Update volume and ensure unmute if changing from muted state
    if (isMuted) {
      onToggleMute();
    }
    onVolumeChange(newVolume);
  };

  /**
   * Handle mouse down on volume slider for drag
   */
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  /**
   * Handle mouse move during volume drag
   * 
   * @param {React.MouseEvent} event - Mouse move event
   */
  const handleMouseMove = (event) => {
    if (!isDragging || !volumeSliderRef.current) return;
    
    const rect = volumeSliderRef.current.getBoundingClientRect();
    const mouseY = event.clientY;
    
    // Calculate volume based on mouse position (inverted Y-axis)
    const clickY = rect.bottom - mouseY;
    const height = rect.height;
    const newVolume = Math.max(0, Math.min(1, clickY / height));
    
    // Update volume during drag
    onVolumeChange(newVolume);
  };

  /**
   * Handle mouse up to end drag
   */
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /**
   * Toggle mute state with visual feedback
   */
  const handleMuteToggle = () => {
    onToggleMute();
    
    // Optional: Provide visual feedback
    if (isMuted && volume === 0) {
      // If was muted at 0 volume, set to 50% when unmuting
      onVolumeChange(0.5);
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

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  /**
   * Format volume as percentage for display
   * 
   * @returns {string} Volume percentage string
   */
  const formatVolume = () => {
    if (isMuted) return "Muted";
    return `${Math.round(volumePercentage)}%`;
  };

  return (
    <div className="volume-control">
      {/* Mute/Unmute Toggle Button */}
      <button
        className="volume-button"
        onClick={handleMuteToggle}
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => !isDragging && setShowSlider(false)}
        title={isMuted ? "Unmute" : "Mute"}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        <span className="volume-icon">{getVolumeIcon()}</span>
        <span className="volume-percentage">{formatVolume()}</span>
      </button>

      {/* Volume Slider (Vertical) */}
      <div 
        className={`volume-slider-container ${showSlider ? 'visible' : 'hidden'}`}
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => !isDragging && setShowSlider(false)}
      >
        <div 
          className="volume-slider"
          ref={volumeSliderRef}
          onClick={handleVolumeClick}
          onMouseDown={handleMouseDown}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={volumePercentage}
          aria-label="Volume control"
          tabIndex={0}
          // Keyboard navigation support
          onKeyDown={(e) => {
            let newVolume = volume;
            
            if (e.key === 'ArrowUp') {
              newVolume = Math.min(1, volume + 0.05); // Increase volume
            } else if (e.key === 'ArrowDown') {
              newVolume = Math.max(0, volume - 0.05); // Decrease volume
            } else if (e.key === 'm' || e.key === 'M') {
              handleMuteToggle(); // Toggle mute with 'm' key
              return;
            }
            
            if (newVolume !== volume) {
              if (isMuted) onToggleMute();
              onVolumeChange(newVolume);
            }
          }}
        >
          {/* Volume slider track */}
          <div className="volume-slider-track">
            {/* Filled portion of volume slider */}
            <div 
              className="volume-slider-fill"
              style={{ height: `${volumePercentage}%` }}
            />
            
            {/* Volume level indicator handle */}
            <div 
              className="volume-slider-handle"
              style={{ bottom: `${volumePercentage}%` }}
            />
          </div>
          
          {/* Volume level markers */}
          <div className="volume-markers">
            <div className="volume-marker" style={{ bottom: '0%' }}>0%</div>
            <div className="volume-marker" style={{ bottom: '25%' }}>25%</div>
            <div className="volume-marker" style={{ bottom: '50%' }}>50%</div>
            <div className="volume-marker" style={{ bottom: '75%' }}>75%</div>
            <div className="volume-marker" style={{ bottom: '100%' }}>100%</div>
          </div>
        </div>
        
        {/* Current volume display */}
        <div className="volume-display">
          <span className="current-volume">{formatVolume()}</span>
        </div>
        
        {/* Quick volume presets */}
        <div className="volume-presets">
          <button 
            className="volume-preset-btn"
            onClick={() => {
              if (isMuted) onToggleMute();
              onVolumeChange(0.25);
            }}
            title="25% Volume"
          >
            25%
          </button>
          <button 
            className="volume-preset-btn"
            onClick={() => {
              if (isMuted) onToggleMute();
              onVolumeChange(0.5);
            }}
            title="50% Volume"
          >
            50%
          </button>
          <button 
            className="volume-preset-btn"
            onClick={() => {
              if (isMuted) onToggleMute();
              onVolumeChange(0.75);
            }}
            title="75% Volume"
          >
            75%
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
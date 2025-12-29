import React from 'react';
import './MusicCard.css';

const MusicCard = ({ title, subtitle, image, onPlay }) => {
  return (
    <div className="music-card" onClick={onPlay}>
      <div className="music-image">
        {image ? <img src={image} alt={title} /> : <span>🎵</span>}
      </div>

      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
};

export default MusicCard;

import React from 'react';
import './PodcastCard.css';

const PodcastCard = ({ title, description, image }) => {
  return (
    <div className="podcast-card">
      <div className="podcast-image">
        {image ? <img src={image} alt={title} /> : <span>🎙️</span>}
      </div>

      <div className="podcast-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PodcastCard;

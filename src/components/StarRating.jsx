import React, { useState } from 'react';
import { saveUserRating, getUserRating } from '../utils/localStorage';
import './StarRating.css';

const StarRating = ({ movieId, readonly = false, size = 'medium' }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const currentRating = getUserRating(movieId);

  const handleStarClick = (rating) => {
    if (!readonly) {
      saveUserRating(movieId, rating);
      // Force re-render by updating component
      window.dispatchEvent(new CustomEvent('ratingChanged'));
    }
  };

  const handleMouseEnter = (rating) => {
    if (!readonly) {
      setHoveredRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(0);
    }
  };

  const getStarClass = (starNumber) => {
    const rating = hoveredRating || currentRating;
    let className = `star ${size}`;
    
    if (readonly) className += ' readonly';
    if (starNumber <= rating) className += ' filled';
    
    return className;
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={getStarClass(star)}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          ⭐
        </span>
      ))}
      {currentRating > 0 && (
        <span className="rating-text">({currentRating}/5)</span>
      )}
    </div>
  );
};

export default StarRating;

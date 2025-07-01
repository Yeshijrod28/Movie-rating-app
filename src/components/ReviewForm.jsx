import React, { useState, useEffect } from 'react';
import { saveUserReview} from '../utils/localStorage';
import './ReviewForm.css';

const ReviewForm = ({ movieId, currentReview }) => {
  const [review, setReview] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setReview(currentReview || '');
  }, [currentReview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      saveUserReview(movieId, review.trim());
      setIsEditing(false);
      // Trigger a re-render
      window.dispatchEvent(new CustomEvent('reviewChanged'));
    }
  };

  const handleCancel = () => {
    setReview(currentReview || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    saveUserReview(movieId, '');
    setReview('');
    setIsEditing(false);
    window.dispatchEvent(new CustomEvent('reviewChanged'));
  };

  return (
    <div className="review-form">
      {!isEditing && !currentReview && (
        <button 
          className="add-review-btn"
          onClick={() => setIsEditing(true)}
        >
          + Add a Review
        </button>
      )}

      {!isEditing && currentReview && (
        <div className="existing-review">
          <p className="review-text">"{currentReview}"</p>
          <div className="review-actions">
            <button 
              className="edit-review-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button 
              className="delete-review-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="review-form-active">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here... (max 500 characters)"
            maxLength={500}
            rows={4}
            className="review-textarea"
            autoFocus
          />
          <div className="review-form-actions">
            <div className="char-count">
              {review.length}/500
            </div>
            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={!review.trim()}
              >
                Save Review
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
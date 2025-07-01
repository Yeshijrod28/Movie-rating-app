
// Utility functions for managing user ratings and reviews in localStorage

const RATINGS_KEY = 'movieRatings';
const REVIEWS_KEY = 'movieReviews';

// Rating functions
export const saveUserRating = (movieId, rating) => {
  try {
    const ratings = getUserRatings();
    ratings[movieId] = rating;
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    console.log(`Saved rating ${rating} for movie ${movieId}`);
  } catch (error) {
    console.error('Error saving rating:', error);
  }
};

export const getUserRating = (movieId) => {
  try {
    const ratings = getUserRatings();
    return ratings[movieId] || 0;
  } catch (error) {
    console.error('Error getting rating:', error);
    return 0;
  }
};

export const getUserRatings = () => {
  try {
    const ratings = localStorage.getItem(RATINGS_KEY);
    return ratings ? JSON.parse(ratings) : {};
  } catch (error) {
    console.error('Error getting ratings:', error);
    return {};
  }
};

// Review functions
export const saveUserReview = (movieId, review) => {
  try {
    const reviews = getUserReviews();
    if (review.trim()) {
      reviews[movieId] = review;
    } else {
      delete reviews[movieId];
    }
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    console.log(`Saved review for movie ${movieId}`);
  } catch (error) {
    console.error('Error saving review:', error);
  }
};

export const getUserReview = (movieId) => {
  try {
    const reviews = getUserReviews();
    return reviews[movieId] || '';
  } catch (error) {
    console.error('Error getting review:', error);
    return '';
  }
};

export const getUserReviews = () => {
  try {
    const reviews = localStorage.getItem(REVIEWS_KEY);
    return reviews ? JSON.parse(reviews) : {};
  } catch (error) {
    console.error('Error getting reviews:', error);
    return {};
  }
};

// Utility functions
export const clearAllData = () => {
  try {
    localStorage.removeItem(RATINGS_KEY);
    localStorage.removeItem(REVIEWS_KEY);
    console.log('Cleared all user data');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

export const exportUserData = () => {
  try {
    const ratings = getUserRatings();
    const reviews = getUserReviews();
    return {
      ratings,
      reviews,
      exportDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

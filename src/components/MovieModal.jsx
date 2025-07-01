import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import {getUserReview } from '../utils/localStorage';

const MovieModal = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState('');
  
  const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits,videos`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [movie.id]);

  // Initialize user review
  useEffect(() => {
    setUserReview(getUserReview(movie.id));
  }, [movie.id]);

  // Listen for review changes
  useEffect(() => {
    const handleReviewChange = () => {
      console.log('Review changed event received, updating review state');
      setUserReview(getUserReview(movie.id));
    };

    window.addEventListener('reviewChanged', handleReviewChange);
    
    return () => {
      window.removeEventListener('reviewChanged', handleReviewChange);
    };
  }, [movie.id]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatBudget = (budget) => {
    if (!budget) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(budget);
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        
        {loading ? (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
            <p>Loading movie details...</p>
          </div>
        ) : (
          <div className="modal-body">
            <div className="modal-header">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="modal-poster"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNzUwIiBmaWxsPSIjMmEyYTJhIi8+CjxwYXRoIGQ9Ik0yNTAgMzc1TDIwMCAzMjVIMzAwTDI1MCAzNzVaIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjI1MCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2MDYwNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
              
              <div className="modal-info">
                <h2 className="modal-title">{movie.title}</h2>
                <div className="modal-meta">
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  <span>•</span>
                  <span>{formatRuntime(movieDetails?.runtime)}</span>
                  <span>•</span>
                  <span>{movieDetails?.genres?.map(g => g.name).join(', ') || 'N/A'}</span>
                </div>
                
                <div className="ratings-section">
                  <div className="tmdb-rating-large">
                    <span className="rating-label">TMDB Rating</span>
                    <span className="rating-value">🎭 {movie.vote_average?.toFixed(1)}/10</span>
                  </div>
                  
                  <div className="user-rating-section">
                    <span className="rating-label">Your Rating</span>
                    <StarRating movieId={movie.id} size="large" />
                  </div>
                </div>
                
                <p className="movie-overview">{movie.overview}</p>
                
                {movieDetails && (
                  <div className="movie-details-grid">
                    <div className="detail-item">
                      <strong>Director:</strong> 
                      {movieDetails.credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A'}
                    </div>
                    <div className="detail-item">
                      <strong>Budget:</strong> {formatBudget(movieDetails.budget)}
                    </div>
                    <div className="detail-item">
                      <strong>Revenue:</strong> {formatBudget(movieDetails.revenue)}
                    </div>
                    <div className="detail-item">
                      <strong>Language:</strong> {movieDetails.original_language?.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-reviews">
              <h3>Your Review</h3>
              <ReviewForm movieId={movie.id} currentReview={userReview} />
            </div>
            
            {movieDetails?.credits?.cast && movieDetails.credits.cast.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Cast</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                  gap: '16px' 
                }}>
                  {movieDetails.credits.cast.map((actor) => (
                    <div key={actor.id} style={{ textAlign: 'center' }}>
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          style={{
                            width: '100%',
                            height: '128px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '8px'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '128px',
                          backgroundColor: '#334155',
                          borderRadius: '8px',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>No Photo</span>
                        </div>
                      )}
                      <p style={{ color: 'white', fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>
                        {actor.name}
                      </p>
                      <p style={{ color: '#9CA3AF', fontSize: '12px' }}>
                        {actor.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;

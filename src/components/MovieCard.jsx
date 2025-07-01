
import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster">
        <img src={imageUrl} alt={movie.title} />
        <div className="movie-overlay"></div>
        <div className="rating-overlay">
          <div className="user-rating-badge">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{releaseYear}</p>
        <div className="movie-rating">
          <span className="tmdb-rating">TMDB: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

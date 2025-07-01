import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import SearchBar from '../components/SearchBar';

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
  const BASE_URL = 'https://api.themoviedb.org/3';

  const fetchMovies = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const endpoint = query 
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
      
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (page === 1) {
        setMovies(data.results || []);
      } else {
        setMovies(prev => [...prev, ...(data.results || [])]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchMovies(query, 1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(searchQuery, nextPage);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🎬 MovieRating</h1>
          <p className="app-subtitle">Discover, Rate & Review Movies</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="main-content">
        {loading && movies.length === 0 ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading amazing movies...</p>
          </div>
        ) : (
          <>
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </div>
            
            {movies.length > 0 && (
              <div className="load-more-container">
                <button 
                  className="load-more-btn"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Movies'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;

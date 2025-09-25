import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('/movies');
        setMovies(res.data);
      } catch (err) {
        console.log('Error fetching movies:', err);
      }
    };
    fetchMovies();
  }, []);

  const handleDetails = (movie) => {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    navigate('/movie-details');
  };

  const handleBooking = (movie) => {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    navigate('/booking');
  };

  return (
    <div className="container mt-4">

      {/* Banner Carousel Section */}
      <div
        id="bannerCarousel"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner rounded">
          {movies.slice(0, 5).map((movie, index) => (
            <div
              key={movie._id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              {movie.poster && (
                <img
                  src={movie.poster}
                  className="d-block w-100"
                  alt={movie.title}
                  style={{
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                  }}
                />
              )}
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>{movie.title}</h5>
                <p style={{ fontSize: '0.85rem' }}>{movie.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Now Showing Section */}
      <h2 className="text-primary mb-4 text-center">Now Showing</h2>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie._id} className="col-md-4 mb-4">
            <div 
              className="card shadow-sm h-100 p-3"
              style={{
                borderRadius: '15px',
                borderTop: '5px solid #007BFF',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* Movie Poster */}
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="card-img-top mb-3"
                  style={{ height: '300px', objectFit: 'cover', borderRadius: '10px' }}
                />
              )}

              <div className="bg-primary text-white p-2 rounded mb-3 text-center" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {movie.title}
              </div>
              <div style={{ minHeight: '80px', maxHeight: '100px', overflow: 'auto', marginBottom: '10px' }}>
                <p className="text-muted">{movie.description}</p>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate(`/movie/${movie._id}`)}
              >
                Details & Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

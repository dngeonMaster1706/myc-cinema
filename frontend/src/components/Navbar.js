import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand text-primary fw-bold" to="/home">
          TicketApp
        </Link>
        
        <div className="d-flex">
          {localStorage.getItem('token') && (
            <>
              {/* My Bookings Button */}
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => navigate('/mybookings')}
              >
                My Bookings
              </button>

              {/* Logout Button */}
              <button
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

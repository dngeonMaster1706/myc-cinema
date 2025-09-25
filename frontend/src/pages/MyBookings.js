import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`/bookings/${userId}`);
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await axios.delete(`/bookings/${id}`);
      alert('Booking cancelled successfully');
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      console.log(err);
      alert('Failed to cancel booking');
    }
  };

  // Calculate total money spent
  const totalSpent = bookings.reduce((acc, b) => acc + b.totalPrice, 0);

  return (
    <div className="container mt-4 mb-5">
      <h3 className="text-primary mb-4 text-center">My Bookings</h3>
      <div className="row">
        {bookings.length === 0 ? (
          <p className="text-center">No bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div className="col-md-6 mb-3" key={booking._id}>
              <div
                className="card shadow-sm p-3"
                style={{
                  borderRadius: '12px',
                  borderLeft: '4px solid #007BFF',
                  fontSize: '0.9rem',
                  lineHeight: '1.2rem'
                }}
              >
                {/* Movie Poster */}
                {booking.movie.poster && (
                  <img
                    src={booking.movie.poster}
                    alt={booking.movie.title}
                    className="card-img-top mb-2"
                    style={{ height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                )}

                <h5 className="text-primary mb-1">{booking.movie.title}</h5>
                <p className="mb-1"><strong>Date:</strong> {booking.date}</p>
                <p className="mb-1"><strong>Time:</strong> {booking.time}</p>
                <p className="mb-1"><strong>Seats:</strong> {booking.seats}</p>
                <p className="mb-2"><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                
                {/* Compact Cancel Button */}
                <button
                  className="btn btn-sm btn-outline-danger mt-1 px-3 py-1"
                  style={{ fontSize: '0.8rem' }}
                  onClick={() => handleCancel(booking._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total Money Spent */}
      {bookings.length > 0 && (
        <div className="mt-4 p-3 bg-light rounded text-center shadow-sm">
          <h5>Total Money Spent: ₹{totalSpent}</h5>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

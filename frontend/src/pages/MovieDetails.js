import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/movies/${id}`);
        setMovie(res.data);
        setDate(res.data.date);  // default date
        setTime(res.data.time);  // default time
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleBooking = () => {
    if (!date || !time) {
      alert('Please select both date and time');
      return;
    }

    const bookingData = {
      user: JSON.parse(localStorage.getItem('user')).id,
      movie: movie._id,
      seats: seats,
      totalPrice: seats * movie.price,
      date: date,
      time: time
    };
    localStorage.setItem('booking', JSON.stringify(bookingData));
    navigate('/payment');
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', borderRadius: '15px', borderTop: '5px solid #007BFF' }}>
        <h3 className="text-primary mb-3">{movie.title}</h3>
        <p className="text-muted">{movie.description}</p>
        <div className="mb-2"><strong>Genre:</strong> {movie.genre}</div>
        <div className="mb-2"><strong>Duration:</strong> {movie.duration}</div>

        {/* Date Picker */}
        <div className="mb-3">
          <label className="form-label"><strong>Select Date:</strong></label>
          <input
            type="date"
            className="form-control rounded-pill"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Time Picker */}
        <div className="mb-3">
          <label className="form-label"><strong>Select Time:</strong></label>
          <select
            className="form-select rounded-pill"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value={movie.time}>{movie.time}</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="10:00 PM">10:00 PM</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Number of Seats:</label>
          <input
            type="number"
            className="form-control rounded-pill"
            min="1"
            max="10"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 rounded-pill shadow-sm" onClick={handleBooking}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;

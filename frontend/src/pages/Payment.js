import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const Payment = () => {
  const navigate = useNavigate();
  const booking = JSON.parse(localStorage.getItem('booking'));

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = async () => {
    // ----- VALIDATIONS -----
    const cardRegex = /^\d{8}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY
    const cvvRegex = /^\d{3}$/;

    if (!cardRegex.test(cardNumber)) {
      alert('Enter a valid 8-digit card number');
      return;
    }

    if (!expiryRegex.test(expiry)) {
      alert('Enter expiry in MM/YY format');
      return;
    }

    // Check if expiry is in the past
    const [month, year] = expiry.split('/');
    const expDate = new Date(`20${year}`, month); // set to first day of next month
    const today = new Date();
    if (expDate < today) {
      alert('Card is expired');
      return;
    }

    if (!cvvRegex.test(cvv)) {
      alert('Enter a valid 3-digit CVV');
      return;
    }

    // ----- DUMMY PAYMENT SUCCESS -----
    try {
      await axios.post('/bookings', booking);
      alert('Payment Successful! Booking Confirmed.');
      localStorage.removeItem('booking');
      navigate('/mybookings');
    } catch (err) {
      alert('Payment Failed');
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', borderRadius: '15px', borderTop: '5px solid #007BFF' }}>
        <h3 className="text-primary mb-3">Payment</h3>
        <div className="mb-3"><strong>Movie:</strong> {booking.movie}</div>
        <div className="mb-3"><strong>Seats:</strong> {booking.seats}</div>
        <div className="mb-3"><strong>Total Amount:</strong> ₹{booking.totalPrice}</div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control rounded-pill mb-2"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            className="form-control rounded-pill mb-2"
            placeholder="Expiry MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <input
            type="text"
            className="form-control rounded-pill mb-2"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 rounded-pill shadow-sm" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;

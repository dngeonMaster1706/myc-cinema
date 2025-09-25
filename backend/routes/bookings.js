const express = require('express');
const router = express.Router();
const { addBooking, getBookings ,deleteBooking} = require('../controllers/bookingController');

// Routes
router.post('/', addBooking);                // Create booking
router.get('/:userId', getBookings);         // Get user bookings
router.delete('/:id', deleteBooking);
module.exports = router;

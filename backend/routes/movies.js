const express = require('express');
const router = express.Router();
const { addMovie, getMovies, getMovie } = require('../controllers/movieController');

// Routes
router.post('/', addMovie);        // Add movie
router.get('/', getMovies);        // Get all movies
router.get('/:id', getMovie);      // Get single movie details

module.exports = router;

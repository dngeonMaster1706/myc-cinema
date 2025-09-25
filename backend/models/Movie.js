const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String },
  duration: { type: String },
  date: { type: String },       // or Date if you want
  time: { type: String },
  price: { type: Number },
  poster: { type: String }      // <-- Poster URL
});

module.exports = mongoose.model('Movie', movieSchema);

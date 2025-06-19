// models/Movie.js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: String,
  director: String,
  releaseDate: Date,
  rating: Number,
  actors: [String],
  posterUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;

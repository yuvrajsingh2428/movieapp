// controllers/movieController.js
import axios from 'axios';
import {Movie} from "../models/Movie.model.js";
import { asyncHandler } from '../utils/asyncHandler.js';



const searchMovies = asyncHandler(async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
        if (response.data.Response === 'False') {
            return res.status(404).json({ message: response.data.Error });
        }
        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error fetching movies from OMDB API:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const addMovie = asyncHandler(async (req, res) => {
    const { imdbID, title, year, genre, poster } = req.body;
    try {
        let movie = await Movie.findOne({ imdbID });
        if (!movie) {
            movie = new Movie({ imdbID, title, year, genre, poster });
            await movie.save();
        }
        res.status(201).json(movie);
    } catch (err) {
        console.error('Error adding movie:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

export{
    searchMovies,
    addMovie
}

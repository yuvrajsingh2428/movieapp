
import axios from "axios";
import mongoose from "mongoose";
import {List} from "../models/List.model.js" 
import {Movie} from  "../models/Movie.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const createList = asyncHandler(async (req, res) => {
  const { name, isPublic } = req.body;
  const userId = req.user.id;
  try {
    const list = new List({ name, user: userId, isPublic });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getLists = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  try {
    const lists = await List.find({ user: userId }).populate("movies");
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getDefaultList = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  try {
    const defaultList = await List.findOne({
      user: userId,
      name: "Default List",
    });
    if (!defaultList) {
      return res.status(404).json({ message: "Default list not found" });
    }
    res.status(200).json(defaultList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const addMovieToList = asyncHandler(async (req, res) => {
    const { listId, movieId } = req.body; // movieId is the imdbID

    try {
        const list = await List.findById(new mongoose.Types.ObjectId(listId));
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        // Check if the movie already exists in our database
        let movie = await Movie.findOne({ imdbID: movieId });
        if (!movie) {
            // Fetch movie details from OMDB API
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`);
            if (response.data.Response === 'False') {
                return res.status(404).json({ message: response.data.Error });
            }

            const { Title, Year, Genre, Poster, imdbID } = response.data;
            movie = new Movie({ title: Title, year: Year, genre: Genre, poster: Poster, imdbID });
            await movie.save();
        }

        // Add movie to list if it's not already there
        if (!list.movies.includes(movie.imdbID)) {
            list.movies.push(movie.imdbID); // Use imdbID here
            await list.save();
        }

        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export {
  addMovieToList,
  getDefaultList,
  getLists,
  createList
}

// exports.getMoviesForUser = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userLists = await List.find({ user: userId }).populate('movies');
//     const movies = userLists.map(list => list.movies).flat(); // Combine all movies from user's lists into one array
//     res.json(movies);
//   } catch (error) {
//     console.error("Error fetching user's movie list:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
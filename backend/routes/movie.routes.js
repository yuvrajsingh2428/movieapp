// routes/movie.js
import {Router} from "express"
import{
    searchMovies,
    addMovie
} from "../controllers/movie.Controller.js"

import {verifyJWT} from "../middlewares/auth.Middleware.js"

const router = Router();

router.use(verifyJWT)


router.get('/search', verifyJWT, searchMovies);
router.post('/', verifyJWT, addMovie);

export default router

import {Router} from "express"
import { 
    createList, 
    getLists, 
    addMovieToList, 
    getDefaultList 
} from "../controllers/list.Controller.js"
import { verifyJWT } from "../middlewares/auth.Middleware.js";


const router = Router();

router.post('/', verifyJWT, createList);
router.get('/', verifyJWT, getLists);
router.get('/default', verifyJWT, getDefaultList); 
router.post('/add-movie', verifyJWT, addMovieToList);

export default router;

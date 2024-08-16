
import express from "express"
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js';
import listRoutes from './routes/list.routes.js';


dotenv.config({
    path: './.env'
});

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`server is running at port: ${process.env.PORT || 5000}`);
            
        })
    }).catch (err => {
        console.log("mongoDB connection failed!!!", err);
})
        



app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/lists', listRoutes);



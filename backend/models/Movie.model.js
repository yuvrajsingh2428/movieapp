import mongoose, {Schema} from "mongoose";


const movieSchema = new Schema({
    imdbID: { 
        type: String, 
        required: true, 
        unique: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    year: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    poster: { 
        type: String, 
        required: true 
    },
    }, 
    { 
        timestamps: true 
});


export const Movie = mongoose.model("Movie", movieSchema)


import mongoose, {Schema} from "mongoose";

const listSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    movies: [{ 
        type: String, 
        ref: 'Movie' 
    }], // Reference movies by imdbID as a string
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    isPublic: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

export const List = mongoose.model("List", listSchema);

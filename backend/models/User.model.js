import mongoose, {Schema} from 'mongoose';
//import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: [true, "Password is required" ]
        },
    },  
    { 
        timestamps: true 

    }
);

userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
        
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return  await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema)

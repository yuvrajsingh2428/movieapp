import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, "Unauthorized request");
    }
    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        throw new ApiError(401, 'Token is not valid');
    }
});

export{verifyJWT}

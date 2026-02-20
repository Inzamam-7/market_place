import ApiError from "../helper/ApiError.js";
import { clearCookie, setCookies } from "../helper/cookieHelper.js";
import generateAccessToken from "../helper/generateToken.js";
import successResponse from "../helper/successReponse.js";
import { User } from "../models/userModels.js";


const register = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new ApiError(400, "user already exists")
        }

        const user = await User.create({
            email,
            password
        })

        user.password = undefined;

        const token = generateAccessToken(user)
        
        setCookies(res, token)

        return successResponse(res, 200, user, "User registered successfully")
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        const user = await User.findOne({ email })
        // console.log("user", user);

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        const isPasswordMatched = await user.comparePassword(password)
        
        if (!isPasswordMatched) {
            throw new ApiError(403, "Incorrect email or password")
        }

        user.password = undefined;

        const token = generateAccessToken(user)

        setCookies(res, token)

        return successResponse(res, 200, user, "User logged in successfully")

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        })
    }
}


const getUser = async (req, res) => {
    try {
        const user = req.user
        // console.log("yeh user h ",user);
        
        if (!user) {
            throw new ApiError(403, "User not found")
        }

        return successResponse(res, 200, user, "User details fetched")

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            throw new ApiError(403, "user not found")
        }

        clearCookie(res)

        return successResponse(res, 200, {}, "user logged out successfully")

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });

    }
}

export { login, register,getUser,logout }
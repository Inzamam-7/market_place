import ApiError from "../helper/ApiError.js"
import jwt from 'jsonwebtoken'
import { User } from "../models/userModels.js"

const protect = async(req,res,next) =>{
    try{
      const token = req.cookies?.accessToken
      // console.log(req.cookies.accessToken);
      if(!token){
        throw new ApiError(401, "Unauthorized, Token not found")
      }

      const decode =  jwt.verify(token,process.env.ACCESS_TOKEN)

      const user = await User.findById(decode.id).select("-password").lean()

      if(!user){
        throw new ApiError(401, "User not found")
      }

      req.user = user;

      next();

    }catch(error){
      return res.status(error.statusCode || 500).json({
        success:false,
        message:error.message || "Unauthorized"
      })
    }
}

export default protect
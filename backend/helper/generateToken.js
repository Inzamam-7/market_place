import jwt from 'jsonwebtoken'

export default function generateAccessToken(user){
    return jwt.sign(
        {id:user._id},
        process.env.ACCESS_TOKEN,
        {expiresIn:'1h'}
    )
}
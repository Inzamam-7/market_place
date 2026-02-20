const cookieOptions ={
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"strict",
    path:"/",
     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

export const setCookies = (res,token) =>{
   res.cookie("accessToken",token,cookieOptions)
}

export const clearCookie = (res) =>{
    res.clearCookie("accessToken",cookieOptions)
}
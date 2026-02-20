export default function successResponse(res,statusCode=200,data=null,message){
   return res.status(statusCode).json({
    success:true,
    message,
    data
   })
}
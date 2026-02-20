import mongoose from 'mongoose'

async function connectDB(){
    try{
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI not found");
        }

        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected successfully`,mongoose.connection.host);
    }catch(error){
        console.error(error.message)
        process.exit(1)
    }
}

export default connectDB
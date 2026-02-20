import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    favorites: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product" 
        }
    ]
})


userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.comparePassword = async function(password){   
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema)
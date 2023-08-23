import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isVerfied:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date

})

const User=mongoose.models.users || mongoose.model("users",userSchema)
export default User
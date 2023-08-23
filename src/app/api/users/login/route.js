import { connect } from "@/dbconfig/mongodb";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from'bcryptjs'
import jwt from "jsonwebtoken";
connect()

export async function POST(req){
    try {
        const reqBody= await req.json()
        const {email,password}=reqBody
        console.log(reqBody)
        // Check if user exists --->
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({msg:"User does not exists"})
        }
        
        // check if password is correct
        const validPassword=await bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({msg:"Password doesnot match",passwordInvalid:true})
        }

        //Create token data====>
        const tokenData={
            id:user._id,
            name:user.name,
            email:user.email
        }
        // create token===>
        const token=await jwt.sign(tokenData,"loaosdjklasflkadiodasfj",{expiresIn:"1d"})
        const response=NextResponse.json({msg:"Login successful",success:true})
        response.cookies.set("token",token,{
            httpOnly:true,

        })

        return response

    } catch (error) {
        return NextResponse.json({msg:error.message})
    }
}
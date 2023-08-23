import { connect } from "@/dbconfig/mongodb";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from'bcryptjs'


connect()

export async function POST(req){
    try{
        const reqBody=await req.json()
        const {name,email,password}=reqBody
        
        if(!name||!email||!password){
            return NextResponse.json({msg:"Please fill if the blank area",blank:true})
        }

        //If user is already exists===>
        const user=await User.findOne({email})
        if(user){
            return NextResponse.json({msg:"user already exsists"},{status:400})
        }

        //hashPassword====>
        const hashedPassword=await bcryptjs.hash(password,12)
        console.log(hashedPassword)

        const newUser= await new User({
            name,
            email,
            password:hashedPassword
        })
        const savedUser= await newUser.save()
        console.log(savedUser)

        return NextResponse.json({msg:"User created",succes:true,savedUser},{status:201})


    }catch(err){
        return NextRequest.json({msg:err})
    }
    
}
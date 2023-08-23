"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function page() {
    const router=useRouter()
    const [loading,setLoding]=useState(false)
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    })
    function handleChange(e){
        const {name,value}=e.target
        setFormData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
   async function handleSubmit(e){
        e.preventDefault()
        const {name,value}=e.target
        setFormData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })

        try {
            setLoding(true)
           const response=await axios.post("/api/users/signup",formData)
           console.log("singup success",response.data)
           if(response.data.blank===true){
            toast.error(response.data.msg)
            router.push("/signup")
           }
           else{

               router.push("/login")
           }

        } catch (error) {
            console.log("signup error",error.message)
            toast.error("sign up error")
        }finally{
            setLoding(false)
        }



       
    }
    return (
        <div>
            <h1>{loading?"proceessing":"signin"}</h1>
           <form onSubmit={handleSubmit}>
            <input type="text" name='name' placeholder='enter your name'  value={formData.name} onChange={handleChange}/>
            <input type="email" name='email' placeholder='enter your email' value={formData.email} onChange={handleChange}/>
            <input type="password" name='password' placeholder='enter your password' value={formData.password} onChange={handleChange}/>
            <button>Submit</button>
            </form>   


        </div>
    )
}

export default page
"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function page() {
    const router=useRouter()
    const [formData,setFormData]=useState({
       
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
  async  function handleSubmit(e){
        e.preventDefault()
        const {name,value}=e.target
        setFormData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
        console.log(formData)
        try {
            const res=await axios.post("/api/users/login",formData)
            console.log("login successfull",res.data)
            if(res.data.passwordInvalid===true){
                toast.error("Credentials does not match")
                router.push("/login")
            }
            else{

                router.push("/profile")
            }
        } catch (error) {
            toast.error("login failed",error.message)
        }
        // router.push("/login")
    }
    return (
        <div>
           <form onSubmit={handleSubmit}>
            <input type="email" name='email' placeholder='enter your email' value={formData.email} onChange={handleChange}/>
            <input type="password" name='password' placeholder='enter your password'  value={formData.password} onChange={handleChange}/>
            <button>Submit</button>
            </form>   


        </div>
    )
}

export default page
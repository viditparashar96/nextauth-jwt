"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    function handleSubmit(e){
        e.preventDefault()
        const {name,value}=e.target
        setFormData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
        console.log(formData)
        // router.push("/login")
    }
    return (
        <div>
           <form onSubmit={handleSubmit}>
            <input type="text" name='name' placeholder='enter your name'  value={formData.name} onChange={handleChange}/>
            <input type="email" name='email' placeholder='enter your email' value={formData.email} onChange={handleChange}/>
            <button>Submit</button>
            </form>   


        </div>
    )
}

export default page
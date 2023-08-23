"use client"
import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
function page() {
  const router=useRouter()
  async function handleLogout(){
    
      try {
        await axios.get("/api/users/logout")
        toast.success("logout successful")
        router.push("/")
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
    

  }
  return (
    <div>
        <h1>Profile page</h1>
        <h1>hii Your name</h1>
        <hr />
        <button onClick={handleLogout}>Logout</button>
        </div>
  )
}

export default page
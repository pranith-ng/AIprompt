"use client"

import {React, useContext, useState} from 'react';
import Link from 'next/link';
import { auth } from "@/app/firebase/firebase"
import {signInWithEmailAndPassword, } from "firebase/auth"
import { useRouter } from "next/navigation";
import { GlobalContext } from '@/Contexts/Context';

const Page = () => {


  const {authuser, setauthuser} = useContext(GlobalContext)

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [errormessage, seterrormessage] = useState(null)

  const router = useRouter();

 const signin = async() => {
  try{
    
    if(username !== "" & username.includes("@")){
     const usercredentials =  await signInWithEmailAndPassword(auth, username, password)
     const user = usercredentials.user
     sessionStorage.clear()
     if(user) {
      setusername("")
      setpassword("")
      setauthuser(user)
      seterrormessage(null)
      router.push("/Accountpage")
     }
    }
   }
   catch(err){
    console.error(err.message)
    seterrormessage(err.message)
   }
 }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={(e) => setusername(e.target.value)}
              value={username}
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button onClick={signin} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200">Submit</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link href="/Signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>

       {errormessage && 
        <div className="bg-red-400 text-white rounded -lg">
        <p className="text-center" >{errormessage}</p>
      </div>
       }
      </div>
    </div>
  );
}

export default Page;

"use client"

import {React, useContext, useState} from 'react';
import Link from 'next/link';
import { auth } from "@/app/firebase/firebase"
import {createUserWithEmailAndPassword, } from "firebase/auth"
import { useRouter } from "next/navigation";
import { GlobalContext } from '@/Contexts/Context';
import { MdOutlineClose } from "react-icons/md";

const SignUpPage = () => {

  const {authuser, setauthuser} = useContext(GlobalContext)

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")
  const [errormessage, seterrormessage] = useState(null)

  const router = useRouter();

  const Signup = async () =>  {
   try{
    if(password !== confirmpassword){
      seterrormessage('ERROR : password doesnt match')
    }

    if(username !== "" & username.includes("@") & password === confirmpassword ){
     const usercredentials =  await createUserWithEmailAndPassword(auth, username, password)
     const user = usercredentials.user
     sessionStorage.clear()
     setusername("")
     setpassword("")
     setconfirmpassword("")
     seterrormessage(null)
     if(user) {
      setauthuser(user)
      router.push("/Accountpage")
     }
    }
   }
   catch(err){
    seterrormessage(err.message)
   }
    
  }

  const signupclose = () => {
    router.push("/Accountpage")
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className='flex items-center justify-between mb-6'>
        <h2 className="text-2xl font-semibold  ">Sign Up</h2>
        <span onClick={signupclose} className='text-3xl hover:text-red-500'><MdOutlineClose /></span>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
            value={username}
              onChange={(event) => setusername(event.target.value)}
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
            value={password}
            onChange={(event) => setpassword(event.target.value)}
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
            value={confirmpassword}
            onChange={(event) => setconfirmpassword(event.target.value)}
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button onClick={Signup} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Sign Up</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? 
          <Link href="/Signin">
            <span className="text-blue-500 hover:underline"> Log In</span>
          </Link>
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

export default SignUpPage;

import React, { useContext } from 'react'
import { GoPerson } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/Contexts/Context';


const Userlogo = () => {

  const router = useRouter()

  const {authuser , setauthuser} = useContext(GlobalContext)
  const {userfirstletter, setuserfirstletter} = useContext(GlobalContext)
 

  return (
    <div onClick={() => router.push("/Accountpage")} className="flex items-center justify-center rounded-full w-10 h-10 bg-green-700">
          {authuser === null ? <GoPerson /> 
          : <p className="text-xl text-white">{userfirstletter}</p> }
    </div>
  )
}

export default Userlogo
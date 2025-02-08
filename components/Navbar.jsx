"use client"

import React, {useState, useContext} from 'react'
import { VscMenu } from "react-icons/vsc";
import { GlobalContext } from '@/Contexts/Context';
import Userlogo from  "@/components/Userlogo"


const Navbar = () => {

    

    const {clicked, setclicked} = useContext(GlobalContext)


    function handleclick() {
        console.log("clicked")
        setclicked(!clicked)
    }

    return (
        <div>
            <div className={`fixed z-30 p-6  w-full flex flex-row justify-between items-center `}>
                <div className='flex gap-6'>
                    <VscMenu onClick={handleclick} className={`text-2xl ${clicked? 'text-white' : null} hover:cursor-pointer`} />
                    <h1 className={`text-xl font-semibold ${clicked? 'text-white' : 'text-gray-500 '}`}>AIprompt</h1>
                </div>
                <div>
                    <Userlogo />
                </div>
            </div>
        </div>
    )
}

export default Navbar
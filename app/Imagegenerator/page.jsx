"use client"

import { GlobalContext } from '@/Contexts/Context'
import React, { useContext, useRef, useEffect } from 'react'
import Ailogo from "@/components/Ailogo"
import Userlogo from "@/components/Userlogo";


const Page = () => {

  const { Imagedata, setImagedata } = useContext(GlobalContext)
  const { lino, setlino } = useContext(GlobalContext)
  const { sendbtn, setsendbtn } = useContext(GlobalContext)
  const { linkindex, setlinkindex } = useContext(GlobalContext)
  const { inputvalue, setinputvalue } = useContext(GlobalContext)
  const { sidebarlistactive, setsidebarlistactive } = useContext(GlobalContext)


  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [Imagedata, sidebarlistactive,]);


  function handleimageinputchange(e) {
    setinputvalue(e.target.value)
    console.log(inputvalue)
  }


  function handleimagesendbtn() {

    if (inputvalue !== "") {
      setsendbtn(true)
    }


    if (sidebarlistactive === -100 & inputvalue !== "") {
      setImagedata(prev => [{
        data: [
          { question: `${inputvalue}`, answer: "new array answer" }
        ]
      }, ...prev])
      setsidebarlistactive(0)



    }
    console.log(sidebarlistactive)
    if (sidebarlistactive !== -100 & inputvalue !== "") {
      setImagedata(prev => {
        const newState = [...prev];
        newState[sidebarlistactive] = {
          ...newState[sidebarlistactive],
          data: [
            ...newState[sidebarlistactive].data,
            { question: `${inputvalue}`, answer: "nestedinputanswe" }
          ]
        };
        return newState;
      }
      );
    }
    setinputvalue("")
  }

  return (
    <div>
      <div className={`px-4 pb-28 pt-20 h-screen w-screen overflow-hidden md:pb-20 lg:p-20`}>
     
  <div className={`fixed w-full z-10 left-0 border py-2 rounded flex flex-col px-4 justify-between md:flex-row md:justify-between md:px-4 md:left-5 md:w-[96%] `}>
          <div className=' flex-grow'><input value={inputvalue} onChange={(e) => handleimageinputchange(e)} placeholder='type something' className='w-full py-3 px-2 rounded-xl focus:outline-none'></input></div>
          <div className='flex justify-center gap-5'>
            <select name="resolution" className='border p-1 rounded hover:cursor-pointer'>
              <option value="">127X345</option>
              <option value="">127X345</option>
              <option value="">127X345</option>
            </select>
            <select name="quantity" className='border p-1 rounded hover:cursor-pointer'>
              <option value="">1 photo</option>
              <option value="">2 photo</option>
              <option value="">3 photo</option>
              <option value="">4 photo</option>
            </select>
            <button onClick={handleimagesendbtn} className={`px-5 py-2 border rounded text-white hover:cursor-pointer ${inputvalue !== "" ? "bg-blue-600 " : "bg-gray-700"}`}>Generate</button>
          </div>
        </div>
        <div className='h-full max-w-[100%]'>
        {
  sendbtn === true && linkindex == 1 && Imagedata.length !== 0 ? (
    <>
     
      <div ref={containerRef}  className='overflow-y-auto overflow-x-hidden h-full mt-28 pb-4 max-w-[100%] md:mt-20'>
        {Imagedata[lino].data.map((item, index) => (
          <div key={index} className="flex flex-col h-fit gap-10 px-2 py-4 w-full">
            <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-6 "><Userlogo /> <div className="w-[98%] break-words md:w-[88%] lg:w-[92%]">{item.question}</div></div>
            <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-6 "><Ailogo /> <div className="w-[98%] break-words md:w-[88%] lg:w-[92%]">{item.answer}</div></div>
          </div>
        ))}
      </div>
    </>
  ) : null
}





        </div>
        
       

       
        
      </div>
    </div>
  )
}

export default Page
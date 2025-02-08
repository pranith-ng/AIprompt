"use client"

import { GlobalContext } from '@/Contexts/Context'
import React, { useContext, useRef, useEffect } from 'react'
import Ailogo from "@/components/Ailogo"
import Userlogo from "@/components/Userlogo";



const Audiogenerator = () => {

  const { Audiodata, setAudiodata } = useContext(GlobalContext)
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
  }, [Audiodata,  sidebarlistactive]);


  function handleAudioinputchange(e) {
    setinputvalue(e.target.value)
    console.log(inputvalue)
  }


  function handleAudiosendbtn() {

    if (inputvalue !== "") {
      setsendbtn(true)
    }


    if (sidebarlistactive === -100 & inputvalue !== "") {
      setAudiodata(prev => [{
        data: [
          { question: `${inputvalue}`, answer: "new array answer" }
        ]
      }, ...prev])
      setsidebarlistactive(0)



    }
    console.log(sidebarlistactive)
    if (sidebarlistactive !== -100 & inputvalue !== "") {
      setAudiodata(prev => {
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
      <div className='px-4 pb-20 pt-20 h-screen w-screen overflow-hidden lg:p-20'>
        <div className=' fixed w-full z-10 left-0 border py-2 rounded flex px-4 justify-between md:justify-between md:px-4 md:left-5 md:w-[96%] lg:w-[97%]'>
          <div className='flex-grow'><input value={inputvalue} onChange={(e) => handleAudioinputchange(e)} placeholder='type something' className='w-full py-3 px-2 rounded-xl focus:outline-none'></input></div>
          
            <button onClick={handleAudiosendbtn} className={`px-5 py-2 border rounded text-white hover:cursor-pointer ${inputvalue !== "" ? "bg-blue-600 " : "bg-gray-700"}`}>Generate</button>
          
        </div>
        <div className='h-full'>
        {
          sendbtn === true & linkindex == 2 & Audiodata.length !== 0 ? (
            <>
          
             <div ref={containerRef} className=' overflow-auto h-full pb-4 mt-20'>
              {Audiodata[lino].data.map((item, index) => (
                <>
                  <div key={index} className="flex flex-col h-fit gap-10 px-2 py-4 w-full">
            <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-6 "><Userlogo /> <div className="w-[98%] break-words md:w-[88%] lg:w-[92%]">{item.question}</div></div>
            <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-6 "><Ailogo /> <div className="w-[98%] break-words md:w-[88%] lg:w-[92%]">{item.answer}</div></div>
          </div>
                  
                </>
              ))}
            </div>
            </>
          )
            : null
        }

        </div>
        
      </div>
    </div>
  )
}

export default Audiogenerator
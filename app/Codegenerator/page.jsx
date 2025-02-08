"use client"

import { GlobalContext } from '@/Contexts/Context'
import React, { useContext, useRef, useEffect } from 'react'
import Userlogo from "@/components/Userlogo";
import Ailogo from "@/components/Ailogo"
import { gemini } from "@/app/utils/gemini"
import { auth } from "@/app/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth"
import { createfirestorepath } from "@/components/Firestore"



const Page = () => {

  const { codedata, setcodedata } = useContext(GlobalContext)
  const { lino, setlino } = useContext(GlobalContext)
  const { sendbtn, setsendbtn } = useContext(GlobalContext)
  const { linkindex, setlinkindex } = useContext(GlobalContext)
  const { inputvalue, setinputvalue } = useContext(GlobalContext)
  const { sidebarlistactive, setsidebarlistactive } = useContext(GlobalContext)
  const { childlistno, setchildlistno } = useContext(GlobalContext)

  const { rotationg, setrotating, } = useContext(GlobalContext)
  const { authuser, setauthuser, } = useContext(GlobalContext)


  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [codedata, sidebarlistactive]);

  function handlecodeinputchange(e) {
    setinputvalue(e.target.value)
    console.log(inputvalue)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setauthuser(currentUser); // Set user state when auth state changes
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  

  async function handlesendclick() {

    setsendbtn(true)
    setrotating(true)
    createfirestorepath(authuser, inputvalue)

    if (sidebarlistactive === -100) {
      setchildlistno(0)
    }
    if (sidebarlistactive !== -100) {
      console.log(codedata[sidebarlistactive].data.length)
      setchildlistno(codedata[sidebarlistactive].data.length)
    }


    if (sidebarlistactive === -100) {
      setcodedata(prev => [{
        data: [
          { question: `${inputvalue}`, answer: '' }
        ]
      }, ...prev])


      async function fetchAnswer() {
        const promptinput = `give me code for ${inputvalue} `
        const apiresult = await gemini(promptinput);
        setcodedata(prev => {
          const updatedData = [...prev];
          updatedData[0].data[0].answer = apiresult;
          setrotating(false)
          return updatedData;
        });
      }

      fetchAnswer()
      setsidebarlistactive(0)


    }


    if (sidebarlistactive !== -100) {

      setcodedata(prev => {
        const newState = [...prev];
        newState[sidebarlistactive] = {
          ...newState[sidebarlistactive],
          data: [
            ...newState[sidebarlistactive].data,
            { question: `${inputvalue}`, answer: "" }
          ]
        };
        return newState;
      });


      async function fetchAnswer() {
        const promptinput = `give me code for ${inputvalue} `
        const apiresult = await gemini(promptinput);
        setcodedata(prev => {
          const newState = [...prev];
          newState[sidebarlistactive].data[newState[sidebarlistactive].data.length - 1].answer = apiresult;
          setrotating(false)
          return newState;
        });
      }

      fetchAnswer();
    }

    setinputvalue("")

  }

  return (
    authuser !== null ? (
      <div>
        <div className='px-4 pb-20 pt-20 h-screen overflow-hidden  lg:p-20'>
          <div className=' fixed w-full z-10 left-0 border py-2 rounded flex px-4 justify-between md:justify-between md:px-4 md:left-5 md:w-[96%] lg:w-[97%]'>
            <div className='flex-grow'><input value={inputvalue} onChange={(e) => handlecodeinputchange(e)} placeholder='type something' className='w-full py-3 px-2 rounded-xl focus:outline-none'></input></div>

            <button onClick={handlesendclick} className={`px-5 py-2 border rounded text-white hover:cursor-pointer ${inputvalue !== "" ? "bg-blue-600 " : "bg-gray-700"}`}>Generate</button>

          </div>
          <div className='h-full'>
            {
              sendbtn === true & linkindex == 4 & codedata.length !== 0 ? (
                <>

                  <div ref={containerRef} className='overflow-auto h-full pb-4 mt-20'>
                    {codedata[lino].data.map((item, index) => (
                      <>
                        <div key={index} className="px-2 py-6 flex flex-col gap-4 ">
                          <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-6 "><Userlogo /> <div className="w-[98%] break-words md:w-[88%] lg:w-[92%]">{item.question}</div></div>
                          <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-6 "><Ailogo indexno={index} /> <div dangerouslySetInnerHTML={{ __html: item.answer }} className="w-[98%] md:w-[88%] lg:w-[92%] leading-9"></div></div>
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
      : (
        <div className="flex flex-col items-center justify-center p-8 w-full h-screen text-center">
          <div className="bg-white shadow-xl rounded-2xl p-6 w-96">
            <p className="font-semibold text-gray-600">
              Please log in to access the app
            </p>
            <button
              onClick={() => router.push("/Accountpage")}
              className="mt-5 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      )
    
    
  )
}

export default Page
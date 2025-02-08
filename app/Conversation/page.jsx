"use client"

import { TbSend2 } from "react-icons/tb";
import { React, useEffect, useContext, useRef, useState } from "react"
import { GlobalContext } from "@/Contexts/Context";
import Userlogo from "@/components/Userlogo";
import Ailogo from "@/components/Ailogo"
import { gemini } from "@/app/utils/gemini"
import { auth } from "@/app/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation";
import {createfirestorepath, firestoredatastorage} from "@/components/Firestore"



export default function Conversation() {


  const { homecontent, sethomecontent } = useContext(GlobalContext)
  const { sendbtn, setsendbtn } = useContext(GlobalContext)
  const { resultdata, setresultdata } = useContext(GlobalContext)
  const { lino, setlino } = useContext(GlobalContext)
  const { sidebarlistactive, setsidebarlistactive } = useContext(GlobalContext)
  const { inputvalue, setinputvalue } = useContext(GlobalContext)
  const { linkindex, setlinkindex } = useContext(GlobalContext)
  const { conversationdata, setconversationdata } = useContext(GlobalContext)
  const { childlistno, setchildlistno } = useContext(GlobalContext)
  const { rotationg, setrotating, } = useContext(GlobalContext)
  const { authuser, setauthuser } = useContext(GlobalContext)

  const [inputheigt, setinputheight] = useState("0")

  const containerRef = useRef(null);
  const inputarearef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [conversationdata, sidebarlistactive]);

  useEffect(() => {
    if (authuser) {
      inputarearef.current.style.height = "auto"
      inputarearef.current.style.height = inputarearef.current.scrollHeight + "px"
      setinputheight(inputarearef.current.scrollHeight)
      console.log(inputheigt)
    }
  }, [inputvalue])

  // useEffect(() => {
  //   const saveduser = sessionStorage.getItem('user');
  //   if (saveduser) {
  //     setauthuser(JSON.parse(saveduser));
  //   }
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setauthuser(currentUser); // Set user state when auth state changes
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);


  function inputonchange(event) {
    setinputvalue(event.target.value)
    console.log(inputvalue)
  }



  async function handlesendclick() {

    sethomecontent(false)
    setsendbtn(true)
    setrotating(true)
    createfirestorepath(authuser, inputvalue)
    // firestoredatastorage()

    if (sidebarlistactive === -100) {
      setchildlistno(0)
    }
    if (sidebarlistactive !== -100) {
      console.log(conversationdata[sidebarlistactive].data.length)
      setchildlistno(conversationdata[sidebarlistactive].data.length)
    }


    if (sidebarlistactive === -100) {
      setconversationdata(prev => [{
        data: [
          { question: `${inputvalue}`, answer: '' }
        ]
      }, ...prev])


      async function fetchAnswer() {
        const promptinput = `dont mention anything about code in response i dont want code except code give me response for ${inputvalue} `
        const apiresult = await gemini(promptinput);
        setconversationdata(prev => {
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

      setconversationdata(prev => {
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
        const promptinput = `dont mention anything about code in response i dont want code except code give me response for ${inputvalue} `
        const apiresult = await gemini(promptinput);
        setconversationdata(prev => {
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
    <div className={`max-w-[1200px] w-full m-auto lg:px-12 `}>
      {authuser !== null ? (

        <div className="h-screen p-4 pt-20 justify-between flex flex-col ">
          {homecontent === true ? (
            <div>
              <p className="text-[2.5rem] leading-tight"><span>Hello, </span> <br></br> How can I help you today?</p>
            </div>
          ) : <div></div>}
          {sendbtn === true && linkindex == 0 && conversationdata.length !== 0 ? (
            <div ref={containerRef} className={`overflow-y-auto overflow-x-hidden h-full max-w-[100%] mb-28 sm:mb-24 `} >
              {conversationdata[lino].data.map((item, index) => (
                <>
                  <div key={index} className="px-2 py-6 flex flex-col gap-4 ">
                    <div className="flex flex-col gap-4 md:items-center md:flex md:flex-row md:gap-6 "><Userlogo /> <div className="w-[98%] text-gray-600 break-words md:w-[88%] lg:w-[92%]">{item.question}</div></div>
                    <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-6 "><Ailogo indexno={index} /> <div dangerouslySetInnerHTML={{ __html: item.answer }} className="w-[98%] md:w-[88%] lg:w-[92%] leading-9"></div></div>
                  </div>
                </>
              ))}

            </div>
          ) : null}
          <div className={`fixed max-w-[1200px] max-h-64 w-full left-1/2 transform -translate-x-1/2 bottom-0 z-10 p-4 flex flex-col gap-3 lg:w-[90%]`}>
            <div className={` bg-gray-500 w-full flex items-center p-3 max-h-64 ${inputheigt > 35 ? "rounded-xl" : "rounded-full"}`}>
              <textarea ref={inputarearef} value={inputvalue} onChange={(event) => inputonchange(event)} className="w-full py-1 border-none pl-4 bg-gray-500 text-white focus:outline-none placeholder-gray-300 resize-none overflow-y-scroll max-h-32" placeholder="Enter a prompt here" rows={1}></textarea>
              <button
                onClick={handlesendclick}
                className={` transform transition-transform duration-500 ${inputvalue !== '' & inputvalue.trim() !== "" ? 'scale-100' : 'scale-0'
                  }`}
              >
                <TbSend2 className="mx-4 text-3xl text-white" />
              </button>
            </div>
            <p className=" text-xs text-center">AIprompt may display inaccurate info, including about people, so double-check its responses.</p>
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
      }
    </div>


  );
}

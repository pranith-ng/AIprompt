"use client"
import { React, useState } from "react"
import { createContext } from "react";


export const GlobalContext = createContext({})

export const GlobalContextProvider = ({ children }) => {

  const [clicked, setclicked] = useState(false)
  
  const [linkchange, setlinkchange] = useState(0)

  const [linkindex, setlinkindex] = useState(-1)

  const [currentActiveIndex, setCurrentActiveIndex] = useState(null);

  const [sidebarlistactive, setsidebarlistactive] = useState(-100)

  const [inputvalue, setinputvalue] = useState("")

  const [lino, setlino] = useState(0)

  const [sendbtn, setsendbtn] = useState(false)

  const [homecontent, sethomecontent] = useState(true)

  const [dropdown, setdropdown] = useState(false)

  const [rotationg, setrotating] = useState(false)

  const [childlistno, setchildlistno] = useState(0)


  const [conversationdata, setconversationdata] = useState([ ])
  const [Imagedata, setImagedata] = useState([ ])
  const [Audiodata, setAudiodata] = useState([ ])
  const [Videodata, setVideodata] = useState([ ])
  const [codedata, setcodedata] = useState([ ])



  return (
    <GlobalContext.Provider value={{ lino, setlino, dropdown, setdropdown, clicked, setclicked, sendbtn, setsendbtn, homecontent, sethomecontent, sidebarlistactive, setsidebarlistactive, inputvalue, setinputvalue, currentActiveIndex, setCurrentActiveIndex, linkindex, setlinkindex, linkchange, setlinkchange, conversationdata, setconversationdata, Imagedata, setImagedata, Audiodata, setAudiodata, Videodata, setVideodata, codedata, setcodedata, rotationg, setrotating, childlistno, setchildlistno,}}>
      {children}
    </GlobalContext.Provider>
  )
}















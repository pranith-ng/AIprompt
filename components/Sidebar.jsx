"use client";

import React, { useEffect, useContext, useRef, useState } from 'react';
import { FiMessageSquare } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaRegFileImage, FaVideo, FaCode, FaPlus } from "react-icons/fa";
import { MdDelete, MdAudiotrack } from "react-icons/md";
import { IoMdText } from "react-icons/io";
import { GlobalContext } from '@/Contexts/Context';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authuser, setauthuser } = useContext(GlobalContext)
  const { setinputvalue } = useContext(GlobalContext);
  const { linkindex, setlinkindex } = useContext(GlobalContext);
  const { dropdown, setdropdown } = useContext(GlobalContext);
  const { lino, setlino } = useContext(GlobalContext);
  const { clicked, setclicked } = useContext(GlobalContext);
  const { sendbtn, setsendbtn } = useContext(GlobalContext);
  const { homecontent, sethomecontent } = useContext(GlobalContext);
  const { sidebarlistactive, setsidebarlistactive } = useContext(GlobalContext);
  const { conversationdata, setconversationdata, Imagedata, setImagedata, Audiodata, setAudiodata, Videodata, setVideodata, codedata, setcodedata } = useContext(GlobalContext);
  const pagearray = [conversationdata, Imagedata, Audiodata, Videodata, codedata];
  const setpagearray = [setconversationdata, setImagedata, setAudiodata, setVideodata, setcodedata];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const links = [
    {
      name: "Conversation",
      link: "/Conversation",
      image: <IoMdText />,
    },
    {
      name: "Image generator",
      link: "/Imagegenerator",
      image: <FaRegFileImage />,
    },
    {
      name: "Audio generator",
      link: "/Audiogenerator",
      image: <MdAudiotrack />,
    },
    {
      name: "Video generator",
      link: "/Videogenerator",
      image: <FaVideo />,
    },
    {
      name: "Code generator",
      link: "/Codegenerator",
      image: <FaCode />,
    },
  ];


  useEffect(() => {
    const saveduser = sessionStorage.getItem('user');
    if (saveduser) {
      setauthuser(JSON.parse(saveduser));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = searchParams.get("number");
      if (search) {
        setlinkindex(search);
        setlino(0);
        setsendbtn(false);
        setinputvalue("");
        setsidebarlistactive(-100);
      }
    }
  }, [searchParams]);

  function handledropdown() {
    setdropdown(!dropdown);
  }

  function handlelinkclick(index) {
    if (linkindex == 0) {
      sethomecontent(true)
    }
    setdropdown(false);
    setclicked(false)
    router.push(`${links[index].link}?number=${index}`);
  }

  function handleliclick(index, event) {
    setlino(index);
    setclicked(false);
    sethomecontent(false);
    setsendbtn(true);
    setsidebarlistactive(index);
  }

  function handlenewbuttonclick() {
    sethomecontent(true);
    setsidebarlistactive(-100);
    setlino(0);
    setclicked(false);
    setsendbtn(false);
  }

  function deletelistitem(index) {
    setlino(0);
    setclicked(true);
    sethomecontent(true);
    setsendbtn(false);
    setsidebarlistactive(-100);
    const updatedarray = pagearray[linkindex].filter((item, indx) => indx !== index);
    setpagearray[linkindex](updatedarray);
  }

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (

    <div className={`transition-transform duration-300 transform absolute z-20 top-0 pt-20 h-screen w-[85%] bg-slate-700 text-white sm:w-[60%] sm:pt-20 md:w-[50%] lg:w-[30%] ${clicked ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='px-5 pb-5 flex flex-col h-full'>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
            <p className='text-xl pb-2'>Model</p>
          </div>
          <span onClick={handledropdown} className='w-fit flex gap-6 items-center border-2 border-gray-500 p-2 text-lg'>
            {linkindex !== -1 ? (
              <>
                {links[linkindex].image}
                {links[linkindex].name}
              </>
            ) : "Select a model"}
            {dropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}

          </span>
          <div className={dropdown === true ? 'flex flex-col transition ease-in duration-500 border-solid border-gray-800 gap-1' : 'relative -z-50 h-0 transition ease-out duration-500 opacity-0'}>
            {links.map((data, index) => (
              <div key={index} className={`flex gap-3 items-center text-lg rounded-2xl p-3 border-2 ${linkindex !== -1 && linkindex == index ? "border-green-500" : "border-gray-500"}`} onClick={() => handlelinkclick(index)}>
                {data.image}
                {data.name}
              </div>
            ))}
          </div>
          <div>
            <div className='flex flex-col'>
              <div onClick={handlenewbuttonclick} className='flex items-center gap-3 p-2 border-2 rounded-lg w-fit border-gray-500'>
                <FaPlus />
                <p>New Chat</p>
              </div>
            </div>
          </div>
        </div>

        {linkindex !== -1 && authuser !== null ? (
          <>
            <p className='text-lg mt-6 mb-1'>Recent</p>
            <div className='h-full flex flex-col gap-2 overflow-auto pr-6 lg:pr-4'>
              <div className='flex flex-col'>
                {pagearray[linkindex].map((data, index) => (
                  <div onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} key={index} className={`w-full flex items-center justify-between gap-3 rounded-full hover:cursor-pointer hover:bg-gray-500 ${sidebarlistactive == index ? "bg-green-500" : null}`}>
                    <div onClick={(event) => handleliclick(index, event)} className='p-3 flex flex-grow gap-3 items-center overflow-hidden'>
                      <FiMessageSquare className='text-xl flex-shrink-0' />
                      <p>{data?.data[0]?.question}</p>
                    </div>
                    {hoveredIndex === index || sidebarlistactive === index ? (
                      <button className='relative right-3 px-2' onClick={() => deletelistitem(index)}>
                        <MdDelete className='text-md ' />
                      </button>
                    ) : (null)}

                  </div>
                ))}
              </div>
            </div>
          </>) : null}


      </div>
    </div>





  );
};

export default Sidebar;



import React, {useState, useContext} from 'react'
import { BsFillStarFill } from "react-icons/bs";
import { GlobalContext } from '@/Contexts/Context';



const Ailogo = (props) => {

 const {rotationg, setrotating} = useContext(GlobalContext)
 const {childlistno, setchildlistno} = useContext(GlobalContext)

 const propsindex = props.indexno 


  return (
    <div className={`text-3xl ${childlistno == propsindex && rotationg  ? "rotate-animation" : ""}`}>
<BsFillStarFill />
    </div>
  )
}

export default Ailogo
import React,{useContext} from 'react'
import { GlobalContext } from '@/Contexts/Context'

const Homelogo = () => {

    const { clicked, setclicked } = useContext(GlobalContext)


  return (
    <h1 className={`hidden ${clicked ? "lg:block lg:absolute text-xl font-medium px-4 py-6" :"hidden" }`}>Genie.AI</h1>
)
}

export default Homelogo
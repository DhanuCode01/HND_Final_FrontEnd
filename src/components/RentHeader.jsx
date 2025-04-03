 import { Link } from "react-router-dom"

export default function RentHeader(){
    return(
        <div className="w-full h-[70px] shadow-2xl flex justify-center items-center relative font-['Roboto'] bg-white mb-5">
                    <img src="/logo.png" alt="logo" className="w-[70px] h-[70px] object-cover absolute left-1 rounded-full border-[1px]"></img>
                    <Link to="rent/rmen" className="text-[25px] font-bold m-1 mx-3">Men</Link>
                    <Link to="rent/rwomen" className="text-[25px] font-bold m-1 mx-3">Women</Link>
                    <Link to="rent/rkids" className="text-[25px] font-bold m-1 mx-3">Kids</Link>
                    

                </div>
    )
} 
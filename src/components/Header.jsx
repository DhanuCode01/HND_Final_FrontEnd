import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { SlUserFollow } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";

export default function Header(){
    return(
        <div className="flex flex-col">
                <div className="w-full h-[50px] shadow-2xl flex justify-center items-center relative bg-gradient-to-bl from-primary to-accent mb-5">
                    <Link to="/" className="text-[25px]  m-1 pr-4 border-r-2 font-['Roboto'] ">Shop</Link>
                    <Link to="/rent" className="text-[25px]  m-1 pr-4 border-r-2 font-['Roboto'] ">Rent</Link>
                    <Link to="/booking"><GiShoppingCart className="text-5xl hover:text-accent  absolute top-1 right-1"/></Link>
                    <Link to="/login"><SlUserFollow className="text-4xl hover:text-accent absolute top-2 right-15"/></Link>
                    <Link to="/about"><CiHeart className="text-5xl hover:text-accent  absolute top-1 right-26"/></Link>   
                </div>
                <div className="w-full h-[70px] shadow-2xl flex justify-center items-center relative font-['Roboto'] bg-white mb-5">
                    <img src="/logo.png" alt="logo" className="w-[70px] h-[70px] object-cover absolute left-1 rounded-full border-[1px]"></img>
                    <Link to="/men" className="text-[25px] font-bold m-1 mx-3">Men</Link>
                    <Link to="/women" className="text-[25px] font-bold m-1 mx-3">Women</Link>
                    <Link to="/kids" className="text-[25px] font-bold m-1 mx-3">Kids</Link>
                    

                </div>
        </div>
    )
}
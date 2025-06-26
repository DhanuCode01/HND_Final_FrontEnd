import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { SlUserFollow } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";

export default function Header() {
  return (
    <header className="w-full shadow-2xl bg-gradient-to-bl from-primary to-accent mb-5">
      <div className="max-w-6xl mx-auto flex items-center justify-center h-[60px] px-4 md:px-8 relative">
        
        {/* Navigation Links */}
        <nav className="flex space-x-6 text-white text-xl md:text-2xl font-semibold font-['Roboto'] ">
          <Link to="/" className="hover:underline underline-offset-4 transition duration-200">
            Shop
          </Link>
          <Link to="/rent" className="hover:underline underline-offset-4 transition duration-200">
            Rent
          </Link>
          <Link 
              to="/picsman" 
              className="hover:underline underline-offset-4 transition duration-200 flex items-center space-x-2 px-3 py-1 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm border-2 border-white absolute right-0 top-2.5 ">
              <GiClothes className="text-2xl text-white group-hover:scale-110 transition-transform duration-200" />
              <span className="text-white text-lg font-medium">AI Clothes</span>
          </Link>

        </nav>

        {/* Action Icons */}
        <div className="fixed bottom-5 right-5 bg-blue-800 backdrop-blur-lg p-3 rounded-xl shadow-lg flex items-center space-x-4 text-white border border-white/30 hover:scale-105 transition-all duration-300">
            <Link to="/about" title="About">
                <CiHeart className="text-3xl md:text-4xl hover:text-red-400 transition duration-200" />
            </Link>
            <Link to="/login" title="Login">
                <SlUserFollow className="text-3xl md:text-4xl hover:text-sky-400 transition duration-200" />
            </Link>
            <Link to="/booking" title="Cart">
                <GiShoppingCart className="text-3xl md:text-4xl hover:text-green-400 transition duration-200" />
            </Link>
        </div>

      </div>
    </header>
  );
}

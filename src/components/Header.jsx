import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { SlUserFollow } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";

export default function Header() {
  return (
    <header className="w-full shadow-2xl bg-gradient-to-bl from-primary to-accent mb-5">
      <div className="max-w-6xl mx-auto flex items-center justify-center h-[60px] px-4 md:px-8 ">
        
        {/* Navigation Links */}
        <nav className="flex space-x-6 text-white text-xl md:text-2xl font-semibold font-['Roboto']">
          <Link to="/" className="hover:underline underline-offset-4 transition duration-200">
            Shop
          </Link>
          <Link to="/rent" className="hover:underline underline-offset-4 transition duration-200">
            Rent
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

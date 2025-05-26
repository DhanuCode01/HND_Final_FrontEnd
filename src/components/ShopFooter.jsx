import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ShopFooter() {
  return (
    <footer className="bg-gradient-to-tr from-primary to-accent text-white mt-10 pt-10 pb-5 shadow-inner z-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm font-['Roboto']">
        
        {/* Logo and About */}
        <div>
          <img src="/logo.png" alt="Logo" className="w-14 h-14 rounded-full mb-2 border border-white bg-white" />
          <p className="text-gray-100">Your one-stop shop for fashion and lifestyle needs.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Categories</h3>
          <ul className="space-y-1">
            <li><Link to="/men" className="hover:underline">Men</Link></li>
            <li><Link to="/women" className="hover:underline">Women</Link></li>
            <li><Link to="/kids" className="hover:underline">Kids</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Contact Us</h3>
          <p className="flex items-center gap-2"><FaPhone /> +94 123 456 789</p>
          <p className="flex items-center gap-2"><FaEnvelope /> support@shop.com</p>
          <div className="flex gap-3 mt-3">
            <a href="/FaceBook" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="/Instergram" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="/Twiter" className="hover:text-blue-300"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-300 text-xs">
        &copy; {new Date().getFullYear()} ShopName. All rights reserved.
      </div>
    </footer>
  );
}

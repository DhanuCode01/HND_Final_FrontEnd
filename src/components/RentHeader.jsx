import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdImageSearch } from "react-icons/md";
import toast from "react-hot-toast";

const categories = {
  men: [
    "Suits", "Tuxedos", "Blazer", "Dress Shirts", "Waistcoats", "Ties", "Formal Trousers", "Formal Shoes", "Cufflinks"
  ],
  women: [
    "Blazer", "Saree", "Frock", "Lehenga", "Salwar Suit", "Kurti", "Gown", "Evening Dress", "Bridal Dress", "Anarkali", "Skirt", "Top", "Formal Trouser", "Jacket", "Dupatta"
  ],
  kids: [
    "Blazer", "Frock", "Suit", "Tuxedo", "Lehenga", "Kurta Pajama", "Gown", "Skirt", "Top", "Jacket", "Sherwani", "Casual Shirt", "T-Shirt", "Shorts", "Jeans"
  ]
};

export default function RentHeader(){
  const [hovered, setHovered] = useState(null);
  const [link,setLink]=useState(null);
  const navigator =useNavigate();


  function handleOnClick(){
                        
                         if(link===null){
                          toast.error("Pleace Enter Your Link...❗‼️")
                          return;
                        }
                        navigator("/rent/search",{state:link});
                        setLink(null);
                          }



  return (
    <header className="w-full h-[70px] shadow-md bg-gradient-to-bl from-primary to-accent mb-5 z-50 relative">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center relative px-4 font-['Roboto']">
        
        {/* Logo */}
        <Link to="/" className="absolute left-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[55px] h-[55px] object-cover rounded-full border border-gray-300 bg-white   shadow-blue-300"
          />
        </Link>

        {/* Nav Links */}
        <nav className="flex space-x-10 text-lg md:text-xl font-semibold text-gray-400 relative">
          {["men", "women", "kids"].map((cat) => (
                  <div
                    key={cat}
                    className="relative group"
                    onMouseEnter={() => setHovered(cat)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span
                      className="hover:text-white cursor-pointer transition duration-200 capitalize"
                    >
                      {cat}
                    </span>

                    {/* Dropdown */}
                    {hovered === cat && (
                      <div className="absolute top-full left-0 w-140 max-h-80 overflow-y-auto bg-black shadow-2xl border border-gray-200 rounded-xl p-3 z-50 transition-all duration-200 hover:scale-110 flex flex-row item-center justify-center ">
                            {/* Category Image */}
                          
                          <img
                            src={`/rent${cat}.jpg`}
                            alt={cat}
                            className="w-40 h-80 object-cover rounded-md shadow-md hidden md:block m-2 mr-5 "
                          />
                        <div className="grid grid-cols-2 gap-2">
                          {categories[cat].map((item) => (
                            <Link
                              key={item}
                              to={`/rent/${cat}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block text-sm text-white  px-3 py-2 rounded-md hover:bg-primary transition-all w-40"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

          </nav>
                  {/* <div className="absolute right-4 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-shadow">
                      <FaSearchengin className="text-gray-600 text-xl" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="outline-none text-sm w-40 md:w-64 bg-transparent placeholder-gray-500"
                      />
                    </div> */}
                    <div className="absolute right-4 flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Paste image link..."
                          value={link || ""}
                          onChange={(e) => setLink(e.target.value)}
                          className="px-4 py-2 w-40 md:w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder-gray-400 text-gray-400 transition"
                        />
                        <button
                          onClick={handleOnClick}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-primary text-gray-700 hover:text-white shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <MdImageSearch className="text-xl" />
                        </button>
                      </div>




      </div>
    </header>
  );
} 
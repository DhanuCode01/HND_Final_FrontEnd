import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearchengin } from "react-icons/fa";

const categories = {
  men: [
    "T Shirts", "Casual Shirts", "Formal Shirts", "Jackets", "Jeans",
    "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers",
    "Formal Shoes", "Sandals & Floaters", "Flip Flops", "Socks", "Belts",
    "Caps & Hats", "Sunglasses & Frames", "Bags & Backpacks",
  ],
  women: [
    "Dresses", "Tops", "T Shirt", "Jumpsuits", "Jeans", "Leggings",
    "Trousers", "Shorts", "Skirts & Plazzos", "Full Kits", "Jackets & Coats",
    "Shoes", "Flats", "Sandals", "Heels", "Flips Flops", "Bra", "Wallets",
    "Belts", "Fashion Jewellery", "Sunglasses & Frames", "Hand Bags & Backpacks",
  ],
  kids: [
    "T Shirts", "Shirts", "Jeans", "Trousers", "Shorts", "Jackets",
    "Frocks", "Skirts", "Shoes", "Sandals", "Socks", "Caps", "Backpacks"
  ]
};

export default function ShopHeader() {
  const [hovered, setHovered] = useState(null);

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
                      <div className="absolute top-full left-0 w-72 max-h-80 overflow-y-auto bg-white shadow-2xl border border-gray-200 rounded-xl p-3 z-50 transition-all duration-200 hover:scale-110">
                        <div className="grid grid-cols-2 gap-2">
                          {categories[cat].map((item) => (
                            <Link
                              key={item}
                              to={`/${cat}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block text-sm text-gray-800 px-3 py-2 rounded-md hover:bg-gray-100 transition-all"
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
                  <div className="absolute right-4 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-shadow">
                      <FaSearchengin className="text-gray-600 text-xl" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="outline-none text-sm w-40 md:w-64 bg-transparent placeholder-gray-500"
                      />
                </div>

      </div>
    </header>
  );
}

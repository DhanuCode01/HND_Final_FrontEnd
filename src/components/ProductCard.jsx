import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="w-[350px] md:w-[400px] h-auto bg-accent rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-green-950  transition-shadow duration-300 font-['Roboto'] m-3">
            <img
              className="w-full h-[400px] object-cover"
              src={item.Image[0] || "https://via.placeholder.com/150"}
              alt={item.name}
            />
    <div className="p-5  bg-gradient-to-bl from-primary to-accent">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.discription}</p>

            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-blue-600">${item.price}</span>
              <span className="text-xs text-gray-500">Category: {item.category}</span>
            </div>

            <div className="text-xs text-gray-500 mb-1">Dimensions: {item.dimension}</div>

            <p
              className={`text-sm font-medium ${
                item.availability ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.availability ? "✔ In Stock" : "✖ Out of Stock"}
            </p>

            <div className="mt-4">
              <Link
                to={`/product/${item.key}`}
                className="inline-block w-full text-center bg-accent hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-300 border-2 border-black"
              >
                View Details
              </Link>
            </div>
    </div>
  </div>
  );
}
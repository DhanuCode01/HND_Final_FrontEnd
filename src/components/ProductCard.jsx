import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="w-[400px] h-[450px] bg-white rounded-lg shadow-md overflow-hidden border-6 border-gray-200 ">
      <img
        className="w-full h-48 object-cover"
        src={item.Image[0] || "https://via.placeholder.com/150"}
        alt={item.name}
      />
      <div className="p-4 h-full bg-primary">
        <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
        <p className="text-sm text-gray-600">{item.discription}</p>
        <p className="text-md font-semibold text-gray-700 mt-2">${item.price}</p>
        <p className="text-xs text-gray-500">Category: {item.category}</p>
        <p className="text-xs text-gray-500">Dimensions: {item.dimension}</p>
        <p className={`text-sm font-bold mt-2 ${item.availability ? "text-green-600" : "text-red-600"}`}>
          {item.availability ? "In Stock" : "Out of Stock"}
        </p>
        <div className="mt-4 flex justify-between ">
          <Link to={"/product/"+item.key}className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">{/*  When you click View Details, the item key is added to the end of /product/ and linked. */}
            View Details
          </Link>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
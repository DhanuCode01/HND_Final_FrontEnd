import { Link } from "react-router-dom";
import { FaMedium } from "react-icons/fa";
import { TbSquareLetterSFilled } from "react-icons/tb";

export default function RentCard({ item }) {
  return (
    <div className="w-[200px] md:w-[250px]  max-h-[530px] bg-accent rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-green-400  transition-shadow duration-300 font-['Roboto'] m-3">
            <img
              className="w-full h-[250px] object-cover"
              src={item.Image[0] || "https://via.placeholder.com/150"}
              alt={item.name}
            />
    <div className="p-5  bg-gradient-to-bl from-primary to-accent">
            <h2 className="text-xl font-semibold text-gray-400 mb-1">{item.name}</h2>

            <div className="text-xs text-gray-500 mb-1">Dimensions: {item.dimension}</div>

            <p
              className={`text-sm font-medium ${
                item.availability ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.availability ? "✔ In Stock" : "✖ Out of Stock"}
            </p>


            <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-blue-600">RS: {item.price}</span>
                  <span className="text-xs text-gray-500">Category: {item.category}</span>
            </div>


            <div className="text-xs text-white mt-1 space-y-1">
                  <div className="flex items-center justify-between bg-black/10  rounded-lg">
                    <span>Pay in 3 x Rs 563.33 with</span>

                    <a
                        href="https://paykoko.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center   text-white rounded-xl shadow-lg hover:shadow-green-400/50 transition duration-300 group cursor-pointer"
                    >
                                <img
                                src="/koko.png"
                                alt="Koko Pay"
                                className="w-[60px] h-[30px] object-contain"
                                />
                    </a>
                    
                  </div>

                  <div className="flex items-center justify-between bg-black/10  rounded-lg">
                  <span>3 x Rs 563.33 or 3% Cashback with</span>

                    <a
                        href="https://mintpay.lk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-white rounded-xl shadow-lg hover:shadow-green-400/50 transition duration-300 group cursor-pointer"
                    >
                            <img
                                  src="/mintpay.webp"
                                  alt="mintPay"
                                  className="w-[60px] h-[30px] object-contain "
                                  />
                    </a>                    
                  </div>
            </div>



            <div className="mt-4">
              <Link
                to={`/rent/rent/${item.key}`}
                className="inline-block w-full text-center bg-accent hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-300 border-2 border-black"
              >
                View Details
              </Link>
            </div>
    </div>
  </div>
  );
}
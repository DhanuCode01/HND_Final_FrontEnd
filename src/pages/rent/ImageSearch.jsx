import { useLocation, useNavigate } from "react-router-dom";
import MoveImage from "../../components/Moveimage";
import RentCard from "../../components/RentCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ImageSearch() {
        const token = localStorage.getItem("token");
        const location = useLocation();
        const navigate = useNavigate();
        const link = location.state;

        const [loadingBuffer, setLoadingBuffer] = useState("loading");
        const [loadingItem, setLoadingItem] = useState("loading");

        const [bufferData, setBufferData] = useState(null);
        const [items, setItems] = useState([]);
        const [searchItem, setSearchItem] = useState(null);

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rent/buffer`,
        { URL: link },
        /* { headers: { Authorization: `Bearer ${token}` } } */
      )
      .then((res) => {
        setBufferData(res.data.preview);
        setLoadingBuffer("loaded");
      })
      .catch((err) => {
        setLoadingBuffer("error");
      });
  }, []);

  useEffect(() => {
                    axios
                    .get(`${import.meta.env.VITE_BACKEND_URL}/api/rent`, /* {
                        headers: { Authorization: `Bearer ${token}` },
                    } */)
                    .then((res) => {
                        setItems(res.data);
                        setLoadingItem("loaded");
                    })
                    .catch((err) => {
                        setLoadingItem("error");
                    });
                 }, []);

  useEffect(() => {
                        if (loadingItem === "loaded" && loadingBuffer === "loaded") {
                        const foundItem = items.find(
                            (item) => item.Image && item.Image[0] === bufferData
                        );
                        if (foundItem) {
                            setSearchItem(foundItem);
                            console.log("Matched Item:", foundItem);
                        } else {
                            toast.error("No matching item found.");
                        }
                        } else if (loadingItem === "error" || loadingBuffer === "error") {
                        toast.error("Please Try Again...‼️");
                        }
                    }, [loadingItem, loadingBuffer, items, bufferData]);

  return (
    <>
      {(loadingBuffer === "loading" || loadingItem === "loading") && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
        </div>
      )}

      {loadingBuffer === "loaded" && loadingItem === "loaded" && (
        <div className="w-screen min-h-screen bg-black flex flex-col items-center p-4">
          {/* Image Slider */}
          <div className="w-screen mb-8 border-8 border-white">
            <MoveImage />
          </div>

          {/* Product Card */}
          {searchItem && (
            <div className="w-full max-w-7xl px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <RentCard key={searchItem.key} item={searchItem} />
              </div>
            </div>
          )}
        </div>
      )}

      {(loadingBuffer === "error" || loadingItem === "error") && (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-red-50 text-red-600 p-4">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4 text-center max-w-md">
            We couldn’t load the products. Please check your internet connection or try again later.
          </p>
          <button
            onClick={() => navigate("/rent")}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}
    </>
  );
}

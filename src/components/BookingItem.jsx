import axios from "axios";
import { useEffect, useState } from "react";
import { removeFormCart } from "../utils/Cart";
import { Trash2 } from "lucide-react";

export default function BookingItem({ itemkey, qty, refresh }) {
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        if (status === "loading") {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${itemkey}`)
                .then((res) => {
                    setItem(res.data);
                    setStatus("success");
                })
                .catch((err) => {
                    console.error("Failed to fetch product:", err);
                    setStatus("error");
                    removeFormCart(itemkey);
                    refresh();
                });
        }
    }, [status, itemkey, refresh]);

                if (status === "loading") {
                    return <div className="text-center text-gray-500">Loading...</div>;
                }

                if (status === "error") {
                    return null;
                }

    return (
        <div className="flex items-center justify-between w-full px-4 py-4 border-b bg-gradient-to-bl from-accent to-primary shadow-sm rounded-md">
            <div className="flex items-center gap-4">
                <img src={item.Image?.[0]} alt={item.name} className="w-[80px] h-[80px] object-cover rounded-lg" />
                <div>
                    <h2 className="text-lg font-semibold text-gray-400">{item.name}</h2>
                    <p className="text-sm text-gray-500">Qty: {qty}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-green-600 font-bold">Rs. {item.price * qty}</p>
                <button
                    onClick={() => {
                        removeFormCart(itemkey);
                        refresh();
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Remove"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

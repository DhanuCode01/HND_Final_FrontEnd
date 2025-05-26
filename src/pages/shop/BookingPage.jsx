import { useEffect, useState } from "react";
import { loadCart } from "../../utils/Cart";
import BookingItem from "../../components/BookingItem";
import axios from "axios";
import { FaCartArrowDown } from "react-icons/fa";

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());
    const [total, setTotal] = useState(0);

    async function reloadCart() {
        const updatedCart = loadCart();
        setCart(updatedCart);

        let totalAmount = 0;

        // fetch product data for each item to get accurate price
        for (const item of updatedCart.orderedItems) {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${item.key}`);
                const price = res.data.price;
                totalAmount += price * item.qty;
            } catch (err) {
                console.error("Error fetching product for total:", err);
            }
        }

        setTotal(totalAmount);
        console.log("Cart Reloaded");
    }

    useEffect(() => {
        reloadCart(); // initial load
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-bl from-primary to-accent py-8 px-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-white mb-6"><FaCartArrowDown />Cart</h1>
            <div className="w-full max-w-4xl bg-white rounded-xl shadow p-4 flex flex-col gap-4">
                {cart.orderedItems.length === 0 ? (
                    <p className="text-center text-gray-500">No items in cart</p>
                ) : (
                    cart.orderedItems.map((item) => (
                        <BookingItem
                            key={item.key}
                            itemkey={item.key}
                            qty={item.qty}
                            refresh={reloadCart}
                        />
                    ))
                )}
            </div>
            {cart.orderedItems.length > 0 && (
                <div className="w-full max-w-4xl mt-6 flex justify-end">
                    <div className="text-right">
                        <p className="text-lg font-semibold text-gray-700">Total Amount:</p>
                        <p className="text-2xl font-bold text-green-600">Rs. {total}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

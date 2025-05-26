import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import axios from "axios";
import MoveImage from "../../components/Moveimage";
import { useNavigate, useParams } from "react-router-dom";


export default function Kids() {

    const params =useParams(); //Read and Assign The parameter  //passed
    const key=params.key;
  
    const navigator=useNavigate();
    const [items,setItems]=useState([]);
    const [loading,setLoading]=useState("Loading");//Loading,Loaded or Error
   


        useEffect(()=>{
        
            
            const token = localStorage.getItem("token");  /*get token*/

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/kids/${key}`,{ headers: { Authorization: `Bearer ${token}` } })
            .then((res)=>{

                console.log(res.data)
                setItems(res.data)
                setLoading("Loaded")
               
            }).catch((err)=>{
                toast.error(err?.response?.data?.error || "An Error Occured❗")
                setLoading("Error")
             
            })


    },[key])

   return (
               <>
                    {loading === "Loading" && (
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
                        </div>
                    )}

                    {loading === "Loaded" && (
                        <div className="w-screen min-h-screen bg-black flex flex-col items-center p-4">
                            {/* Image Slider */}
                            <div className="w-screen mb-8 border-8 border-white">
                                <MoveImage />
                            </div>

                            {/* Product Cards in Grid */}
                            <div className="w-full max-w-7xl px-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {items.map((item) => (
                                        <ProductCard key={item.key} item={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {loading === "Error" && (
                        <div className="w-full h-screen flex flex-col justify-center items-center bg-red-50 text-red-600 p-4">
                            <div className="text-6xl mb-4">❌</div>
                            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                            <p className="mb-4 text-center max-w-md">
                                We couldn’t load the products. Please check your internet connection or try again later.
                            </p>
                            <button
                                onClick={() =>navigator("/")}
                                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                Retry
                            </button>
                        </div>
                    )}

        </>
            );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider";
import { addToCart, loadCart } from "../../utils/Cart";
import { MdAddShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";


export default function RentProductOverview(){
    const params =useParams(); //Read and Assign The parameter  //passed
    const key=params.key;
    

    const[loadingStatus,setloadingStatus]=useState("loading");
    const[product,setProduct]=useState({});

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/rent/${key}`)       //link      //.env useing backtick direct way
        .then((res)=>{
            setProduct(res.data);
            setloadingStatus("loaded")
        }).catch((err)=>{
            console.log(err);
            setloadingStatus("error");
        })
    },[key])

        return (
                <div className="w-full min-h-screen bg-primary flex items-center justify-center px-4 py-8">
                    {loadingStatus === "loading" && (
                        <div className="flex justify-center items-center h-full w-full">
                            <div className="w-[70px] h-[70px] border-4 border-b-accent border-primary rounded-full animate-spin"></div>
                        </div>
                    )}

                    {loadingStatus === "loaded" && (
                        <div className="w-full max-w-6xl bg-gradient-to-bl from-primary to-accent rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2 w-full">
                                <ImageSlider images={product.Image} />
                            </div>
                            <div className="md:w-1/2 w-full flex flex-col justify-center gap-4">
                                <h1 className="text-2xl font-bold text-white">{product.name}</h1>
                                <p className="text-sm text-gray-400">SKU: {product.key}</p>
                                <h2 className="text-lg font-semibold text-gray-600">Category: {product.category}</h2>
                                <p className="text-md text-gray-600">Dimension: {product.dimension}</p>
                                <p className="text-sm text-gray-700 max-h-[100px] overflow-y-auto">{product.discription}</p>
                                <h2 className="text-2xl font-bold text-green-500">Rs. {product.price}</h2>
                               <button 
                                    className="mt-4 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold text-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                                    onClick={() => { 
                                        addToCart(product.key, 1); 
                                        console.log(loadCart());
                                        toast.success("Success 👍") 
                                    }}
                                >
                                    <MdAddShoppingCart/>
                                    Add to Cart
                                </button>

                                
                            </div>
                        </div>
                    )}

                    {loadingStatus === "error" && (
                        <div className="flex justify-center items-center w-full h-full">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-red-600">Error loading product</h2>
                                <p className="text-gray-600">Something went wrong. Please try again later.</p>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

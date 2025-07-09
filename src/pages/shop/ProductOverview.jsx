import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider";
import { addToCart, loadCart } from "../../utils/Cart";
import { MdAddShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";
import Dimension from "../../components/Dimension";


export default function ProductOverview(){
    const params =useParams(); //Read and Assign The parameter  //passed
    const key=params.key;
    

    const[loadingStatus,setloadingStatus]=useState("loading");
    const[product,setProduct]=useState({});

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${key}`)       //link      //.env useing backtick direct way
        .then((res)=>{
            console.log(res.data);
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
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-inner space-y-4">
                                    <h1 className="text-3xl font-extrabold text-white">{product.name}</h1>

                                    <div className="text-sm text-gray-300 flex flex-wrap gap-4">
                                        <span className="bg-black/20 px-3 py-1 rounded-full">SKU: <span className="font-medium text-white">{product.key}</span></span>
                                        <span className="bg-black/20 px-3 py-1 rounded-full">Category: <span className="font-medium text-white">{product.category}</span></span>
                                        <div className="space-y-2">
                                            <h3 className="text-md text-gray-300">Select Dimension:</h3>
                                            <Dimension dimension={product.dimension} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-md text-gray-300 mb-1">Description:</h3>
                                        <p className="text-sm text-gray-100 bg-white/5 p-3 rounded-md max-h-[120px] overflow-y-auto whitespace-pre-wrap">
                                        {product.description}
                                        </p>
                                    </div>

                                    <h2 className="text-3xl font-bold text-green-400">Rs. {product.price}</h2>
                                </div>

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

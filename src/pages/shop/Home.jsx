import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";


export default function Home(){
    const [State,setState]=useState("loading");//loading,success,error
    const [items,setItems]=useState([]);

    useState(()=>{
        if(State=="loading"){

            const token = localStorage.getItem("token");  /*get token*/

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product`,{ headers: { Authorization: `Bearer ${token}` } })
            .then((res)=>{

                console.log(res.data)

                setItems(res.data)
                setState("success")
            }).catch((err)=>{
                toast.error(err?.response?.data?.error || "An Error Occured❗")
                setState("error")
            })

        }
    },[])
    return(
        <div className="h-screen w-full flex flex-wrap justify-center pt-[50px]">
                {State== "loading" && 
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
                        </div>
                }
                {State=="success" &&
                    items.map((item)=>{
                        return(
                            <ProductCard key={item.key} item={item}/>
                        )
                    })}
        </div>
    )
}
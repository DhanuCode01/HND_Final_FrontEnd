import axios from "axios";
import { useEffect, useState } from "react";

export default function Test(){
    const[data,setData]=useState();
    const token=localStorage.getItem("token")

    useEffect(()=>{
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product`,{URL:"https://qnfhtxmqoappxksasavt.supabase.co/storage/v1/object/public/finalimage/1748236031792kid-5711995.jpg"}, { headers: { Authorization: `Bearer ${token}` } })         //.env useing normal way
        .then((res) => {
          console.log(res);
          setData(res.data.preview)
          
        })
        .catch((err) => {
          console.log(err);
        });

    },[]);
    return(
        <div>
            <img src={data} alt="image"></img>
        </div>
    );
}
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TestTwo() {
  const [data, setData] = useState([]);
  const [productLink,setProductLink]=useState();
  const [Link,setLink]=useState();
  const token = localStorage.getItem("token");


  async function handleAddItem() {

                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/rent/buffer`,{URL:productLink}, { headers: { Authorization: `Bearer ${token}` } })         //.env useing normal way
                    .then((res) => {
                      setLink(res.data.preview)
                      
                    })
                    .catch((err) => {
                      console.log(err);
                    });



                await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/rent`, {headers: { Authorization: `Bearer ${token}` },})
                    .then((res) => {
                        console.log(res.data)
                        setData(res.data);
                    })
                    .catch((err) => {
                          console.log(err);
                    });


                  for(let i=0; i<data.length; i++){ 
                    if(data[i].Image[0] == Link){
                      console.log("success")
                      return;
                    }
                  }
                  console.log("error")

  }



  return (
    <div>
     
     <textarea className="border p-2 rounded w-full" onChange={(e) => setProductLink(e.target.value)} value={productLink} placeholder="Enter product link "/>
     <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleAddItem}>Add</button>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsHouseAdd } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./AdminitemPage.css"

/*  const SampleArray = [
  {
    key: "P001",
    name: "Cricket Bat",
    price: "7500",
    category: "Sports Equipment",
    dimension: "85cm x 10cm x 5cm",
    description: "High-quality English willow cricket bat.",
    availability: true,
    Image: ["https://example.com/bat1.jpg"]
  },
  {
    key: "P002",
    name: "Cricket Ball",
    price: "1200",
    category: "Sports Equipment",
    dimension: "7cm diameter",
    description: "Leather ball suitable for professional matches.",
    availability: true,
    Image: ["https://example.com/ball1.jpg"]
  },
]; */
 
export default function AdminItemPage() {
  const [items, setItems] = useState([]);      // const [items, setItems] = useState(SampleArray);    //When using a sample array
  const[itemLoaded,setitemLoaded]=useState(false);
  const navigate =useNavigate();                  //navigate to you wont location 
  

  const backendurl=import.meta.env.VITE_BACKEND_URL                // import env

  useEffect(() => {
    if(!itemLoaded){
      const token = localStorage.getItem("token");
      axios.get(backendurl+"/api/product", { headers: { Authorization: `Bearer ${token}` } })         //.env useing normal way
        .then((res) => {
          setItems(res.data);
          setitemLoaded(true)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  }, [itemLoaded]);//first time and "itemLoaded" changed time update it

  function handleDelete(key){     /* delete function */
      setItems(items.filter((item)=>item.key !==key));
      const token=localStorage.getItem("token");        //Stored token loaded
      axios.delete(`${backendurl}/api/product/${key}`,{headers:{Authorization:`Bearer ${token}`},       //.env using backtick
      }).then((res)=>{
        console.log(res);
        toast.success(res.data.message);
        setitemLoaded(false);

      }).catch((err)=>{
        //console.log(res)
        toast.error("ERROR")
      })

  }

  return (
    <div className="h-full w-full bg-picture p-6  justify-center flex">
      {!itemLoaded && <div className="border-4 my-4 border-b-green-600 rounded-full animate-spin bg-0 w-[100px] h-[100px]"></div> }{/* If items are not loaded  */}
      {itemLoaded && <div className="max-w-5xl mx-auto backdrop-blur-2xl shadow-md rounded-lg p-4 font-['Roboto']">  {/*  If items are loaded */}
        <h1 className="text-2xl font-bold text-center mb-4 ">Admin Items</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-accent text-white">
              <th className="p-2 border">Key</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">CustomerType</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Dimension</th>
              <th className="p-2 border">Availability</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.key} className="odd:bg-gray-100 even:bg-gray-200">
                <td className="p-2 border text-center">{product.key}</td>
                <td className="p-2 border text-center">{product.name}</td>
                <td className="p-2 border text-center">{product.quantity}</td>
                <td className="p-2 border text-center">{product.customerType}</td>
                <td className="p-2 border text-center">{product.price}</td>
                <td className="p-2 border text-center">{product.category}</td>
                <td className="p-2 border text-center">{product.dimension}</td>
                <td className="p-2 border text-center">{product.availability ? "Yes" : "No"}</td>
                
                <td className="p-2 border text-center flex justify-center gap-2">
                  <button  onClick={()=>{navigate("/admin/items/edit",{state:product})}}className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">Edit</button>
                  <button  onClick={()=>handleDelete(product.key)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
      <Link to="/admin/items/add" className="fixed bottom-7 right-7">
        <BsHouseAdd  className="text-black text-6xl hover:text-red-600 hover:size-20 cursor-pointer" />
      </Link>
    </div>
  );
}

/* import axios from "axios";
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
} */


import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const categories = {
  men: [
    { label: "Suits", value: "suits" },
    { label: "Tuxedos", value: "tuxedos" },
    { label: "Blazer", value: "blazer" },
    { label: "Dress Shirts", value: "dress shirts" },
    { label: "Waistcoats", value: "waistcoats" },
    { label: "Ties", value: "ties" },
    { label: "Formal Trousers", value: "formal trousers" },
    { label: "Formal Shoes", value: "formal shoes" },
    { label: "Cufflinks", value: "cufflinks" }
  ],
  women: [
    { label: "Blazer", value: "blazer" },
    { label: "Saree", value: "saree" },
    { label: "Frock", value: "frock" },
    { label: "Lehenga", value: "lehenga" },
    { label: "Salwar Suit", value: "salwar suit" },
    { label: "Kurti", value: "kurti" },
    { label: "Gown", value: "gown" },
    { label: "Evening Dress", value: "evening dress" },
    { label: "Bridal Dress", value: "bridal dress" },
    { label: "Anarkali", value: "anarkali" },
    { label: "Skirt", value: "skirt" },
    { label: "Top", value: "top" },
    { label: "Formal Trouser", value: "formal trouser" },
    { label: "Jacket", value: "jacket" },
    { label: "Dupatta", value: "dupatta" }
  ],
  kids: [
    { label: "Blazer", value: "blazer" },
    { label: "Frock", value: "frock" },
    { label: "Suit", value: "suit" },
    { label: "Tuxedo", value: "tuxedo" },
    { label: "Lehenga", value: "lehenga" },
    { label: "Kurta Pajama", value: "kurta pajama" },
    { label: "Gown", value: "gown" },
    { label: "Skirt", value: "skirt" },
    { label: "Top", value: "top" },
    { label: "Jacket", value: "jacket" },
    { label: "Sherwani", value: "sherwani" },
    { label: "Casual Shirt", value: "casual shirt" },
    { label: "T-Shirt", value: "t-shirt" },
    { label: "Shorts", value: "shorts" },
    { label: "Jeans", value: "jeans" }
  ]
};

export default  function Test() {

          const [productKey, setProductKey]=useState("");             /* create input data usestate */
          const [productName, setProductName]=useState("");
          const [productQuantity,setProductQuantity]=useState(0);
          const [productCustomerType,setProductCustomerType]=useState("");
          const [productPrice, setProductPrice]=useState(0);
          const [productCategory, setProductCategory]=useState("blazer");
          const [productDimentions, setProductDimentions]=useState("Free");
          const [productDiscription, setProductDiscription]=useState("");
          const [productAvailability,setProductAvailability]=useState(true);
          const [ProductLink,setProductLink]=useState([])//images Link usestate Array

          const navigate =useNavigate();                  //navigate to you wont location eg:="/admin/item"


          const backendurl=import.meta.env.VITE_BACKEND_URL                // import env



                async function handleAddItem(){            /*  add button onclick function */
                               const promises=[]       //create promises array(used to handle multiple promises)

                               const token=localStorage.getItem("token");  /*get token*/
                               

                              for(let i=0; i<ProductLink.length; i++){    //read to product image one by one
                                                                        //print console log (image one by one)
                                
                                    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/rent/buffer`,{URL:ProductLink[i]}, { headers: { Authorization: `Bearer ${token}` } })         //.env useing normal way
                                    .then((res) => {
                                    
                                    const promise=res.data.preview;
                                    promises.push(promise)                      //push promise to promises array
                                    console.log(promises)
                                    
                                    
                                    })
                                    .catch((err) => {
                                    console.log(err);
                                    });


                                 if(i==5){
                                  toast.error("You Can Only Upload 5  Images at a Time")
                                  break;
                                } 
                              }
                              

                              
                              
                              

                                         if(token){                                  // Method check autherization

                                              try{

                                                
                                                const imageURL=await Promise.all(promises) //{way of execute promises array}      //useing async await
                                                console.log(imageURL)

                                                      const result = await axios.post(`${backendurl}/api/rent`,{        //link     //.env useing backtick
                                                            
                                                              key:productKey,                         
                                                              name:productName,
                                                              quantity:productQuantity,
                                                              customerType:productCustomerType,
                                                              price:productPrice, 
                                                              category:productCategory,
                                                              dimension:productDimentions,
                                                              description:productDiscription,
                                                              availability:productAvailability,
                                                              Image:imageURL,
                                                      },{
                                                              headers:{
                                                                Authorization:"Bearer " +token            //pass the bsck end token with data
                                                              }
                                                      })
                                                      toast.success(result.data.Message || "Success");

                                                      navigate ("/admin/items")                         //After success, navigate to the admin/items page.


                                                      
                                                }catch(err){
                                                  toast.error(err.response.data.error);
                                                }

                                        }else{
                                                   toast.error("please login first");    
                                        } 

                                      

                        } 


  return (
    <div className="w-full h-full flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Add Rent Item</h1>
            <div className="w-full max-w-md border border-gray-300 p-6 rounded-lg shadow-lg flex flex-col gap-4 bg-white">
                <input className="border p-2 rounded" onChange={(e) => setProductKey(e.target.value)} values={productKey} type="text" placeholder="Product Key" />
                <input className="border p-2 rounded" onChange={(e) => setProductName(e.target.value)} values={productName} type="text" placeholder="Product Name" />
                <input className="border p-2 rounded" onChange={(e) => setProductQuantity(e.target.value)} values={productQuantity} type="number" placeholder="Product Quantity" />
                <input className="border p-2 rounded" onChange={(e) => setProductPrice(e.target.value)} values={productPrice} type="number" placeholder="Product Price" />
                <select className="border p-2 rounded" value={productCustomerType} onChange={(e) => setProductCustomerType(e.target.value)}>
                    <option value="">Select Customer Type</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
                {productCustomerType ? (
                  <select
                    className="border p-2 rounded"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    {categories[productCustomerType.toLowerCase()].map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-red-500 text-sm">First select customer type</p>
                )}

                <select className="border p-2 rounded" value={productDimentions} onChange={(e) => setProductDimentions(e.target.value)}>
                    
                    <option value="Free">Free</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                   
                </select>
                <textarea className="border p-2 rounded" onChange={(e) => setProductDiscription(e.target.value)} values={productDiscription} placeholder="Product Description"></textarea>
                <textarea className="border p-2 rounded w-full" onChange={(e) => setProductLink(e.target.value
                                                                                                .split('\n') // split string by new lines → array
                                                                                                .map(link => link.trim()) // remove spaces
                                                                                                .filter(Boolean) // remove empty lines
                                                                                                )
                                                                        }
                                                                                                                    value={ProductLink.join('\n')} /* convert array → string */ placeholder="Enter one product link per line"/>

                <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleAddItem}>Add</button>
                <button className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={() => navigate("/admin/items")}>Cancel</button>
            </div>
            
        </div>
  )
}


import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MediaUpload from "../../utils/MediaUpload.jsx";


export default  function AddItemPage() {

          const [productKey, setProductKey]=useState("");             /* create input data usestate */
          const [productName, setProductName]=useState("");
          const [productQuantity,setProductQuantity]=useState(0);
          const [productCustomerType,setProductCustomerType]=useState("Men");
          const [productPrice, setProductPrice]=useState(0);
          const [productCategory, setProductCategory]=useState("Casual Shirts");
          const [productDimentions, setProductDimentions]=useState("Small");
          const [productDiscription, setProductDiscription]=useState("");
          const [productAvailability,setProductAvailability]=useState(true);
          const [productImages,setproductImages]=useState([])//images usestate Array

          const navigate =useNavigate();                  //navigate to you wont location eg:="/admin/item"


          const backendurl=import.meta.env.VITE_BACKEND_URL                // import env



                async function handleAddItem(){            /*  add button onclick function */
                               const promises=[]       //create promises array(used to handle multiple promises)
                               

                              for(let i=0; i<productImages.length; i++){    //read to product image one by one
                                console.log(productImages[i])               //print console log (image one by one)
                                const promise=MediaUpload(productImages[i])      //get promise each file
                                promises.push(promise)                      //push promise to promises array

                                 if(i==5){
                                  toast.error("You Can Only Upload 5  Images at a Time")
                                  break;
                                } 
                              }
                              

                              
                              
                              const token=localStorage.getItem("token");  /*get token*/
                                            
                                      /* if(token == null){
                                        toast.error("please login first");        //1st Method check autherization
                                        }*/
                                       if(token){                                  //2nd Method check autherization

                                              try{

                                                /* Promise.all(promises).then((result)=>{                   //{1st way of execute promises array}        //use try catch
                                                  console.log(result)                                    //execute all promises in one time(Promise.all = In build function)
                                                }).catch((err)=>{
                                                  toast.error(err)
                                                }) */

                                                
                                                const imageURL=await Promise.all(promises) //{2st way of execute promises array}      //useing async await


                                                      const result = await axios.post(`${backendurl}/api/product/add`,{        //link     //.env useing backtick
                                                            
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
            <h1 className="text-2xl font-bold mb-4">Add Item</h1>
            <div className="w-full max-w-md border border-gray-300 p-6 rounded-lg shadow-lg flex flex-col gap-4 bg-white">
                <input className="border p-2 rounded" onChange={(e) => setProductKey(e.target.value)} values={productKey} type="text" placeholder="Product Key" />
                <input className="border p-2 rounded" onChange={(e) => setProductName(e.target.value)} values={productName} type="text" placeholder="Product Name" />
                <input className="border p-2 rounded" onChange={(e) => setProductQuantity(e.target.value)} values={productQuantity} type="number" placeholder="Product Quantity" />
                <input className="border p-2 rounded" onChange={(e) => setProductPrice(e.target.value)} values={productPrice} type="number" placeholder="Product Price" />
                <select className="border p-2 rounded" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                    <option>Casual Shirts</option>
                    <option>Formal Shirts</option>
                    <option>T-Shirts</option>
                    <option>Trousers</option>
                    <option>Inner Wear</option>
                    <option>Tops</option>
                    <option>Sarees</option>
                    <option>School Uniform</option>
                </select>
                <select className="border p-2 rounded" value={productCustomerType} onChange={(e) => setProductCustomerType(e.target.value)}>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                </select>
                <select className="border p-2 rounded" value={productDimentions} onChange={(e) => setProductDimentions(e.target.value)}>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                    <option>XL</option>
                    <option>XXL</option>
                </select>
                <textarea className="border p-2 rounded" onChange={(e) => setProductDiscription(e.target.value)} values={productDiscription} placeholder="Product Description"></textarea>
                <input className="border p-2 rounded" type="file" multiple onChange={(e) => setproductImages(e.target.files)} />
                <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleAddItem}>Add</button>
                <button className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={() => navigate("/admin/items")}>Cancel</button>
            </div>
        </div>
  )
}


import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import MediaUpload from "../../utils/MediaUpload";



export default  function UpdateItem() {

          const location=useLocation()
          
          
          const [productKey, setProductKey]=useState(location.state.key);             /* create input data usestate */
          const [productName, setProductName]=useState(location.state.name);
          const [productQuantity,setProductQuantity]=useState(location.state.quantity);
          const [productCustomerType,setProductCustomerType]=useState(location.state.customerType);
          const [productPrice, setProductPrice]=useState(location.state.price);
          const [productCategory, setProductCategory]=useState(location.state.category);
          const [productDimentions, setProductDimentions]=useState(location.state.dimension);
          const [productDiscription, setProductDiscription]=useState(location.state.discription);
          const [productAvailability,setProductAvailability]=useState(location.state.availability);
          const [productImages,setproductImages]=useState([])//images usestate Array
          



         

          const navigate =useNavigate();                  //navigate to you wont location 



                async function handleUpdateItem(){            /*  add button onclick function */
                  let updatingImages=location.state.Image;

                      if (productImages.length>0){        //if check user add new image 
                        const promises=[];       //create promises array(used to handle multiple promises)

                        for(let i=0; i<productImages.length; i++){    //read to product image one by one
                                    console.log(productImages[i])               //print console log (image one by one)
                                    const promise=MediaUpload(productImages[i])      //get promise each file
                                    promises.push(promise)                      //push promise to promises array
                            }

                             updatingImages=await Promise.all(promises);//update images
                            
                                                      
                          }
                              
                              const token=localStorage.getItem("token");  /*get token*/
                                            
                                       /* if(token == null){
                                        toast.error("please login first");        //1st Method check autherization
                                        } */
                                            if(token){                                  //2nd Method check autherization

                                              try{
                                                      const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/product/`+productKey,{        //link      //.env useing backtick direct way
                                                            
                                                                                     
                                                              key:productKey,                         
                                                              name:productName,
                                                              quantity:productQuantity,
                                                              customerType:productCustomerType,
                                                              price:productPrice, 
                                                              category:productCategory,
                                                              dimension:productDimentions,
                                                              description:productDiscription,
                                                              availability:productAvailability,
                                                              Image:updatingImages,
                                                      },{
                                                              headers:{
                                                                Authorization:"Bearer " +token            //pass the bsck end token with data
                                                              }
                                                      })
                                                      console.log(result)
                                                      toast.success(result.data.message);

                                                      navigate ("/admin/items")                         //After success, navigate to the admin/items page.


                                                      
                                                }catch(error){
                                                  console.log(error)
                                                  toast.error(error.response.data.Message || "Error");
                                                }

                                        }else{
                                                   toast.error("please login first");    
                                        }

                                      

                } 



  return (
            <div className="w-full h-full flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Update Item</h1>
            <div className="w-full max-w-md border border-gray-300 p-6 rounded-lg shadow-lg flex flex-col gap-4 bg-white">
                <input className="border p-2 rounded bg-gray-100" disabled value={productKey} type="text" placeholder="Product Key" />
                <input className="border p-2 rounded" onChange={(e) => setProductName(e.target.value)} value={productName} type="text" placeholder="Product Name" />
                <input className="border p-2 rounded" onChange={(e) => setProductQuantity(e.target.value)} value={productQuantity} type="number" placeholder="Product Quantity" />
                <input className="border p-2 rounded" onChange={(e) => setProductPrice(e.target.value)} value={productPrice} type="number" placeholder="Product Price" />
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
                <select className="border p-2 rounded" value={productAvailability} onChange={(e) => setProductAvailability(e.target.value)}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <textarea className="border p-2 rounded" onChange={(e) => setProductDiscription(e.target.value)} value={productDiscription} placeholder="Product Description"></textarea>
                <input className="border p-2 rounded" type="file" multiple onChange={(e) => setproductImages(e.target.files)} />
                <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleUpdateItem}>Update Item</button>
                <button className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={() => navigate("/admin/items")}>Cancel</button>
            </div>
        </div>
  )
}


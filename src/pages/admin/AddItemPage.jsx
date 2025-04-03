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
    <div className="w-full h-full flex flex-col items-center">          {/* create item data input  form */}
      <h1>Add Item</h1>
                <div className="w-[400px] border flex flex-col ">
                              <input onChange={(e)=>{setProductKey(e.target.value)}} values={productKey} type="text" placeholder="product Key"/>
                              <input onChange={(e)=>{setProductName(e.target.value)}} values={productName} type="text" placeholder="product Name"/>
                              <input onChange={(e)=>{setProductQuantity(e.target.value)}} values={productQuantity} type="Number" placeholder="product Quantity"/>
                              <input onChange={(e)=>{setProductPrice(e.target.value)}} values={productPrice} type="Number" placeholder="product Price"/>
                              <select values={productCategory} onChange={(e)=>{setProductCategory(e.target.value)}}>
                                    <option key={"Casual Shirts"}>Casual Shirts</option>
                                    <option key={"Formal Shirts"}>Formal Shirts</option>
                                    <option key={"T-Shirts"}>T-Shirts</option>
                                    <option key={"Trousers"}>Trousers</option>
                                    <option key={"Inner Waear"}>Inner Waear</option>
                                    <option key={"Tops"}>Tops</option>
                                    <option key={"Sarees"}>Sarees</option>
                                    <option key={"School Uniform"}>School Uniform</option>
                              </select>
                              <select value={productCustomerType} onChange={(e)=>{setProductCustomerType(e.target.value)}}>
                                    <option key={"Men"}>Men</option>
                                    <option key={"Women"}>Women</option>
                                    <option key={"Kids"}>Kids</option>
                              </select>
                              <select value={productDimentions} onChange={(e)=>{setProductDimentions(e.target.value)}}>
                                    <option key={"Small"}>Small</option>
                                    <option key={"Medium"}>Medium</option>
                                    <option key={"Large"}>Large</option>
                                    <option key={"XL"}>XL</option>
                                    <option key={"XXL"}>XXL</option>
                              </select>
                              <textarea onChange={(e)=>{setProductDiscription(e.target.value)}} values={productDiscription} type="text" placeholder="product Discription"/>
                              <input  type="file"  multiple onChange={(e)=>{setproductImages(e.target.files)}} />
                              
                              <button onClick={handleAddItem}>Add</button>      {/* add button */}
                              <button onClick={()=>{navigate("/admin/items")}}>cancel</button>     {/* navigate to click navigate button */}

                </div>
    </div>
  )
}


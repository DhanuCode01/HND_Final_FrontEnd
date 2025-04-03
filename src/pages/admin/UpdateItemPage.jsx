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
    <div className="w-full h-full flex flex-col items-center">          {/* create item data update  form */}
      <h1>Update Item</h1>
                <div className="w-[400px] border flex flex-col ">
                <input  disabled onChange={(e)=>{setProductKey(e.target.value)}} value={productKey} type="text" placeholder="product Key"/>
                              <input onChange={(e)=>{setProductName(e.target.value)}} value={productName} type="text" placeholder="product Name"/>
                              <input onChange={(e)=>{setProductQuantity(e.target.value)}} value={productQuantity} type="Number" placeholder="product Quantity"/>
                              <input onChange={(e)=>{setProductPrice(e.target.value)}} value={productPrice} type="Number" placeholder="product Price"/>
                              <select value={productCategory} onChange={(e)=>{setProductCategory(e.target.value)}}>
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
                              <select value={productAvailability} onChange={(e)=>{setProductAvailability(e.target.value)}}>
                                    <option key={"true"}>True</option>
                                    <option key={"False"}>False</option>
                              </select>
                              <textarea onChange={(e)=>{setProductDiscription(e.target.value)}} values={productDiscription} type="text" placeholder="product Discription"/>
                              <input  type="file"  multiple onChange={(e)=>{setproductImages(e.target.files)}} />
                              
                              <button onClick={handleUpdateItem}>Update Item</button>      {/* update button */}
                              <button onClick={()=>{navigate("/admin/items")}}>cancel</button>     {/* navigate to click navigate button */}

                </div>
    </div>
  )
}


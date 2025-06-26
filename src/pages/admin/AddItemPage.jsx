import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MediaUpload from "../../utils/MediaUpload.jsx";


const categories = {
  men: [
    { label: "T-Shirts", value: "t-shirts" },
    { label: "Casual Shirts", value: "casual-shirts" },
    { label: "Formal Shirts", value: "formal-shirts" },
    { label: "Jackets", value: "jackets" },
    { label: "Jeans", value: "jeans" },
    { label: "Casual Trousers", value: "casual-trousers" },
    { label: "Formal Trousers", value: "formal-trousers" },
    { label: "Shorts", value: "shorts" },
    { label: "Track Pants & Joggers", value: "track-pants-&-joggers" },
    { label: "Formal Shoes", value: "formal-shoes" },
    { label: "Sandals & Floaters", value: "sandals-&-floaters" },
    { label: "Flip Flops", value: "flip-flops" },
    { label: "Socks", value: "socks" },
    { label: "Belts", value: "belts" },
    { label: "Caps & Hats", value: "caps-&-hats" },
    { label: "Sunglasses & Frames", value: "sunglasses-&-frames" },
    { label: "Bags & Backpacks", value: "bags-&-backpacks" },
  ],
  women: [
    { label: "Dresses", value: "dresses" },
    { label: "Tops", value: "tops" },
    { label: "T Shirt", value: "t-shirt" },
    { label: "Jumpsuits", value: "jumpsuits" },
    { label: "Jeans", value: "jeans" },
    { label: "Leggings", value: "leggings" },
    { label: "Trousers", value: "trousers" },
    { label: "Shorts", value: "shorts" },
    { label: "Skirts & Plazzos", value: "skirts-&-plazzos" },
    { label: "Full Kits", value: "full-kits" },
    { label: "Jackets & Coats", value: "jackets-&-coats" },
    { label: "Shoes", value: "shoes" },
    { label: "Flats", value: "flats" },
    { label: "Sandals", value: "sandals" },
    { label: "Heels", value: "heels" },
    { label: "Flips Flops", value: "flips-flops" },
    { label: "Bra", value: "bra" },
    { label: "Sarees", value: "sarees" },
    { label: "Wallets", value: "wallets" },
    { label: "Belts", value: "belts" },
    { label: "Fashion Jewellery", value: "fashion-jewellery" },
    { label: "Sunglasses & Frames", value: "sunglasses-&-frames" },
    { label: "Hand Bags & Backpacks", value: "hand-bags-&-backpacks" },
  ],
  kids: [
    { label: "T-Shirts", value: "t-shirts" },
    { label: "Shirts", value: "shirts" },
    { label: "Jeans", value: "jeans" },
    { label: "Trousers", value: "trousers" },
    { label: "Shorts", value: "shorts" },
    { label: "Jackets", value: "jackets" },
    { label: "Frocks", value: "frocks" },
    { label: "Skirts", value: "skirts" },
    { label: "Shoes", value: "shoes" },
    { label: "Sandals", value: "sandals" },
    { label: "Socks", value: "socks" },
    { label: "Caps", value: "caps" },
    { label: "Backpacks", value: "backpacks" },
  ],
};



export default  function AddItemPage() {

          const [productKey, setProductKey]=useState("");             /* create input data usestate */
          const [productName, setProductName]=useState("");
          const [productQuantity,setProductQuantity]=useState(0);
          const [productCustomerType,setProductCustomerType]=useState("");
          const [productPrice, setProductPrice]=useState(0);
          const [productCategory, setProductCategory]=useState("t-shirts");
          const [productDimentions, setProductDimentions]=useState("Free");
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
                    <option value="XXXL">XXXL</option>
                </select>
                <textarea className="border p-2 rounded" onChange={(e) => setProductDiscription(e.target.value)} values={productDiscription} placeholder="Product Description"></textarea>
                <input className="border p-2 rounded" type="file" multiple onChange={(e) => setproductImages(e.target.files)} />
                <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleAddItem}>Add</button>
                <button className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={() => navigate("/admin/items")}>Cancel</button>
            </div>
        </div>
  )
}


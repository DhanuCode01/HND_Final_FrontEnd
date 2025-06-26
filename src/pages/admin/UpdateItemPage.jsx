import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import MediaUpload from "../../utils/MediaUpload";

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
                <select className="border p-2 rounded" value={productCustomerType} onChange={(e) => setProductCustomerType(e.target.value)}>
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


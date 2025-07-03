import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminitemPage.css";

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

export default function UpdateRentItemPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [productKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productQuantity, setProductQuantity] = useState(location.state.quantity);
  const [productCustomerType, setProductCustomerType] = useState(location.state.customerType);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimentions, setProductDimentions] = useState(location.state.dimension);
  const [productDiscription, setProductDiscription] = useState(location.state.description);
  const [productAvailability, setProductAvailability] = useState(location.state.availability);

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  async function handleUpdateItem() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const result = await axios.put(
        `${backendurl}/api/rent/${productKey}`,
        {
          key: productKey,
          name: productName,
          quantity: productQuantity,
          customerType: productCustomerType,
          price: productPrice,
          category: productCategory,
          dimension: productDimentions,
          description: productDiscription,
          availability: productAvailability,
          Image: location.state.Image, // ⬅ Use previous image URLs without change
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(result.data.Message || "Update successful");
      navigate("/admin/rent");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Update failed");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-6 bg-picture">
      <h1 className="text-2xl font-bold mb-4">Update Rent Item</h1>
      <div className="w-full max-w-md border border-gray-300 p-6 rounded-lg shadow-lg flex flex-col gap-4 bg-white">
        <input className="border p-2 rounded bg-gray-100" disabled value={productKey} type="text" />
        <input className="border p-2 rounded" onChange={(e) => setProductName(e.target.value)} value={productName} type="text" placeholder="Product Name" />
        <input className="border p-2 rounded" onChange={(e) => setProductQuantity(e.target.value)} value={productQuantity} type="number" placeholder="Product Quantity" />
        <input className="border p-2 rounded" onChange={(e) => setProductPrice(e.target.value)} value={productPrice} type="number" placeholder="Product Price" />

        <select className="border p-2 rounded" value={productCustomerType} onChange={(e) => setProductCustomerType(e.target.value)}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        {productCustomerType ? (
          <select className="border p-2 rounded" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
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

        <select className="border p-2 rounded" value={productAvailability} onChange={(e) => setProductAvailability(e.target.value === "true")}>
          <option value={true}>Available</option>
          <option value={false}>Not Available</option>
        </select>

        <textarea
          className="border p-2 rounded"
          onChange={(e) => setProductDiscription(e.target.value)}
          value={productDiscription}
          placeholder="Product Description"
        ></textarea>

        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleUpdateItem}>
          Update
        </button>
        <button className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={() => navigate("/admin/rent")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

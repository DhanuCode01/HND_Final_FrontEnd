import axios from "axios";
import "./RegisterPage.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [type, setType] = useState("customer");


    const navigate=useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log({ email, password, firstName, lastName, address, phone, type });

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/`,{
            email:email,
            password:password,
            type:type,
            firstName:firstName,
            lastName:lastName,
            address:address,
            phone:phone
        }).then((res)=>{
            console.log(res)
            toast.success(res?.data?.Message  || "Register Successfully👍")

            navigate("/login");
            
        }).catch((err)=>{
            console.log(err)
            toast.error(err?.response?.data?.error  || "An error Occured❗")//     Is there a response in the err? If there is one,     is there a data in it? If there is one,       is there a data in it? If there is one,       is there a data in it? If it fails somewhere ,     display An error Occurred!
        })
    }

    return (
        <div className="bg-picture h-screen w-full flex justify-center items-center ">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[400px] h-[600px] backdrop-blur-2xl rounded-2xl flex flex-col justify-center items-center relative font-['Roboto'] ">
                    <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] absolute top-1 object-cover" />
                    <input type="text" placeholder="First Name" className="mt-6 w-[300px] bg-transparent border-b-2 border-black text-black text-xl outline-none" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" className="mt-6 w-[300px] bg-transparent border-b-2 border-black text-black text-xl outline-none" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" placeholder="Email" className="mt-6 w-[300px] bg-transparent border-b-2 border-black text-black text-xl outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="mt-6 w-[300px] bg-transparent border-b-2 border-black text-black text-xl outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="Address" className="mt-6 w-[300px] bg-transparent border-b-2 border-black text-black text-xl outline-none" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" placeholder="Phone" className="mt-6 w-[300px] bg-transparent border-b-2 border-black text-black text-xl outline-none" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <select className="mt-6 w-[300px] bg-transparent border-b-2 border-black text-black text-xl outline-none" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                        
                        
                    </select>
                    <button className="my-6 w-[300px] h-[50px] bg-primary text-2xl text-black rounded-lg border-2 ">Register</button>
                </div>
            </form>
        </div>
    );
}

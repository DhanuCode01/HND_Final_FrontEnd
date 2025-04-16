import "./LoginPage.css"
import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    

    function handleOnSubmit(e){
           e.preventDefault();
           console.log(email,password)

           const backendurl=import.meta.env.VITE_BACKEND_URL                // import env

           axios.post(backendurl+"/api/user/user",                          //.env using normal way
             
            {
                email:email,
                password:password
            }
           ).then((res)=>{
            console.log(res)
            toast.success("Login Success ✔️");


            const user=res.data.user;
            console.log(user)

            localStorage.setItem("token",res.data.token)    /* save user token in localStorage */
            console.log(user.type)
            

             if(user.type === "Admin"){
                navigate("/admin/items");
            }else{
                navigate("/");
            }



           }).catch((error)=>{
            console.log(error)
            toast.error(error.response.data.error || "Error❗")
           })


    }

    return(
        <div className="bg-picture w-full h-screen flex justify-center items-center  ">
                <form onSubmit={handleOnSubmit}>
                <div className="w-[400px] h-[400px] backdrop-blur-2xl rounded-2xl flex flex-col justify-center items-center relative font-['Roboto']">
                            <img src="/logo.png" alt="logo" className="w-[100px] h=[100px] absolute top-1 object-cover"/>
                            <input type="email" placeholder="Email" className="mt-6 w-[300px] h=[50px] bg-transparent border-b-2 border-black text-black text-xl outline-none"
                                        value={email}
                                        onChange={(e)=>{
                                            setEmail(e.target.value);
                                        }}/>
                            <input type="password" placeholder="Password" className="mt-6 w-[300px] h=[50px] bg-transparent border-b-2 border-black text-black text-xl outline-none"
                                        value={password}
                                        onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }}/>
                            <button className="mt-8 w-[300px] h-[50px] bg-primary text-2xl text-black rounded-lg border-2 " >Login</button>

                            <p className="text-sm text-gray-700 ">
                                 Don't have an account?{" "}
                                        <Link
                                             to="/register"
                                             className="text-primary font-semibold hover:underline hover:text-blue-600 transition duration-200"
                                            >
                                             Register
                                            </Link>
                            </p>

                     

                </div>
                </form>

        </div>
    )
    
}
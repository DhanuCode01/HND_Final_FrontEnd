import { Link, useNavigate } from 'react-router-dom'
import Shop from '../../assets/Shop.mp4'
import toast from 'react-hot-toast';
import axios from 'axios';

export default function GetStart(){
    const navigate = useNavigate();

    function handleOnclick(e){
        e.preventDefault();
        

        const token=localStorage.getItem("token");
            if(token){
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`,{ headers: { Authorization: `Bearer ${token}` } })

                        .then((res)=>{
                            const user=res.data.success;
                            if(user=="Admin"){
                                navigate("/admin/items");
                                toast.success("Admin Login Successfully");

                            }else{
                                navigate("/");
                                toast.success("Customer Login Successfully")
                            }

                                
                        }).catch((err)=>{
                            //console.log(err.response.data.Message) 
                            toast.error(err?.response?.data?.Message || "An Error Occured❗")
                            
                        })
            }else{
                navigate("/login")
                toast.error("Please Login First ‼️")
            }

                        
        

       /*  if (token){
            
            console.log(token);
        }else{
            toast.error("Please Login & Ary Again ‼️")
        } */
        
    }

    return(
        <div className='h-full w-full m-4 flex justify-center items-center relative  '>

                    <video className='h-screen w-screen object-cover ' src={Shop} autoPlay loop/>
                    <div className="h-[60px] w-fit px-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl fixed top-4 right-4 rounded-full flex items-center gap-6 text-white font-medium text-sm z-30">
                        <Link
                            to="/login"
                            className="hover:text-green-400 transition duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full transition duration-300 shadow-sm"
                        >
                            Sign Up
                        </Link>
                    </div>

                    <div className="h-[480px] w-[420px] absolute z-20 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl flex flex-col justify-center items-center gap-4 px-8 py-6 font-['Roboto'] text-white text-center animate-fade-in">
    
                                <img
                                    src="/logo.png"
                                    alt="logo"
                                    className="w-[90px] h-[90px] object-contain mb-2 drop-shadow-lg"
                                />

                                <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-sm">WELCOME</h1>
                                <p className="text-lg tracking-wider font-light">to our</p>
                                <p className="text-lg tracking-wider font-light">new online</p>
                                <p className="text-lg tracking-wider font-light mb-4">Store</p>

                                <Link
                                    onClick={handleOnclick}
                                    className="mt-2 px-8 py-3 bg-green-600 hover:bg-green-700 active:scale-95 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
                                >
                                    Get Started
                                </Link>
                    </div>

        </div> 
    )
}
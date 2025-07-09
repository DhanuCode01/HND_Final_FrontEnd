import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import RentCard from "../../components/RentCard";


export default function Home(){
    const [State,setState]=useState("loading");//loading,success,error
    const [items,setItems]=useState([]);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    useState(()=>{
        if(State=="loading"){

            //const token = localStorage.getItem("token");  /*get token*/
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/rent`/* , {headers: { Authorization: `Bearer ${token}` },} */)
                    .then((res) => {
                        console.log(res.data)
                        setItems(res.data);
                        setState("success")
                    })
                    .catch((err) => {
                          console.log(err);
                          setState("error")
                    });


        }
    },[])
    return(
        <div     
                    onMouseMove={handleMouseMove}
                    className="min-h-screen w-full flex flex-wrap justify-center pt-[50px] bg-gradient-to-br from-primary to-accent overflow-y-auto"
                    >

                        <div
                            className="pointer-events-none fixed z-10 w-[80px] h-[80px] bg-accent rounded-full blur-2xl transition-all duration-50"
                            style={{
                            top: cursorPos.y - 40,
                            left: cursorPos.x - 40,
                            }}
                        ></div>

                {State== "loading" && 
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
                        </div>
                }
                {State=="success" &&
                    items.map((item)=>{
                        return(
                            
                            
                            <RentCard key={item.key} item={item}/>
                           
                        )
                    })}
        </div>
    )
}
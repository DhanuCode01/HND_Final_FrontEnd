import RentHeder from "../../components/RentHeader.jsx"


import { Routes,Route } from "react-router-dom"
import Men from "../shop/Men.jsx"
import Women from "./Women.jsx"
import Kids from "./Kids.jsx"
import Error from "../shop/Error.jsx"


export default function RentPage(){
    return(
        <div>
                <RentHeder/>
                <div className="w-full h-screen bg-primary ">
                            <Routes path="/*">
                                <Route path="/rmen"  element={<Men/>}></Route>
                                <Route path="/rwomen"  element={<Women/>}></Route>
                                <Route path="/rkids"  element={<Kids/>}></Route>
                                <Route path="/*"  element={<Error/>}></Route>
                                </Routes>
                </div>
                  

        </div>
    )
}
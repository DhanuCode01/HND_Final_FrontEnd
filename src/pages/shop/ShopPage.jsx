import ShopHeader from "../../components/ShopHeader.jsx"
import Men from "./Men.jsx"
import Women from "./Women.jsx"
import Kids from "./Kids.jsx"
import Error from "./Error.jsx"
import Home from "./Home.jsx"

import { Routes,Route } from "react-router-dom"


export default function ShopPage(){

    return(
        <div>
            <ShopHeader/>
            <div className="w-full h-screen bg-primary ">
                       <Routes path="/*">
                            <Route path="/"  element={<Home/>}></Route>
                            <Route path="/men"  element={<Men/>}></Route>
                            <Route path="/women"  element={<Women/>}></Route>
                            <Route path="/kids"  element={<Kids/>}></Route>
                            <Route path="/*"  element={<Error/>}></Route>
                       </Routes>
                    </div>
        </div>
    )
}
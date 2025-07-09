import RentHeder from "../../components/RentHeader.jsx"


import { Routes,Route } from "react-router-dom"
import Men from "./Men.jsx"
import Women from "./Women.jsx"
import Kids from "./Kids.jsx"
import Error from "../shop/Error.jsx"
import Home from "./Home.jsx"
import ImageSearch from "./ImageSearch.jsx"
import RentProductOverview from "./RentProductOverview.jsx"
import ShopFooter from "../../components/ShopFooter.jsx"


export default function RentPage(){
    return(
        <div>
                <RentHeder/>
                <div className="w-full h-screen bg-primary ">
                            <Routes path="/*">
                                <Route path="/men/:key"  element={<Men/>}></Route>
                                <Route path="/women/:key"  element={<Women/>}></Route>
                                <Route path="/kids/:key"  element={<Kids/>}></Route>
                                <Route path="/search"  element={<ImageSearch/>}></Route>
                                <Route path="/rent/:key" element={<RentProductOverview/>}></Route>
                                <Route path="/"  element={<Home/>}></Route>
                                <Route path="/*"  element={<Error/>}></Route>
                                </Routes>
                </div>
                
                

        </div>
    )
}
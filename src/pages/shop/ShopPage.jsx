import ShopHeader from "../../components/ShopHeader.jsx"
import Men from "./Men.jsx"
import Women from "./Women.jsx"
import Kids from "./Kids.jsx"
import Error from "./Error.jsx"
import Home from "./Home.jsx"

import { Routes,Route } from "react-router-dom"
import ProductOverview from "./ProductOverview.jsx"
import BookingPage from "./BookingPage.jsx"
import ShopFooter from "../../components/ShopFooter.jsx"
import AboutUs from "../aboutUs/AboutUs.jsx"


export default function ShopPage(){

    return(
        <div>
            <ShopHeader/>
            <div className="w-full h-full bg-primary ">
                       <Routes path="/*">
                            <Route path="/product/:key" element={<ProductOverview/>}></Route>
                            <Route path="/booking" element={<BookingPage/>} />
                            <Route path="/men/:key"  element={<Men/>}></Route>
                            <Route path="/women/:key"  element={<Women/>}></Route>
                            <Route path="/kids/:key"  element={<Kids/>}></Route>
                            <Route path="/about"  element={<AboutUs/>}></Route>
                            <Route path="/"  element={<Home/>}></Route> 
                            {/* <Route path="/*"  element={<Error/>}></Route> */} 
                       </Routes>
                    </div>
            <ShopFooter/>
        </div>
    )
}
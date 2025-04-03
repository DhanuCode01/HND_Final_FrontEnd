import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import RentPage from "../rent/RentPAge.jsx";
import ShopPage from "../shop/ShopPage.jsx";

export default function HomePage(){
    return(
        <>
            <Header/>
                    <div className="w-full h-screen bg-primary ">
                       <Routes path="/*">
                            <Route path="/rent/*"  element={<RentPage/>}></Route>                         
                            <Route path="/*"  element={<ShopPage/>}></Route>
                       </Routes>
                    </div>
        </>
    )
}
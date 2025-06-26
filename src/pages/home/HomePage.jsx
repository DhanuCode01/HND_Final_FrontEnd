import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header.jsx";
import RentPage from "../rent/RentPAge.jsx";
import ShopPage from "../shop/ShopPage.jsx";
import ChangeClothesPage from "../ClothesTry/ChangeClothesPage.jsx";

export default function HomePage(){
    return(
        <>
            <Header/>
                    <div className="w-full h-full bg-primary ">
                       <Routes path="/*">
                            <Route path="/rent/*"  element={<RentPage/>}></Route>                         
                            <Route path="/picsman/"  element={<ChangeClothesPage/>}></Route>                         
                            <Route path="/*"  element={<ShopPage/>}></Route>
                       </Routes>
                    </div>
        </>
    )
}
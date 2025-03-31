import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import Men from "./Men.jsx"
import Women from "./Women.jsx"
import Kids from "./Kids.jsx"
import Error from "./Error.jsx"

export default function HomePage(){
    return(
        <>
            <Header/>
                    <div className="w-full h-screen bg-primary ">
                       <Routes path="/*">
                            <Route path="/men"  element={<Men/>}></Route>
                            <Route path="/women"  element={<Women/>}></Route>
                            <Route path="/kids"  element={<Kids/>}></Route>
                            <Route path="/*"  element={<Error/>}></Route>
                       </Routes>
                    </div>
        </>
    )
}
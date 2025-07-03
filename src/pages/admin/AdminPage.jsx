import { Link, Route, Routes } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import AdminItemPage from "./AdminItemPage";
import AddItemPage from "./AddItemPage";
import UpdateItem from "./UpdateItemPage";
import AdminDashboad from "./AdminDashboad";
import AdminUserPage from "./AdminUserPage";
import AdminRentItemPage from "./AdminRentItemPage";
import AddRentItemPage from "./AddRentItemPage";
import UpdateRentItemPage from "./UpdateRentItemPage";

export default function AdminPage(){
    return(
        
            <div className='w-full h-screen flex'>
                        <div className="w-[250px] h-screen flex flex-col">
                                    <div className="w-full h-[100px] flex justify-center items-center bg-white">
                                    <img src="/logo.png" alt="logo" className="w-[70px] h-[70px] object-cover absolute top-1 rounded-full border-[1px]"></img>
                                    </div>

                                <div className="w-full h-full bg-gradient-to-bl from-primary to-accent font-['Roboto'] flex flex-col  ">
                                     <Link to="/admin/users" className='w-full h-[40px] text-blue-400 text-[25px] font-bold flex justify-center items-center shadow-2xl mb-3'>
                                                <CiUser />
                                                users
                                    </Link>  
                                    <Link to="/admin/items" className='w-full h-[40px] text-blue-400 text-[25px] font-bold flex justify-center items-center shadow-2xl mb-3 '>
                                                <CiShop />
                                                Items
                                    </Link>   
                                    <Link to="/admin/rent" className='w-full h-[40px] text-blue-400 text-[25px] font-bold flex justify-center Dashboad-center shadow-2xl mb-3'>
                                                <CiBookmarkCheck />
                                                Rent Item
                                    </Link>          
                                    <Link to="/admin/dashboad" className='w-full h-[40px] text-blue-400 text-[25px] font-bold flex justify-center items-center shadow-2xl mb-3'>
                                                <CiBoxList />
                                                Dashboad
                                    </Link>   
                                </div>
                        </div>
                        
                        <div className='w-[calc(100vw-250px)] bg-primary'>
                            <Routes path="/*">
                                <Route path="/items" element={<AdminItemPage/>}></Route>
                                <Route path="/dashboad" element={<AdminDashboad/>}></Route>
                                <Route path="/users" element={<AdminUserPage/>}></Route>
                                <Route path="/items/add" element={<AddItemPage/>}></Route>
                                <Route path="/items/edit" element={<UpdateItem/>}></Route>
                                <Route path="/rent" element={<AdminRentItemPage/>}></Route>
                                <Route path="/rent/add" element={<AddRentItemPage/>}></Route>
                                <Route path="/rent/edit" element={<UpdateRentItemPage/>}></Route>
                                

                                 
                            </Routes>
                        </div>
        </div>
    )
}
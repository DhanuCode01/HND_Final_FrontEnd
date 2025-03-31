import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/login/LoginPage.jsx'
import RegisterPage from './pages/register/RegisterPage.jsx'
import HomePage from './pages/home/HomePage.jsx'


function App() {
 

  return (
    
     <BrowserRouter>
            <Toaster position='top-right'/>
            <Routes>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/*" element={<HomePage/>}/>
            </Routes>
     </BrowserRouter>
   
  )
}

export default App

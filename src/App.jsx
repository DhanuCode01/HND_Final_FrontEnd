import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/login/loginPage'
import RegisterPage from './pages/register/registerpage'


function App() {
 

  return (
    
     <BrowserRouter>
            <Toaster position='top-right'/>
            <Routes>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>} />
            </Routes>
     </BrowserRouter>
   
  )
}

export default App

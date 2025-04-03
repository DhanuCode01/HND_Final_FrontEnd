import { Link } from "react-router-dom";

export default function Error(){
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-primary to-accent text-white">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-2xl mb-6">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/"  className="px-6 py-3 bg-white text-red-800  font-semibold text-lg rounded-lg shadow-md hover:bg-gray-100 transition-all">Go Home</Link>
        </div>
    )
}
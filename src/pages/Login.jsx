import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('You signed in succcesfully',{
        position: "top-center",
        autoClose: 1500, // closes after 1.5 seconds
        style: {
          textAlign: "center", // center text
        },
      });
      setTimeout(()=>{navigate("/account")}, 300);
      
    }catch(error){
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 1500, // closes after 1.5 seconds
        style: {
          textAlign: "center", // center text
        },
      });

    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 ">
      <div className=" w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        
        <h1 className="text-2xl font-bold text-center mb-2">
          ВХОД
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Добре дошли! Моля, влезте в профила си.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Имейл
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Парола
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-teal-500" />
              Запомни ме
            </label>
            <a href="#" className="text-teal-500 hover:underline">
              Забравена парола?
            </a>
          </div>

          
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Нямаш акуант?{" "}
          <Link to="/register" className="text-teal-500 hover:underline">
            Регистрирай се
          </Link>
        </p>

      </div>
    </div>
  );
}

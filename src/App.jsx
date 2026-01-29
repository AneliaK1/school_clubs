import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="min-h-screen overflow-auto pt-[64px]">
      <Navbar/>
      <Outlet/>
      <ToastContainer/>
    </div>
  )
}
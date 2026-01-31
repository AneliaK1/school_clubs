import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="min-h-screen overflow-auto pt-[64px] relative">
      <Navbar
        menuOpened={menuOpened}
        handleMenuChanged={setMenuOpened} // control menu state
      />
      <ScrollToTop />

      {/* Backdrop (blocks clicks but does NOT close menu) */}
      {menuOpened && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={(e) => e.stopPropagation()} // prevent clicks from propagating
        />
      )}

      <Outlet />
      <ToastContainer />
    </div>
  );
}

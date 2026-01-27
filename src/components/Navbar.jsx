import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, role } = useAuth();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const roleNumber = (() => {
  if (!user) return 1;
  if (role === "club-owner") return 2;
  if (role === "moderator") return 3;
  return 1;
  })();

  const links = [
    ["/moderation", "Модерация", 3, 3],
    ["/", "Начало", 1, 3 ],
    ["/clubs", "Клубове", 1, 3],
    ["/login", "Вход", 1, 1],
    ["/account", "Моят профил", 2, 3]
  ];
  
  useEffect(()=>{
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        console.log('clicked');
      }
    }
    if(menuOpen){
      document.addEventListener("pointerdown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  })

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b flex justify-between items-center px-6 md:px-20 p-2 md:py-3">

      <img src='src\img\logo5.png' className="h-11   md:h-14 rounded-2xl"></img>

      {/* Desktop */}
      <ul className="hidden md:flex gap-8 text-md">
        {links.map(([path, label, minRole, maxRole]) =>
            (roleNumber >= minRole && roleNumber<=maxRole) ? (
              <li key={path} onClick={() => setMenuOpen(false)}>
                <Link
                  to={path}
                  className={`text-lg transition hover:text-teal-600 ${
                    pathname === path ? "text-teal-600" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ) : null
          )}
      </ul>
      <div ref = {menuRef}>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xl flex items-center"
          aria-label="Open menu"
        >
          {!menuOpen ? <RxHamburgerMenu /> : <MdOutlineClose/>}
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <ul
            className="absolute top-full left-0 w-full bg-white
                      flex flex-col items-center gap-6 py-6
                      border-t md:hidden animate-in slide-in-from-top duration-200"
            
          >
            {links.map(([path, label, minRole, maxRole]) => 
            (roleNumber >= minRole && roleNumber<=maxRole) ?
              (<li key={path} onClick={() => setMenuOpen(false)}>
                <Link
                  to={path}
                  className={`text-lg transition hover:text-teal-600 ${
                    pathname === path && "text-teal-600"
                  }`}
                >
                  {label}
                </Link>
              </li>) : null
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

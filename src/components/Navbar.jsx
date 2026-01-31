import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import logo8 from "../img/logo8.jpg";

export default function Navbar({ menuOpened, handleMenuChanged }) {
  const { pathname } = useLocation();
  const { user, role } = useAuth();
  const menuRef = useRef(null);
  const isActive = (path) =>
  path === "/" ? pathname === "/" : pathname.startsWith(path);
  // Role mapping
  const roleNumber = !user
    ? 1
    : role === "club-owner"
    ? 2
    : role === "moderator"
    ? 3
    : 1;

  const links = [
    ["/", "Начало", 1, 3],
    ["/clubs", "Клубове", 1, 3],
    ["/moderation", "Модерация", 3, 3],
    ["/create", "Създай публикация", 2, 2],
    ["/account", "Моят профил", 2, 3],
    ["/login", "Вход", 1, 1],
  ];

  // Close menu on outside click (desktop only)
  useEffect(() => {
    if (!menuOpened) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleMenuChanged(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [menuOpened, handleMenuChanged]);

  // Close menu on route change
  useEffect(() => {
    handleMenuChanged(false);
  }, [pathname, handleMenuChanged]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-3 z-45">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo8}
            alt="Новинарника"
            className="h-11 md:h-14 rounded-2xl"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          {links.map(([path, label, minRole, maxRole]) =>
            roleNumber >= minRole && roleNumber <= maxRole ? (
              <li key={path}>
                <Link
                  to={path}
                  className={`relative transition-colors duration-200 hover:text-teal-600 ${
                    isActive(path)  ? "text-teal-600" : "text-neutral-700"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-teal-600 transition-all duration-300 ${
                      isActive(path) ? "w-full" : "w-0 hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ) : null
          )}
        </ul>

        {/* Mobile */}
        <div ref={menuRef} className="md:hidden relative">
          <button
            onClick={() => handleMenuChanged(!menuOpened)}
            aria-label="Toggle menu"
            className="text-2xl p-2 rounded-lg hover:bg-neutral-100 transition"
          >
            {menuOpened ? <MdOutlineClose /> : <RxHamburgerMenu />}
          </button>

          {/* Mobile dropdown */}
          {menuOpened && (
            <ul className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg flex flex-col py-4 gap-2 z-50 animate-in fade-in slide-in-from-top-2">
              {links.map(([path, label, minRole, maxRole]) =>
                roleNumber >= minRole && roleNumber <= maxRole ? (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`block px-5 py-2 rounded-lg transition ${
                        isActive(path) ? "bg-teal-50 text-teal-600 font-semibold"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

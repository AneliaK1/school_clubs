import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll smoothly to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // or "smooth" if you want smooth scrolling
    });
  }, [pathname]);

  return null;
}

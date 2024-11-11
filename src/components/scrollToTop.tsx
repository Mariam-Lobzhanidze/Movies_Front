import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop(location.pathname);
  }, [location]);

  return null;
};

export default ScrollToTop;

import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Dropdown from "./dropdown";
import profileImage from "../../assets/profile_default.jpg";
import { useRef } from "react";
import { Offcanvas } from "bootstrap";

const MobileNav: React.FC = () => {
  const offcanvasRef = useRef<HTMLDivElement | null>(null);
  const { isLoggedIn, handleLogout, activeUser } = useAuth();

  const dropdownItems = [
    { label: "AdminPage", href: "/adminPage", visible: activeUser?.role === "admin" },
    { label: "Sign out", onClick: handleLogout },
  ];

  const handleCloseOffcanvas = () => {
    if (offcanvasRef.current) {
      const offcanvasInstance = Offcanvas.getInstance(offcanvasRef.current);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      } else {
        new Offcanvas(offcanvasRef.current).hide();
      }
    }

    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  };

  return (
    <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvas" ref={offcanvasRef}>
      <div className="offcanvas-header d-flex justify-content-between align-items-center">
        <h5 className="offcanvas-title" id="offcanvasLabel">
          <Link to="/" onClick={handleCloseOffcanvas} className="me-4 navbar-brand fs-5 fw-bold navbar-brand">
            Movies
          </Link>
        </h5>

        <button type="button" className="btn" data-bs-dismiss="offcanvas" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fafafa" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </button>
      </div>

      <div className="offcanvas-body d-flex flex-column gap-3 p-3 w-100">
        <hr />
        <ul className="nav nav-pills flex-column flex-fill gap-3">
          <li className="nav-item">
            <NavLink
              to={`/movies/favorites`}
              onClick={handleCloseOffcanvas}
              className={({ isActive }) => `nav-link px-2 ${isActive ? "active" : ""}`}>
              Favorites
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to={`/movies/watchlist`}
              onClick={handleCloseOffcanvas}
              className={({ isActive }) => `nav-link px-2 ${isActive ? "active" : ""}`}>
              Watchlist
            </NavLink>
          </li>
        </ul>

        <hr />

        {!isLoggedIn ? (
          <div className="d-lg-none d-flex gap-3 ">
            <Link to="/register" role="button" className="btn btn-sm btn-secondary">
              Register
            </Link>
            <Link to="/login" role="button" className="btn btn-sm btn-primary">
              Login
            </Link>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between">
            <Dropdown profileImage={profileImage} items={dropdownItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;

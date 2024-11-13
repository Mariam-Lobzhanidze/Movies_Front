import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import MobileNav from "./mobileNav";
import Dropdown from "./dropdown";
import Search from "../shared/search";
import profileImage from "../../assets/profile_default.jpg";

const Header: React.FC = () => {
  const { isLoggedIn, handleLogout, activeUser } = useAuth();

  const dropdownItems = [
    { label: "AdminPage", href: "/adminPage", visible: activeUser?.role === "admin" },
    { label: "Sign out", onClick: handleLogout },
  ];

  return (
    <header className="p-4 border-bottom ">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex gap-4 align-items-center">
          <Link to="/" className="me-4 navbar-brand fs-5 fw-bold">
            Movies
          </Link>
          <ul className="nav d-none d-lg-flex gap-1 align-items-center">
            <li>
              <NavLink
                to={`/movies/favorites`}
                className={({ isActive }) => `nav-link px-2 ${isActive ? "active" : ""}`}>
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/movies/watchlist`}
                className={({ isActive }) => `nav-link px-2 ${isActive ? "active" : ""}`}>
                Watchlist
              </NavLink>
            </li>
          </ul>
        </div>

        <MobileNav />

        <div className="d-none d-lg-flex gap-3 align-items-center">
          <Search />

          {!isLoggedIn ? (
            <div className="d-none d-lg-flex gap-3 ">
              <Link to="/register" role="button" className="btn btn-sm btn-secondary">
                Register
              </Link>
              <Link to="/login" role="button" className="btn btn-sm btn-primary">
                Login
              </Link>
            </div>
          ) : (
            <Dropdown profileImage={profileImage} items={dropdownItems} />
          )}
        </div>
      </div>
      <div className="container d-lg-none d-block mt-4">
        <Search />
      </div>
    </header>
  );
};

export default Header;

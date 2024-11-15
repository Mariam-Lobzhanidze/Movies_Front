import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Dropdown from "./dropdown";
import { getDropdownItems } from "../../constants/navDropdownItems";

const MobileNav: React.FC = () => {
  const { isLoggedIn, handleLogout, activeUser } = useAuth();

  const dropdownItems = getDropdownItems(activeUser, handleLogout);

  return (
    <div>
      <a
        className="btn btn-primary bg-transparent border-0 text-light d-lg-none d-flex p-0"
        data-bs-toggle="offcanvas"
        href="#offcanvas"
        role="button"
        aria-controls="offcanvas">
        <i className="bi bi-list fs-3"></i>
      </a>

      <div className="offcanvas offcanvas-start" aria-labelledby="offcanvas" tabIndex={-1} id="offcanvas">
        <div className="offcanvas-header d-flex justify-content-between align-items-center">
          <h5 className="offcanvas-title" id="offcanvasLabel">
            <ul className="nav">
              <li data-bs-dismiss="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                <Link to="/" className="me-4 navbar-brand fs-5 fw-bold navbar-brand">
                  Movies
                </Link>
              </li>
            </ul>
          </h5>

          <button type="button" className="btn" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#fafafa"
              viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
        </div>

        <div className="offcanvas-body d-flex flex-column gap-3 p-3 w-100">
          <hr />
          <ul className="nav nav-pills flex-column flex-fill gap-3">
            <li
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvas"
              aria-controls="offcanvas"
              className="nav-item">
              <NavLink to={`/home`} className={({ isActive }) => `nav-link px-2 ${isActive ? "active" : ""}`}>
                Home
              </NavLink>
            </li>

            <li
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvas"
              aria-controls="offcanvas"
              className="nav-item">
              <NavLink
                to={`/movies/favorites`}
                className={({ isActive }) => `nav-link px-2 ${isActive ? "active" : ""}`}>
                Favorites
              </NavLink>
            </li>

            <li
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvas"
              aria-controls="offcanvas"
              className="nav-item">
              <NavLink
                to={`/movies/watchlist`}
                className={({ isActive }) => `nav-link px-2 ${isActive ? "active" : ""}`}>
                Watchlist
              </NavLink>
            </li>
          </ul>

          <hr />

          {!isLoggedIn ? (
            <div>
              <ul className="d-lg-none d-flex gap-3 list-unstyled">
                <li data-bs-dismiss="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                  <Link to="/register" role="button" className="btn btn-sm btn-secondary">
                    Register
                  </Link>
                </li>
                <li data-bs-dismiss="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                  <Link to="/login" role="button" className="btn btn-sm btn-primary">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-between">
              <Dropdown items={dropdownItems} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

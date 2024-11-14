import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import MobileNav from "./mobileNav";
import Dropdown from "./dropdown";
import Search from "../shared/search";
import { useCallback, useState } from "react";
import httpClient from "../../axios";
import debounce from "lodash/debounce";
import { Movie } from "../shared/types";
import SearchedMovies from "../movies/SearchedMovies";

const Header: React.FC = () => {
  const { isLoggedIn, handleLogout, activeUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchQueryChange = useCallback(
    debounce(async (query: string) => {
      setSearchQuery(query);

      if (query) {
        try {
          const response = await httpClient.get(`/search`, { params: { query } });
          setSearchedMovies(response.data.results);
          setShowSearchResults(true);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setShowSearchResults(false);
        setSearchedMovies([]);
      }
    }, 600),
    []
  );

  const dropdownItems = [
    { label: "AdminPage", href: "/adminPage", visible: activeUser?.role === "admin" },
    { label: "Sign out", onClick: handleLogout },
  ];

  return (
    <header className="p-3 position-relative">
      <div className="container d-flex flex-column flex-lg-row align-items-center gap-3">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex gap-4 align-items-center">
            <NavLink to="/" className="me-4 navbar-brand fs-5 fw-bold">
              Movies
            </NavLink>
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

          <div className="gap-3 d-none d-lg-flex align-items-center">
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
              <Dropdown items={dropdownItems} />
            )}
          </div>
        </div>

        <div className="d-block mobile-search">
          <Search onSearchQueryChange={handleSearchQueryChange} />

          {searchQuery && searchedMovies.length > 0 && (
            <SearchedMovies
              show={showSearchResults}
              movies={searchedMovies}
              onClose={() => {
                setShowSearchResults(false);
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

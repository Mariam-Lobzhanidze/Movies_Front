import React from "react";
import { Movie } from "../shared/types";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/trunctate";
import { scrollToTop } from "../../utils/scrollToTop";

interface SearchedMoviesProps {
  show: boolean;
  movies: Movie[];
  onClose: () => void;
}

const SearchedMovies: React.FC<SearchedMoviesProps> = ({ movies, show, onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = (movieId: string | undefined) => {
    onClose();
    navigate(`/movies/trailer/${movieId}`);
    scrollToTop();
  };

  return (
    <div className={`dropdown-menu search-dropdown ${show ? "show" : ""}`}>
      {movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div key={movie.id} onClick={() => handleLinkClick(movie.id)} className="dropdown-item">
            <div className="img-wrapper">
              <div className="img placeholder placeholder-wave bg-secondary w-100 h-100 rounded"></div>

              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="img"
                onLoad={(e) => {
                  (e.target as HTMLImageElement).previousElementSibling!.classList.add("d-none");
                }}
              />
            </div>
            <span className="ms-2">{truncateText(movie.title, 20)}</span>
          </div>
        ))}
    </div>
  );
};

export default SearchedMovies;

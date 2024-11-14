import React from "react";
import { Movie } from "../shared/types";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/trunctate";

interface SearchedMoviesProps {
  show: boolean;
  movies: Movie[];
  onClose: () => void;
}

const SearchedMovies: React.FC<SearchedMoviesProps> = ({ movies, show, onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = (movieId: number | undefined) => {
    onClose();
    navigate(`/movies/trailer/${movieId}`);
  };

  return (
    <div className={`dropdown-menu search-dropdown ${show ? "show" : ""}`}>
      {movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div key={movie.id} onClick={() => handleLinkClick(movie.id)} className="dropdown-item">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                  : "https://via.placeholder.com/60x85?text=No+Image"
              }
              alt={movie.title}
              className="img"
            />
            <span className="ms-2">{truncateText(movie.title, 20)}</span>
          </div>
        ))}
    </div>
  );
};

export default SearchedMovies;

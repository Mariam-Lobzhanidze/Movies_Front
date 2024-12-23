import { useNavigate } from "react-router-dom";
import { Movie } from "./types";
import { truncateText } from "../../utils/trunctate";
import Rating from "./rating";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";

import {
  addFavorite,
  addToWatchlist,
  removeFavorite,
  removeFromWatchlist,
} from "../../services/movieService";
import { scrollToTop } from "../../utils/scrollToTop";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_BASE_URL;
  const { title, poster_path, vote_average } = movie;

  const navigate = useNavigate();
  const { activeUser, updateActiveUser } = useAuth();

  const [isFavorited, setIsFavorited] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);

  useEffect(() => {
    if (activeUser) {
      setIsFavorited(activeUser.favorites.some((item) => item.id === movie.id));
      setIsInWatchList(activeUser.watchlist.some((item) => item.id === movie.id));
    }
  }, [activeUser, movie.id]);

  const handleCardClick = () => {
    navigate(`/movies/trailer/${movie.id}`);
    scrollToTop();
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeUser || movie.id === undefined) {
      return;
    }

    try {
      let updatedFavorites: Movie[];

      if (isFavorited) {
        await removeFavorite(activeUser.id, movie.id);
        updatedFavorites = activeUser.favorites.filter((item) => item.id !== movie.id);
      } else {
        await addFavorite(activeUser.id, movie.id);
        updatedFavorites = [...activeUser.favorites, movie];
      }

      updateActiveUser({ favorites: updatedFavorites });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const toggleWatchlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeUser || movie.id === undefined) {
      return;
    }

    try {
      let updatedWatchlist: Movie[];

      if (isInWatchList) {
        await removeFromWatchlist(activeUser.id, movie.id);
        updatedWatchlist = activeUser.watchlist.filter((item) => item.id !== movie.id);
      } else {
        await addToWatchlist(activeUser.id, movie.id);
        updatedWatchlist = [...activeUser.watchlist, movie];
      }

      updateActiveUser({ watchlist: updatedWatchlist });
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  return (
    <div className="movie" onClick={handleCardClick} key={movie.id}>
      <div>
        <div className="poster-container">
          <div
            className="blur-load"
            style={{
              backgroundImage: `url(${IMAGE_BASE_URL}w45${poster_path})`,
              filter: isLoaded ? "none" : "blur(10px)",
            }}>
            <img
              className={`main-image ${isLoaded ? "loaded" : ""}`}
              loading="lazy"
              src={`${IMAGE_BASE_URL}w342${poster_path}`}
              alt={title}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </div>
        <div className="card-title">
          <div className="movie-info">
            <h3>{truncateText(title, 12)}</h3>
            <Rating vote={vote_average} />
          </div>
          {activeUser && (
            <span className="favorite-icon" onClick={toggleFavorite}>
              {isFavorited ? (
                <i className="bi bi-heart-fill" style={{ color: "red" }}></i>
              ) : (
                <i className="bi bi-heart"></i>
              )}
            </span>
          )}
        </div>
      </div>
      {activeUser && (
        <div className="watchlist-btn" onClick={toggleWatchlist}>
          {!isInWatchList ? (
            <button type="button" className="btn btn-dark btn-sm text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#28b6cf"
                viewBox="0 0 256 256">
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM168,136H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path>
              </svg>
              Watchlist
            </button>
          ) : (
            <button type="button" className="btn btn-dark btn-sm text-primary">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#28b6cf"
                viewBox="0 0 256 256">
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM168,136H88a8,8,0,0,1,0-16h80a8,8,0,0,1,0,16Z"></path>
              </svg>{" "}
              Watchlist
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieCard;

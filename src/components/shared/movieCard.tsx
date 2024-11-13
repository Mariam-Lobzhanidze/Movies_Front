import { useNavigate } from "react-router-dom";
import { Movie } from "./types";
import { truncateText } from "../../utils/trunctate";
import CardSkeleton from "./cardSkeleton";
import Rating from "./rating";
import { useAuth } from "../../context/authContext";
import httpClient from "../../axios";
import { useEffect, useState } from "react";

interface MovieCardProps {
  movie: Movie;
  isLoading?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isLoading }) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_BASE_URL;
  const { title, poster_path, vote_average } = movie;

  const navigate = useNavigate();
  const { activeUser, updateActiveUser } = useAuth();

  const [isFavorited, setIsFavorited] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);

  useEffect(() => {
    if (activeUser) {
      if (activeUser?.favorites?.some((item) => item.id === movie.id)) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }

      if (activeUser?.watchlist?.some((item) => item.id === movie.id)) {
        setIsInWatchList(true);
      } else {
        setIsInWatchList(false);
      }
    }
  }, [activeUser, movie.id]);

  const handleCardClick = () => {
    navigate(`/movies/trailer/${movie.id}`);
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeUser) {
      navigate("/login");
      window.scrollTo(0, 0);
    }

    if (!activeUser || !activeUser.favorites) {
      console.error("Active user is not available or does not have a favorites list.");
      return;
    }

    try {
      let updatedFavorites: Movie[];

      if (isFavorited) {
        await httpClient.delete(`/favorites/remove?userId=${activeUser.id}&movieId=${movie.id}`);
        updatedFavorites = activeUser.favorites.filter((item) => item.id !== movie.id);
      } else {
        await httpClient.post("/favorites/add", { userId: activeUser.id, movieId: movie.id });

        if (movie.id === undefined) {
          console.error("Movie ID is undefined.");
          return;
        }

        updatedFavorites = [...activeUser.favorites, movie];
      }

      updateActiveUser({ favorites: updatedFavorites });
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const toggleWatchlist = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!activeUser) {
      navigate("/login");
      window.scrollTo(0, 0);
    }

    if (!activeUser || !activeUser.watchlist) {
      console.error("Active user is not available or does not have a watchlist.");
      return;
    }

    try {
      let updatedWatchlist: Movie[];

      if (isInWatchList) {
        await httpClient.delete(`/watchlist/remove?userId=${activeUser.id}&movieId=${movie.id}`);
        updatedWatchlist = activeUser.watchlist.filter((item) => item.id !== movie.id);
      } else {
        await httpClient.post("/watchlist/add", { userId: activeUser.id, movieId: movie.id });

        if (movie.id === undefined) {
          console.error("Movie ID is undefined.");
          return;
        }

        updatedWatchlist = [...activeUser.watchlist, movie];
      }

      updateActiveUser({ watchlist: updatedWatchlist });
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  return (
    <div className="movie" onClick={handleCardClick} key={movie.id}>
      {!isLoading ? (
        <div>
          <div className="poster-container">
            <img src={`${IMAGE_BASE_URL}w500${poster_path}`} alt={title} />
          </div>
          <div className="card-title">
            <div className="movie-info">
              <h3>{truncateText(title, 12)}</h3>
              <Rating vote={vote_average} />
            </div>

            <span className="favorite-icon" onClick={toggleFavorite}>
              {isFavorited ? (
                <i className="bi bi-heart-fill" style={{ color: "red" }}></i>
              ) : (
                <i className="bi bi-heart"></i>
              )}
            </span>
          </div>

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
        </div>
      ) : (
        <CardSkeleton />
      )}
    </div>
  );
};

export default MovieCard;

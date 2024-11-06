import { useNavigate } from "react-router-dom";
import { Movie } from "../shared/types";
import { truncateText } from "../../utils/trunctate";
import CardSkeleton from "../shared/cardSkeleton";
import Rating from "../shared/rating";

interface MovieCardProps {
  movie: Movie;
  isLoading?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isLoading }) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_BASE_URL;
  const { title, poster_path, vote_average, overview } = movie;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movies/trailer/${movie.id}`);
  };

  return (
    <div className="movie" onClick={handleCardClick} key={movie.id}>
      {!isLoading ? (
        <div>
          <div className="poster-container">
            <img src={`${IMAGE_BASE_URL}w500${poster_path}`} alt={title} />
          </div>
          <div className="movie-info">
            <h3>{truncateText(title, 14)}</h3>
            <Rating vote={vote_average} />
          </div>
          <div className="overview">
            <h3>Overview</h3>
            <p>{truncateText(overview as string, 100)}</p>
          </div>
        </div>
      ) : (
        <CardSkeleton />
      )}
    </div>
  );
};

export default MovieCard;

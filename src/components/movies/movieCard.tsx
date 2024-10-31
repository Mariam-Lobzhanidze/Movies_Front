import { Movie } from "../shared/types";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, poster_path, vote_average, overview } = movie;

  const getClassByRate = (vote: number) => {
    if (vote >= 7) return "green";
    else if (vote >= 5) return "orange";
    else return "red";
  };

  return (
    <div className="movie">
      <img src={IMG_PATH + poster_path} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`tag ${getClassByRate(vote_average)}`}>{vote_average}</span>
      </div>
      <div className="overview">
        <h3>Overview</h3>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;

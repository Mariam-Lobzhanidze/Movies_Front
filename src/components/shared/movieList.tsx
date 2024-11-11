import { Movie } from "../shared/types";
import MovieCard from "../shared/movieCard";

interface MovieListProps {
  movies: Movie[];
  isLoading?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, isLoading }) => {
  return (
    <div className="movie-list">
      {movies?.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default MovieList;

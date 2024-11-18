import { Movie } from "../shared/types";
import MovieCard from "../shared/movieCard";
import CardSkeleton from "../shared/cardSkeleton";

interface MovieListProps {
  movies: Movie[];
  isLoading?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, isLoading }) => {
  //

  if (isLoading) {
    return (
      <div className="movie-list">
        {Array.from({ length: 15 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies?.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;

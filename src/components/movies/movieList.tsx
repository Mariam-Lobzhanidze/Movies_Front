import { Movie } from "../shared/types";
import MovieCard from "./movieCard";

interface MovieProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieProps> = ({ movies }) => (
  <main className="movie-list">
    {movies?.map((movie: Movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </main>
);

export default MovieList;

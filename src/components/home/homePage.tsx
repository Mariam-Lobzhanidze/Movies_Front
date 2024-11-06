import MovieList from "../movies/movieList";
import MoviesInTheatre from "../movies/moviesInTheatre";

const Home = () => {
  return (
    <div className="movies">
      <MovieList />
      <MoviesInTheatre />
    </div>
  );
};

export default Home;

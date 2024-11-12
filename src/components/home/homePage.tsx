import MoviesInTheatre from "../movies/moviesInTheatre";
import PopularMovies from "../movies/popularMovies";
import SignInToAccess from "../movies/SignInToAccess";

const Home = () => {
  return (
    <div className="home">
      <PopularMovies />
      <MoviesInTheatre />
      <SignInToAccess title="From your Watchlist" />
    </div>
  );
};

export default Home;

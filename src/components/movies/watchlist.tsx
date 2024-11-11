import { useEffect, useState } from "react";
import { Movie } from "../shared/types";
import SectionTitle from "../shared/sectionTitle";
import MovieList from "../shared/movieList";
import { useAuth } from "../../context/authContext";

const Watchlist: React.FC = () => {
  const { activeUser } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (activeUser) {
      setMovies(activeUser?.watchlist || []);
    }
  }, [activeUser]);

  return (
    <div className="watchlist">
      <div className="section-header">
        <SectionTitle title="Watchlist" count={movies?.length} />
      </div>
      <MovieList movies={movies} />
    </div>
  );
};

export default Watchlist;

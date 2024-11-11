import { useEffect, useState } from "react";
import { Movie } from "../shared/types";
import SectionTitle from "../shared/sectionTitle";
import MovieList from "../shared/movieList";
import { useAuth } from "../../context/authContext";

const FavoriteMovies: React.FC = () => {
  const { activeUser } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (activeUser) {
      setMovies(activeUser?.favorites || []);
    }
  }, [activeUser]);

  return (
    <div className="favorites">
      <div className="section-header">
        <SectionTitle title="Favorite movies" count={movies?.length} />
      </div>
      <MovieList movies={movies} />
    </div>
  );
};

export default FavoriteMovies;

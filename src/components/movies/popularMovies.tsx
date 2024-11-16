import { useEffect, useState } from "react";
import { Movie } from "../shared/types";
import { useSearchParams } from "react-router-dom";
import SectionTitle from "../shared/sectionTitle";
import MovieList from "../shared/movieList";
import { getPopularMovies } from "../../services/movieService";
import { scrollToTop } from "../../utils/scrollToTop";

const PopularMovies: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    getMovies();
  }, [currentPage]);

  const getMovies = async () => {
    setIsLoading(true);
    try {
      const movieData = await getPopularMovies(currentPage);
      setMovies(movieData);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  const onPageChange = () => {
    scrollToTop();
    setSearchParams({ page: (currentPage + 1).toString() });
  };

  return (
    <div className="popular-movies section">
      <SectionTitle title="Popular Movies" count={movies.length || null} />
      <MovieList movies={movies} isLoading={isLoading} />
      <div className="load-more">
        <a className="load-more-link" onClick={onPageChange}>
          more{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PopularMovies;

import { useEffect, useState } from "react";
import httpClient from "../../axios";
import { Movie } from "../shared/types";
import { useSearchParams } from "react-router-dom";
import SectionTitle from "../shared/sectionTitle";
import MovieList from "../shared/movieList";

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
      const response = await httpClient.get(`/popular?page=${currentPage}`);

      const { results } = response.data;

      const movieData = results.map((movie: Movie) => ({
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        overview: movie.overview,
        vote_average: movie.vote_average,
      }));

      setMovies(movieData);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  const onPageChange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchParams({ page: (currentPage + 1).toString() });
  };

  return (
    <div className="popular-movies section">
      <SectionTitle title="Popular Movies" count={movies.length} />
      <MovieList movies={movies} isLoading={isLoading} />
      <a className="action-btn">
        <p className="more" onClick={onPageChange}>
          more{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </p>
      </a>
    </div>
  );
};

export default PopularMovies;

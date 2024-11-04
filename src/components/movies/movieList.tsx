import { useEffect, useState } from "react";
import httpClient from "../../axios";
import { Movie } from "../shared/types";
import MovieCard from "./movieCard";

const MovieList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="section">
      <div className="section-header">
        <h3 className="title">Popular Movies</h3>
        <p className="more" onClick={onPageChange}>
          more{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </p>
      </div>

      <div className="movie-list">
        {movies?.map((movie: Movie) => (
          <MovieCard movie={movie} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;

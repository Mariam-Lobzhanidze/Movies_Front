/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import MovieList from "./movieList";

const Movies: React.FC = () => {
  const url = import.meta.env.VITE_APP_MOVIES_API_URL;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(url);
  }, []);

  const getMovies = async (url: string) => {
    try {
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log("Full Response:", res);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="movies">
      <MovieList movies={movies} />
    </div>
  );
};

export default Movies;

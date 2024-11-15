import { useEffect, useState } from "react";
import { GalleryImage, Movie } from "../shared/types";
import ImageGalleryComponent from "../shared/imageGallery";
import { getTheatreMovies } from "../../services/movieService";

const MoviesInTheatre: React.FC = () => {
  const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_BASE_URL;
  const [moviesInTheatre, setMoviesInTheatre] = useState<GalleryImage[]>([]);

  useEffect(() => {
    getMoviesInTheatre();
  }, []);

  const getMoviesInTheatre = async () => {
    const movies = await getTheatreMovies();

    const modified = movies.map((movie: Partial<Movie>) => ({
      original: `${IMAGE_BASE_URL}original${movie.poster_path}`,
      thumbnail: `${IMAGE_BASE_URL}w300${movie.poster_path}`,
      originalHeight: 400,
    }));
    setMoviesInTheatre(modified);
  };

  return (
    <div className="movies-in-theatre section">
      <ImageGalleryComponent title="In theatre" images={moviesInTheatre} thumbnail={true} />
    </div>
  );
};

export default MoviesInTheatre;

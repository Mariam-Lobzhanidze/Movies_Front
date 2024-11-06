import { useEffect, useState } from "react";
import httpClient from "../../axios";
import { GalleryImage } from "../shared/types";
import ImageGalleryComponent from "../shared/imageGallery";

const MoviesInTheatre: React.FC = () => {
  const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_BASE_URL;
  const [moviesInTheatre, setMoviesInTheatre] = useState<GalleryImage[]>([]);

  useEffect(() => {
    getMoviesInTheatre();
  }, []);

  const getMoviesInTheatre = async () => {
    const response = await httpClient.get("/theatre");

    const modified = response.data.results.map((movie: { backdrop_path: string }) => ({
      original: `${IMAGE_BASE_URL}original${movie.backdrop_path}`,
    }));
    setMoviesInTheatre(modified);
  };

  return (
    <div className="section">
      <ImageGalleryComponent title="In theatre" images={moviesInTheatre} />
      <h3 className="section-header"> {""}</h3>
    </div>
  );
};

export default MoviesInTheatre;

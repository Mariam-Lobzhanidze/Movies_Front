import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import httpClient from "../../../axios";
import { Company, GalleryImage, MovieData } from "../../shared/types";
import Rating from "../../shared/rating";
import TrailerDetailsSkeleton from "../../shared/trailerDetailsSkeleton";
import MovieProductionCompanies from "./productionCompanies";
import ImageGalleryComponent from "../../shared/imageGallery";
import SimilarMovies from "./similarMovies";

const TrailerPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_BASE_URL;
  const { id } = useParams<{ id: string }>();
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  useEffect(() => {
    getMovieData();
  }, [id]);

  const getMovieData = async () => {
    setIsLoading(true);
    try {
      const [detailsResponse, trailerResponse, imagesResponse, similarResponse] = await Promise.all([
        httpClient.get(`/movies/${id}`),
        httpClient.get(`/movies/${id}/trailer`),
        httpClient.get(`/movies/${id}/images`),
        httpClient.get(`/movies/${id}/similar`),
      ]);

      const trailerKey =
        trailerResponse?.data?.results.find((item: { type: string }) => item?.type === "Trailer")?.key ||
        null;

      const companies = detailsResponse.data.production_companies.map((company: Company) => ({
        logo_path: `${IMAGE_BASE_URL}${company.logo_path}`,
        name: company.name,
      }));

      setMovieData({
        details: detailsResponse.data,
        trailerKey,
        images: imagesResponse.data,
        similarMovies: similarResponse.data,
        poster_image: imagesResponse.data[0]?.file_path,
        production_Companies: companies,
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error getting movie data:", error);
    }
  };

  const getMovieGenres = () => {
    return movieData?.details.genres.map((item) => item.name).join(",");
  };

  const getMovieImages = (): GalleryImage[] => {
    return (
      movieData?.images.map((item) => ({
        original: `${IMAGE_BASE_URL}w500${item.file_path}`,
        thumbnail: `${IMAGE_BASE_URL}w300${item.file_path}`,
        originalHeight: 360,
      })) || []
    );
  };

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  if (isLoading) {
    return <TrailerDetailsSkeleton />;
  }

  return (
    <div className="trailer-page">
      <div className="trailer">
        <div className="trailer-video position-relative">
          {movieData?.trailerKey ? (
            <YouTube videoId={movieData?.trailerKey} opts={opts} />
          ) : (
            <p className="no-trailer-available">The trailer is not available</p>
          )}
        </div>

        <div className="trailer-details">
          <div className="trailer-details-header">
            {movieData?.images && movieData.images.length > 0 && (
              <div className="poster-img-container">
                <img src={`${IMAGE_BASE_URL}w300${movieData?.poster_image}`} alt="poster_img" />
              </div>
            )}

            <div className="details-text">
              <h4 className="details-text-title">{movieData?.details?.title}</h4>
              <p className="details-text-genre">{getMovieGenres()}</p>
            </div>
          </div>
          <div className="trailer-details-overview">
            <span className="tagline">{movieData?.details.tagline}</span>
            <p className="overview">{movieData?.details.overview}</p>
            <div className="trailer-details-footer">
              <span className="status">{movieData?.details.status}</span>
              <Rating vote={movieData?.details.vote_average as number} />
            </div>
          </div>
        </div>
      </div>

      <SimilarMovies similarMovies={movieData?.similarMovies || []} />

      <MovieProductionCompanies companies={movieData?.production_Companies} />

      {movieData?.images && movieData.images.length > 0 && (
        <div className="posters-slider">
          <ImageGalleryComponent title="Posters" images={getMovieImages()} thumbnail={false} />
        </div>
      )}
    </div>
  );
};

export default TrailerPage;

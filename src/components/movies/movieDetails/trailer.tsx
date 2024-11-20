import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { Company, GalleryImage, MovieData } from "../../shared/types";
import Rating from "../../shared/rating";
import TrailerDetailsSkeleton from "../../shared/trailerDetailsSkeleton";
import MovieProductionCompanies from "./productionCompanies";
import ImageGalleryComponent from "../../shared/imageGallery";
import SimilarMovies from "./similarMovies";
import {
  addToWatchlist,
  getImages,
  getMovieDetails,
  getMovieTrailer,
  getSimilarMovies,
} from "../../../services/movieService";
import { useAuth } from "../../../context/authContext";

const TrailerPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const IMAGE_BASE_URL = import.meta.env.VITE_APP_IMAGE_BASE_URL;
  const { id } = useParams<{ id: string }>();
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  const { activeUser, updateActiveUser } = useAuth();

  useEffect(() => {
    getMovieData();
  }, [id]);

  const addMovieToWatchlist = async () => {
    if (activeUser && id && movieData) {
      if (!activeUser.watchlist.some((item) => item.id === id)) {
        await addToWatchlist(activeUser.id, id);
        const movie = {
          id: id,
          title: movieData.details.title,
          overview: movieData.details.overview,
          poster_path: movieData.images[0].file_path,
          vote_average: movieData.details.vote_average,
        };
        updateActiveUser({ watchlist: [...activeUser.watchlist, movie] });
      }
    }
  };

  const getMovieData = async () => {
    setIsLoading(true);

    try {
      if (id) {
        const [detailsResponse, trailerKey, imagesResponse, similarResponse] = await Promise.all([
          getMovieDetails(id),
          getMovieTrailer(id),
          getImages(id),
          getSimilarMovies(id),
        ]);

        const companies = detailsResponse?.production_companies?.map((company: Company) => ({
          logo_path: `${IMAGE_BASE_URL}${company.logo_path}`,
          name: company.name,
        }));

        setMovieData({
          details: detailsResponse,
          trailerKey,
          images: imagesResponse,
          similarMovies: similarResponse,
          poster_image: imagesResponse[0]?.file_path,
          production_Companies: companies,
        });
      }
    } catch (error) {
      console.error("Error getting movie data:", error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="trailer-page">
      {isLoading ? (
        <TrailerDetailsSkeleton />
      ) : (
        <div className="trailer">
          <div className="trailer-video position-relative">
            {movieData?.trailerKey ? (
              <YouTube videoId={movieData?.trailerKey} opts={opts} />
            ) : (
              <p className="no-results-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#ffffff"
                  viewBox="0 0 256 256">
                  <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
                </svg>
                No trailer found
              </p>
            )}
          </div>

          {movieData?.details ? (
            <div className="trailer-details">
              <div className="trailer-details-header">
                {movieData?.images && movieData.images.length > 0 && (
                  <div className="poster-img-container">
                    <img src={`${IMAGE_BASE_URL}w300${movieData?.poster_image}`} alt="poster_img" />
                  </div>
                )}

                <div className="details-text ">
                  <h4 className="details-text-title">{movieData?.details?.title}</h4>
                  <p className="details-text-genre">{getMovieGenres()}</p>
                  {!activeUser?.watchlist.some((item) => item.id === id) ? (
                    <div className="watchlist-btn m-0 mt-3" onClick={addMovieToWatchlist}>
                      <button type="button" className="btn btn-dark btn-sm text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#28b6cf"
                          viewBox="0 0 256 256">
                          <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM168,136H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path>
                        </svg>
                        Watchlist
                      </button>
                    </div>
                  ) : (
                    <p className="mt-3 text-primary">Added to whatchlist</p>
                  )}
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
          ) : (
            <p></p>
          )}
        </div>
      )}

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

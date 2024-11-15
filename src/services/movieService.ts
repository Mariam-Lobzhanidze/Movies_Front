import httpClient from "../axios";
import { Movie } from "../components/shared/types";

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await httpClient.get(`/search`, { params: { query } });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export const getPopularMovies = async (page: number): Promise<Movie[]> => {
  try {
    const response = await httpClient.get(`/popular?page=${page}`);
    const { results } = response.data;

    return results.map((movie: Movie) => ({
      id: movie.id,
      poster_path: movie.poster_path,
      title: movie.title,
      overview: movie.overview,
      vote_average: movie.vote_average,
    }));
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (id: string) => {
  const response = await httpClient.get(`/movies/${id}`);
  return response.data;
};

export const getMovieTrailer = async (id: string) => {
  const response = await httpClient.get(`/movies/${id}/trailer`);
  const trailerKey =
    response?.data?.results.find((item: { type: string }) => item?.type === "Trailer")?.key || null;
  return trailerKey;
};

export const getImages = async (id: string) => {
  const response = await httpClient.get(`/movies/${id}/images`);
  return response.data;
};

export const getSimilarMovies = async (id: string) => {
  const response = await httpClient.get(`/movies/${id}/similar`);
  return response.data;
};

export const getTheatreMovies = async (): Promise<Movie[]> => {
  try {
    const response = await httpClient.get("/theatre");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies in theatre:", error);
    throw error;
  }
};

export const addFavorite = async (userId: string, movieId: string): Promise<void> => {
  try {
    await httpClient.post("/favorites/add", { userId, movieId });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

export const removeFavorite = async (userId: string, movieId: string): Promise<void> => {
  try {
    await httpClient.delete(`/favorites/remove?userId=${userId}&movieId=${movieId}`);
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

export const addToWatchlist = async (userId: string, movieId: string): Promise<void> => {
  try {
    await httpClient.post("/watchlist/add", { userId, movieId });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

export const removeFromWatchlist = async (userId: string, movieId: string): Promise<void> => {
  try {
    await httpClient.delete(`/watchlist/remove?userId=${userId}&movieId=${movieId}`);
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

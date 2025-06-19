export interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "admin" | "user";
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  status: "active" | "blocked";
  profile_image_url?: string | null;
  favorites: Movie[];
  watchlist: Movie[];
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface UsersData {
  users: User[];
  limit: number;
  page: number;
  totalUsers: number;
}

// movie interface section
export interface Movie {
  id: string | number;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  title: string;
  vote_average: number;
  vote_count?: number;
  video?: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  originalTitle: string;
  tagline: string;
  overview: string;
  releaseDate: string;
  status: string;

  posterPath: string | null;
  backdropPath: string | null;

  budget: number;
  revenue: number;

  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];

  genres: Genre[];
  originalLanguage: string;
  spokenLanguages: SpokenLanguage[];

  popularity: number;
  vote_average: number;
  vote_count: number;

  imdb_Id: string | null;
  homepage: string | null;

  runtime: number;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logoPath: string | null;
  originCountry: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  englishName: string;
  iso_639_1: string;
  name: string;
}

//image interfaces
export interface ImageDetails {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface MovieImages {
  id?: number;
  backdrops?: ImageDetails[];
  logos?: ImageDetails[];
  posters: ImageDetails[];
}

//similar interfaces

export interface SimilarMovies {
  page: number;
  results: Partial<MovieDetails>[];
  total_Pages: number;
  total_Results: number;
}

//review interfaces
export interface Author {
  name: string;
  avatar_path: string;
  rating: number;
  username: string;
}
export interface Review {
  author: string;
  author_details: Author[];
  content: string;
  createdAt: string;
  id: string;
  updated_at: string;
  url: string;
}
export interface MovieReviews {
  id: number;
  page: number;
  results: Review[];
}

//trailer interface
interface Trailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
export interface Trailers {
  id: number;
  results: Trailer[];
}

export interface MovieData {
  details: MovieDetails;
  trailerKey: string | null;
  images: ImageDetails[];
  similarMovies: Movie[];
  reviews?: MovieReviews;

  poster_image?: string;
  tagline?: string;
  production_Companies?: Company[];
}

export interface Company {
  logo_path?: string;
  name: string;
  id?: number;
  origin_country?: string;
}

export interface GalleryImage {
  original: string;
  thumbnail?: string;
  originalHeight?: number;
  originalTitle?: string;
}

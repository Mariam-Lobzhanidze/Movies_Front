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

export interface Movie {
  id?: number;
  overview?: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

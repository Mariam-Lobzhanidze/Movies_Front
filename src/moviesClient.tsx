import axios from "axios";

const moviesClient = axios.create({
  baseURL: import.meta.env.VITE_APP_MOVIES_API_URL,
});

export default moviesClient;

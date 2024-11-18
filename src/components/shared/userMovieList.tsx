// import { useEffect, useState } from "react";
// import { Movie } from "../shared/types";
// import SectionTitle from "../shared/sectionTitle";
// import MovieList from "../shared/movieList";
// import { useAuth } from "../../context/authContext";

// interface UserMovieListProps {
//   listType: "watchlist" | "favorites";
//   title: string;
// }

// const UserMovieList: React.FC<UserMovieListProps> = ({ listType, title }) => {
//   const { activeUser } = useAuth();
//   const [movies, setMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     if (activeUser) {
//       const list = listType === "watchlist" ? activeUser.watchlist : activeUser.favorites;
//       setMovies(list || []);
//     }
//   }, [activeUser, listType]);

//   const noResultsMessage = listType === "watchlist" ? "No movies in your watchlist" : "No favorite movies";

//   return (
//     <div className={listType}>
//       <div className="section-header">
//         <SectionTitle title={title} count={movies?.length} />
//       </div>
//       {movies.length > 0 ? (
//         <MovieList movies={movies} />
//       ) : (
//         <p className="no-results-message">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256">
//             <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
//           </svg>
//           {noResultsMessage}
//         </p>
//       )}
//     </div>
//   );
// };

// export default UserMovieList;
import { useEffect, useState } from "react";
import { Movie } from "../shared/types";
import SectionTitle from "../shared/sectionTitle";
import MovieList from "../shared/movieList";
import { useAuth } from "../../context/authContext";

interface UserMovieListProps {
  listType: "watchlist" | "favorites";
  title: string;
}

const UserMovieList: React.FC<UserMovieListProps> = ({ listType, title }) => {
  const { activeUser } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeUser) {
      setIsLoading(true);
      const list = listType === "watchlist" ? activeUser.watchlist : activeUser.favorites;
      setMovies(list || []);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [activeUser, listType]);

  const noResultsMessage = listType === "watchlist" ? "No movies in your watchlist" : "No favorite movies";

  return (
    <div className={listType}>
      <div className="section-header">
        <SectionTitle title={title} count={movies?.length} />
      </div>
      {!movies.length && (
        <p className="no-results-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256">
            <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
          </svg>
          {noResultsMessage}
        </p>
      )}

      <MovieList movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default UserMovieList;
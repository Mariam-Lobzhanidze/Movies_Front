import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import SectionTitle from "../shared/sectionTitle";
import { useEffect, useState } from "react";
import { Movie } from "../shared/types";
import SwiperSlider from "../shared/slider";

interface SignInToAccessProps {
  title: string;
}

const SignInToAccess: React.FC<SignInToAccessProps> = ({ title }) => {
  const { activeUser } = useAuth();

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (activeUser) {
      setMovies(activeUser?.watchlist || []);
    }
  }, [activeUser]);

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
    window.scrollTo(0, 0);
  };

  if (activeUser?.id && movies.length > 0) {
    return (
      <div className="section">
        <SectionTitle title={title} count={movies.length} />
        <SwiperSlider cardView={true} items={movies} slidesPerView={5} />
      </div>
    );
  }

  if (activeUser?.id && !movies.length) {
    return (
      <div className="sign-in-to-access section ">
        <SectionTitle title={title} />
        <div className="sign-in-to-access-info ">
          <p className="sign-in-to-access-info-text m-0 d-flex gap-2 align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#ffffff"
              viewBox="0 0 256 256">
              <path d="M198.24,62.63l15.68-17.25a8,8,0,0,0-11.84-10.76L186.4,51.86A95.95,95.95,0,0,0,57.76,193.37L42.08,210.62a8,8,0,1,0,11.84,10.76L69.6,204.14A95.95,95.95,0,0,0,198.24,62.63ZM48,128A80,80,0,0,1,175.6,63.75l-107,117.73A79.63,79.63,0,0,1,48,128Zm80,80a79.55,79.55,0,0,1-47.6-15.75l107-117.73A79.95,79.95,0,0,1,128,208Z"></path>
            </svg>
            Watchlist is empty
          </p>
          <span className="text-primary">Save movies to watch later</span>
        </div>
      </div>
    );
  }

  return (
    <div className="sign-in-to-access section">
      <SectionTitle title={title} />
      <div className="sign-in-to-access-info">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M36 3H12C9.79086 3 8 4.79086 8 7V42L24 33L40 42V7C40 4.79086 38.2091 3 36 3Z"
            fill="#333"
          />
          <path d="M24 13.5V22.5M19.5 18H28.5" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </svg>

        <p className="sign-in-to-access-info-text">
          Sign in to access your Watchlist.
          <br />
          Save movies to keep track of what you want to watch.
        </p>

        <button className="btn btn-dark btn-sm text-primary" onClick={handleSignInClick}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignInToAccess;

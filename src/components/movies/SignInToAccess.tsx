/* eslint-disable @typescript-eslint/no-unused-vars */
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

  if (activeUser?.id) {
    return (
      <div className="section">
        <SectionTitle title={title} count={movies.length} />
        <SwiperSlider cardView={true} items={movies} slidesPerView={5} />
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

import SectionTitle from "../../shared/sectionTitle";
import SwiperSlider from "../../shared/slider";
import { Movie } from "../../shared/types";

type SimilarMoviesProps = {
  similarMovies: Movie[];
};

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ similarMovies }) => {
  return (
    <div className="section">
      <SectionTitle title="Similar Movies" count={similarMovies?.length} />
      <SwiperSlider cardView={true} items={similarMovies} slidesPerView={5} />
    </div>
  );
};

export default SimilarMovies;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Movie } from "./types";
import MovieCard from "./movieCard";

interface SwiperProps {
  items: Movie[];
  slidesPerView?: number;
  cardView: boolean;
}

const SwiperSlider: React.FC<SwiperProps> = ({ items, slidesPerView = 4, cardView = true }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={slidesPerView}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1100: {
          slidesPerView: slidesPerView,
          spaceBetween: 20,
        },
      }}>
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          {cardView ? (
            <MovieCard movie={item} />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt={item.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;

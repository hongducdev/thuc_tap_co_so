import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import MovieCard from "components/movie/MovieCard";
import useSWR from "swr";

import { fetcher, tmdbAPI } from "apiConfig/config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieList = ({ type = "now_playing" }) => {
   const { data } = useSWR(
      tmdbAPI.getMovieList(type),
      fetcher
   );

   const movies = data?.results || [];

   return (
      <div className="movie-list">
         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            {movies.length > 0 &&
               movies.map((item) => (
                  <SwiperSlide key={item.id}>
                     <MovieCard item={item} />
                  </SwiperSlide>
               ))}
         </Swiper>
      </div>
   );
};

MovieList.propTypes = {
   type: PropTypes.string,
};

function FallbackComponent() {
   return (
      <div className="flex flex-col items-center justify-center h-full">
         <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
         <p className="text-white">Please try again later</p>
      </div>
   );
}

export default withErrorBoundary(MovieList, {
   FallbackComponent,
});

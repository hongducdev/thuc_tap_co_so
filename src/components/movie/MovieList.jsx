import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import MovieCard from "./MovieCard";
import useSWR from "swr";

import { fetcher } from "../../config";

const MovieList = ({ type = "now_playing" }) => {
   const { data } = useSWR(
      `https://api.themoviedb.org/3/movie/${type}?api_key=6557cc874dda0f42183d0f81b2746b3b`,
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

export default MovieList;

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import useSWR from "swr";
import { fetcher } from "../../config";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
   const { data } = useSWR(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=6557cc874dda0f42183d0f81b2746b3b`,
      fetcher
   );

   const movies = data?.results || [];

   return (
      <section className="banner h-[500px] page-container mb-10 overflow-hidden">
         <Swiper grabCursor={'true'} slidesPerView={'auto'}>
            {movies.length > 0 && movies.map((item) => (
               <SwiperSlide key={item.id}>
                  <BannerItem item={item} />
               </SwiperSlide>
            ))}
         </Swiper>
      </section>
   );
};

function BannerItem({ item }) {
   const navigate = useNavigate();
   const { title, poster_path, id } = item;
   return (
      <div className="w-full h-full rounded-lg relative text-white">
         <div className="overlay w-full h-full rounded-lg bg-black absolute opacity-40 inset-0"></div>
         <img
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt=""
            className="w-full h-full object-cover rounded-lg"
         />
         <div className="absolute left-5 bottom-5 w-full">
            <h2 className="font-bold text-3xl mb-5">{title}</h2>
            <div className="flex items-center gap-x-3 mb-5">
               <span className="px-3 py-2 border-white border rounded-md">
                  Action
               </span>
               <span className="px-3 py-2 border-white border rounded-md">
                  Action
               </span>
               <span className="px-3 py-2 border-white border rounded-md">
                  Action
               </span>
            </div>
            <Button
               bgColor="primary"
               children="Watch Now"
               onClick={() => navigate(`/movie/${id}`)}
            />
         </div>
      </div>
   );
}

export default Banner;

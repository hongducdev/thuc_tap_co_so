import React from "react";
import { useParams } from "react-router-dom";

import useSWR from "swr";
import { apiKey, fetcher } from "../../config";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=6557cc874dda0f42183d0f81b2746b3b

const MovieDetailsPage = () => {
   const { movieId } = useParams();

   const { data, error } = useSWR(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
      fetcher
   );
   console.log(
      "🚀 ~ file: MovieDetailsPage.jsx ~ line 13 ~ MovieDetailsPage ~ data",
      data
   );

   if (!data) {
      return null;
   }
   const { backdrop_path, poster_path, title, genres, overview } = data || {};

   return (
      <>
         <div className="w-full h-[600px] relative">
            <div className="overlay w-full h-full bg-black bg-opacity-70 absolute inset-0"></div>
            <div
               className="w-full h-full bg-cover bg-no-repeat bg-center"
               style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
               }}></div>
         </div>
         <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
            <img
               src={`https://image.tmdb.org/t/p/original${poster_path}`}
               alt=""
               className="w-full h-full object-cover bg-center rounded-xl"
            />
         </div>
         <h1 className="text-white text-center text-3xl font-bold mb-10">
            {title}
         </h1>
         {genres.length > 0 && (
            <div className="flex items-center gap-x-5 mb-10 justify-center">
               {genres.map((genre) => (
                  <span
                     className="text-primary px-4 py-3 border border-primary rounded-full"
                     key={genre.id}>
                     {genre.name}
                  </span>
               ))}
            </div>
         )}

         <p className="text-white text-center text-sm leading-relaxed max-w-[800px] mx-auto mb-10">
            {overview}
         </p>
      </>
   );
};

export default MovieDetailsPage;

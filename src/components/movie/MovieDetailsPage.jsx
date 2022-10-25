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
         <MovieCredits />
         <MovieVideo />
      </>
   );
};

function MovieCredits() {
   const { movieId } = useParams();

   const { data, error } = useSWR(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
      fetcher
   );

   const { cast } = data || {};
   if (!data || cast.length <= 0) return null;
   return (
      <div>
         <h2 className="text-center text-2xl mb-10 text-white font-semibold">
            Casts
         </h2>
         <div className="grid grid-cols-4 gap-5 mb-10 max-w-[1000px] mx-auto">
            {cast.slice(0, 4).map((item) => (
               <div className="cast-item" key={item.id}>
                  <img
                     src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                     alt=""
                     className="w-full h-[350px] object-cover rounded-lg"
                  />
                  <h3 className="text-white text-center mt-3 font-semibold">
                     {item.name}
                  </h3>
                  <p className="text-primary text-center">{item.character}</p>
               </div>
            ))}
         </div>
      </div>
   );
}

function MovieVideo() {
   const { movieId } = useParams();

   const { data, error } = useSWR(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
      fetcher
   );

   const { results } = data || {};
   if (!data || results.length <= 0) return null;
   console.log(results);
   return (
      <div>
         <h2 className="text-center text-2xl mb-10 text-white font-semibold">
            Videos
         </h2>
         
      </div>
   );
}

export default MovieDetailsPage;

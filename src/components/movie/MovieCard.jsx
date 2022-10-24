import React from "react";

const MovieCard = ({ item }) => {
   const { title, release_date, vote_average, poster_path } = item;

   return (
      <div className="movie-card rounded-lg p-3 bg-slate-800 bg-opacity-50 select-none">
         <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt=""
            className="w-full h-[250px] object-cover rounded-md mb-5"
         />
         <div className="flex flex-col flex-1">
            <h3 className="text-white text-xl font-bold mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
               {title}
            </h3>
            <div className="flex items-center justify-between text-sm opacity-60 mb-5">
               <span className="">{new Date(release_date).getFullYear()}</span>
               <span className="">{vote_average}</span>
            </div>
            <button className="py-3 px-6 rounded-md bg-primary w-full capitalize mt-auto">
               Watch Now
            </button>
         </div>
      </div>
   );
};

export default MovieCard;

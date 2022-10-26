import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";

const MovieCard = ({ item }) => {
   const { title, release_date, vote_average, poster_path, id } = item;

   const navigate = useNavigate();

   return (
      <div className="movie-card rounded-lg p-3 bg-slate-800 bg-opacity-50 select-none text-white">
         <img
            src={tmdbAPI.imageW500(poster_path)}
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
            <Button
               onClick={() => navigate(`/movie/${id}`)}
               bgColor="primary"
               children={"Watch Now"}
               
            />
         </div>
      </div>
   );
};

export default MovieCard;

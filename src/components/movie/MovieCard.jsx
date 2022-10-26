import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loadingSkeleton/LoadingSkeleton";

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

MovieCard.propTypes = {
   item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
   }),
};

function FallbackComponent() {
   return (
      <div className="flex flex-col items-center justify-center h-full">
         <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
         <p className="text-white">Please try again later</p>
      </div>
   );
}

export default withErrorBoundary(MovieCard, {
   FallbackComponent,
});

export const MovieCardSkeleton = () => {
   return (
      <div className="movie-card rounded-lg p-3 bg-slate-800 bg-opacity-50 select-none text-white">
         <LoadingSkeleton width="100%" height="250px" radius="8px" />
         <div className="flex flex-col flex-1">
            <h3 className="text-white text-xl font-bold my-3 whitespace-nowrap overflow-hidden text-ellipsis">
               <LoadingSkeleton width="100%" height="20px" />
            </h3>
            <div className="flex items-center justify-between text-sm opacity-60 mb-5">
               <LoadingSkeleton width="100%" height="10px" />
            </div>
            <LoadingSkeleton width="100%" height="40px" radius="8px" />
         </div>
      </div>
   );
} 

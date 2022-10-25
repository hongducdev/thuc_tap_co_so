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

   return <div>MovieDetailsPage</div>;
};

export default MovieDetailsPage;

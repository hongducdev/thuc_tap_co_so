import { fetcher, tmdbAPI } from "apiConfig/config";
import MovieCard from "components/movie/MovieCard";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const GenrePage = () => {
  const { genreId } = useParams();

  const { data, error } = useSWR(tmdbAPI.getMovieFromGenre(genreId), fetcher);

  const loading = !data && !error;


  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-3xl font-semibold text-white">
        Thể loại: {tmdbAPI.getGenreName(genreId)}
      </h2>
      {loading ? (
        <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      ) : (
        <div className="">
          <div className="grid grid-cols-2 gap-5 mt-10 md:grid-cols-3 lg:grid-cols-4">
            {data?.results.map((movie) => (
              <MovieCard key={movie.id} item={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenrePage;

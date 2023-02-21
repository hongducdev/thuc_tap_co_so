import { fetcher, tmdbAPI } from "apiConfig/config";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";

const InfoPerson = () => {

  const { personId } = useParams();

  const { data, error, isLoading } = useSWR(
    tmdbAPI.getPersonDetails(personId),
    fetcher
  );
  
  useEffect(() => {
    document.title = `${data?.name} - HDMovie`;
  }, [data]);

  const {
    data: movieCredits,
    error: movieCreditsError,
    isLoading: movieCreditsIsLoading,
  } = useSWR(tmdbAPI.getPersonMovieCredits(personId), fetcher);

  if(error || movieCreditsError) return (
    <div className="flex items-center justify-center w-full h-screen">
      <h1 className="text-2xl font-bold text-white">Đã có lỗi xảy ra!</h1>
    </div>
  )

  console.log(movieCredits);

  return (
    <div className="">
      {isLoading && !error && !movieCreditsError ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex gap-10">
              <div className="">
                <img
                  src={tmdbAPI.imageOriginal(data?.profile_path)}
                  alt={data?.name}
                  className="rounded-lg max-h-[400px] object-cover"
                />
              </div>
              <div className="">
                <h2 className="mb-5 text-4xl font-bold text-white capitalize">
                  {data?.name}
                </h2>
                <p className="text-white">
                  Còn được biết đến với tên:{" "}
                  {data?.also_known_as.map((name, index) => (
                    <span key={index}>{index === 0 ? name : `, ${name}`}</span>
                  ))}
                </p>
                <p className="text-sm text-white">
                  {data?.birthday}
                  {data?.deathday && <span> - {data?.deathday}</span>}
                </p>
                <p className="text-sm text-white">
                  Nơi sinh: {data?.place_of_birth}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="mb-5 text-2xl font-bold text-white">
                Các bộ phim tham gia
              </h2>
              <div className="grid grid-cols-4 gap-5">
                {movieCreditsIsLoading ? (
                  <div>
                    <MovieCardSkeleton />
                    <MovieCardSkeleton />
                    <MovieCardSkeleton />
                    <MovieCardSkeleton />
                  </div>
                ) : (
                  movieCredits?.cast.map((movie) => (
                    <MovieCard key={movie.id} item={movie} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPerson;

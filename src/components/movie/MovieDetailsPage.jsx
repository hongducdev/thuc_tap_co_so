import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import MovieCard from "components/movie/MovieCard";
import Loading from "components/Loading/Loading";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const { data, error, isLoading } = useSWR(
    tmdbAPI.getMovieDetails(movieId),
    fetcher
  );

  useEffect(() => {
    document.title = `${data?.title} - HDMovie`;
  }, [data]);

  console.log(data);

  if (!data) {
    return null;
  }
  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-2xl font-bold text-white">Đang tải dữ liệu...</h1>
      </div>
    );
  }
  const { backdrop_path, title, genres, overview } = data || {};

  return (
    <>
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 w-full h-full bg-black overlay bg-opacity-70"></div>
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imageOriginal(backdrop_path)}
          alt=""
          className="object-cover w-full h-full bg-center rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-3xl font-bold text-center text-white">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.map((genre) => (
            <Link to={`/genre/${genre.id}`}>
              <span
                className="px-4 py-3 border rounded-full text-primary border-primary hover:bg-primary hover:text-white hover:duration-300 hover:ease-in-out"
                key={genre.id}
              >
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      <p className="text-white text-center text-sm leading-relaxed max-w-[800px] mx-auto mb-10">
        {overview}
      </p>
      <div className="">
        {/* năm phát hành */}
        {/* thời lượng */}
        {/* ngôn ngữ */}
        {/* đánh giá */}

        <div className="flex items-center justify-center gap-x-5 my-10">
          <p className="text-white">
            Ngày phát hành: <strong>{data.release_date}</strong>
          </p>
          <p className="text-white">
            Thời lượng: <strong>{data.runtime} phút</strong>
          </p>
          <p className="text-white">
            Ngôn ngữ: <strong>{data.original_language}</strong>
          </p>
          <p className="text-white">
            Đánh giá: <strong>{data.vote_average} ({data.vote_count} người đánh giá)</strong>
          </p>
        </div>
      </div>
      <MovieMeta type={"credits"} />
      <MovieMeta type={"videos"} />
      <MovieMeta type={"similar"} />
    </>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();

  const { data, error, isLoading } = useSWR(
    tmdbAPI.getMovieMeta(movieId, type),
    fetcher
  );

  if (!data) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full">
        <h1 className="text-2xl font-bold text-white">Đã có lỗi xảy ra!</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <h1 className="text-2xl font-bold text-white">Đang tải dữ liệu...</h1>
      </div>
    );
  }

  if (type === "credits") {
    const { cast } = data || {};
    if (!cast || cast.length <= 0) return null;

    return (
      <div>
        <h2 className="mb-10 text-3xl font-semibold text-center text-white">
          Diễn viên
        </h2>
        <Swiper
          grabCursor={"true"}
          spaceBetween={20}
          slidesPerView={5}
          className="max-w-[1200px]"
        >
          {cast.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="select-none cast-item" key={item.id}>
                <img
                  src={
                    tmdbAPI.imageW500(item.profile_path) === null
                      ? "https://via.placeholder.com/500x750"
                      : tmdbAPI.imageW500(item.profile_path)
                  }
                  alt={item.name}
                  className="h-[350px] object-cover rounded-lg"
                />
                <Link to={`/person/${item.id}`}>
                  <h3 className="mt-5 text-xl font-semibold text-center text-white hover:text-gray-300 hover:ease-in-out hover:duration-300">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-center text-primary">{item.character}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else {
    const { results } = data || {};
    if (!results || results.length <= 0) return null;

    if (type === "videos") {
      return (
        <div>
          <h2 className="mb-10 text-3xl font-semibold text-center text-white">
            Videos
          </h2>
          <div className="flex flex-col gap-10">
            {results.slice(0, 5).map((item) => (
              <div key={item.id}>
                <h3 className="mb-10 text-2xl font-semibold text-center text-primary">
                  {item.name} - {item.type}
                </h3>
                <div className="w-full aspect-video">
                  <iframe
                    width="1280"
                    height="720"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-cover w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="mb-10 text-3xl font-semibold text-center text-white">
            Có thể bạn cũng thích
          </h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    }
  }
  return null;
}

export default MovieDetailsPage;

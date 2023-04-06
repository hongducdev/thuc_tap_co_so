import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css/pagination";
import "swiper/css";

import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";
import { Link, useNavigate } from "react-router-dom";

const Banner = () => {
  const { data } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);

  const movies = data?.results || [];

  return (
    <section className="banner h-[500px] page-container mb-10 overflow-hidden">
      <Swiper
        loop={true}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}>
        {movies.length > 0 &&
          movies.map((item) => (
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
  const { title, backdrop_path, id, genre_ids } = item;
  return (
    <div className="relative w-full h-full text-white rounded-lg ">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black"></div>
      <img
        src={
          tmdbAPI.imageOriginal(backdrop_path) === null
            ? "/defaultImage.png"
            : tmdbAPI.imageOriginal(backdrop_path)
        }
        alt={title}
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute w-full left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
        <div className="md:flex items-center mb-5 gap-x-3 hidden">
          {genre_ids.map((id) => (
            <Link
              key={id}
              className="px-3 py-2 border rounded-full text-primary border-primary hover:text-white hover:bg-primary hover:ease-in-out hover:duration-300" to={`/genre/${id}`}>
              {tmdbAPI.getGenreName(id)}
            </Link>
          ))}
        </div>
        <Button
          bgColor="primary"
          children="Xem ngay"
          onClick={() => navigate(`/movie/${id}`)}
        />
      </div>
    </div>
  );
}

export default Banner;

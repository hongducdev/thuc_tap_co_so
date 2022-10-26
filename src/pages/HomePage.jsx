import React from "react";
import MovieList from "components/movie/MovieList";

const HomePage = () => {
   return (
      <>
         <section className="movies-layout page-container text-white pb-20">
            <h2 className="capitalize text-white mb-10 text-2xl font-bold">
               Now playing
            </h2>
            <MovieList type="now_playing" />
         </section>
         <section className="movies-layout page-container text-white pb-20">
            <h2 className="capitalize text-white mb-10 text-2xl font-bold">
               Top Rated
            </h2>
            <MovieList type="top_rated" />
         </section>
         <section className="movies-layout page-container text-white pb-20">
            <h2 className="capitalize text-white mb-10 text-2xl font-bold">
               Trending
            </h2>
            <MovieList type="popular" />
         </section>
      </>
   );
};

export default HomePage;

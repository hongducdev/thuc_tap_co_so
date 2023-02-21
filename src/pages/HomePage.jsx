import React from "react";
import MovieList from "components/movie/MovieList";

const HomePage = () => {
   
   // title
   document.title = "Trang chủ - HDMovie";

   return (
      <>
         <section className="pb-20 text-white movies-layout page-container">
            <h2 className="mb-10 text-2xl font-bold text-white capitalize">
               Đang chiếu
            </h2>
            <MovieList type="now_playing" />
         </section>
         <section className="pb-20 text-white movies-layout page-container">
            <h2 className="mb-10 text-2xl font-bold text-white capitalize">
               Đánh giá hàng đầu
            </h2>
            <MovieList type="top_rated" />
         </section>
         <section className="pb-20 text-white movies-layout page-container">
            <h2 className="mb-10 text-2xl font-bold text-white capitalize">
               Phổ biến
            </h2>
            <MovieList type="popular" />
         </section>
      </>
   );
};

export default HomePage;

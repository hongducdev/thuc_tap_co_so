import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";
import { fetcher, tmdbAPI } from "apiConfig/config";
import useDebounce from "hooks/useDebounce";

const itemsPerPage = 20;

const MoviePage = () => {

   // title
   document.title = "Phim - HDMovie";

   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);

   const [nextPage, setNextPage] = useState(1);
   const [filter, setFilter] = useState("");
   const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
   const filterDebounce = useDebounce(filter, 500);

   const handleFilterChange = (e) => {
      setFilter(e.target.value);
   };

   const { data, error } = useSWR(url, fetcher);

   const loading = !data && !error;

   useEffect(() => {
      if (filterDebounce) {
         setUrl(tmdbAPI.getSearchedMovie(filterDebounce, nextPage));
      } else {
         setUrl(tmdbAPI.getMovieList("popular", nextPage));
      }
   }, [filterDebounce, nextPage]);

   const movies = data?.results || [];

   useEffect(() => {
      if (!data || !data.total_results) return;
      setPageCount(Math.ceil(data.total_results / itemsPerPage));
   }, [data, itemOffset]);

   const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.total_results;
      setItemOffset(newOffset);
      setNextPage(event.selected + 1);
   };

   return (
      <div className="py-10 page-container">
         <div className="flex gap-4 mb-10">
            <div className="flex-1">
               <input
                  type="text"
                  className="w-full p-4 text-white placeholder-white rounded-lg outline-none bg-slate-800 caret-white placeholder-opacity-60"
                  placeholder="Nhập tên phim để tìm kiếm..."
                  onChange={handleFilterChange}
               />
            </div>
            <button className="p-4 text-white rounded-lg bg-primary">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
               </svg>
            </button>
         </div>
         {loading && (
            <div className="grid grid-cols-4 gap-10">
               {Array.from(Array(20)).map((_, index) => (
                  <div key={index}>
                     <MovieCardSkeleton />
                  </div>
               ))}
            </div>
         )}
         <div className="grid grid-cols-4 gap-10">
            {!loading &&
               movies.length > 0 &&
               movies.map((item) => <MovieCard key={item.id} item={item} />)}
         </div>
         <div className="mt-10 text-white">
            <ReactPaginate
               breakLabel="..."
               nextLabel="next >"
               onPageChange={handlePageClick}
               pageRangeDisplayed={5}
               pageCount={pageCount}
               previousLabel="< previous"
               renderOnZeroPageCount={null}
               className="pagination"
            />
         </div>
      </div>
   );
};

export default MoviePage;

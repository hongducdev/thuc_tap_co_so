import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher } from "../config";
import useDebounce from "../hooks/useDebounce";

const PageCount = 5;

const MoviePage = () => {
   const [nextPage, setNextPage] = useState(1);
   const [filter, setFilter] = useState("");
   const [url, setUrl] = useState(
      `https://api.themoviedb.org/3/movie/popular?api_key=6557cc874dda0f42183d0f81b2746b3b&page=${nextPage}`
   );
   const filterDebounce = useDebounce(filter, 500);

   const handleFilterChange = (e) => {
      setFilter(e.target.value);
   };

   const { data, error } = useSWR(url, fetcher);

   const loading = !data && !error;

   useEffect(() => {
      if (filterDebounce) {
         setUrl(
            `https://api.themoviedb.org/3/search/movie?api_key=6557cc874dda0f42183d0f81b2746b3b&query=${filterDebounce}&page=${nextPage}`
         );
      } else {
         setUrl(
            `https://api.themoviedb.org/3/movie/popular?api_key=6557cc874dda0f42183d0f81b2746b3b&page=${nextPage}`
         );
      }
   }, [filterDebounce, nextPage]);

   const movies = data?.results || [];

   const { page, total_pages } = data || {};

   return (
      <div className="py-10 page-container">
         <div className="flex mb-10 gap-4">
            <div className="flex-1">
               <input
                  type="text"
                  className="w-full p-4 bg-slate-800 outline-none caret-white text-white placeholder-white placeholder-opacity-60 rounded-lg"
                  placeholder="Type here to search..."
                  onChange={handleFilterChange}
               />
            </div>
            <button className="p-4 bg-primary text-white rounded-lg">
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
            <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto an"></div>
         )}
         <div className="grid grid-cols-4 gap-10">
            {!loading &&
               movies.length > 0 &&
               movies.map((item) => <MovieCard key={item.id} item={item} />)}
         </div>
         <div className="flex items-center justify-center text-white mt-10 gap-x-5">
            <span className="cursor-pointer" onClick={() => nextPage - 1}>
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
                     d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
               </svg>
            </span>
            {new Array(PageCount).fill(0).map((item, index) => (
               <span 
                  onClick={() => setNextPage(index + 1)}
                  className="cursor-pointer inline-block py-2 px-4 rounded-md bg-white text-slate-900 leading-none"
               >
                  {index + 1}
               </span>
            ))}                                             
            <span className="cursor-pointer" onClick={() => setNextPage(nextPage + 1)}>
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
                     d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
               </svg>
            </span>
         </div>
      </div>
   );
};

export default MoviePage;

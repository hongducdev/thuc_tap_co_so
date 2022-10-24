import MovieList from "./components/movie/MovieList";

// https://api.themoviedb.org/3/movie/now_playing?api_key=6557cc874dda0f42183d0f81b2746b3b

function App() {

   return (
      <div className="App">
         <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
            <span className="text-primary">Home</span>
            <span className="">Movies</span>
         </header>
         <section className="banner h-[500px] page-container mb-10">
            <div className="w-full h-full rounded-lg relative text-white">
               <div className="overlay w-full h-full rounded-lg bg-black absolute opacity-40 inset-0"></div>
               <img
                  src="https://nld.mediacdn.vn/2019/4/3/avengers-endgame-poster-og-social-crop-15542720808371479664269.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded-lg "
               />
               <div className="absolute left-5 bottom-5 w-full">
                  <h2 className="font-bold text-3xl mb-5">Avengers: Endgame</h2>
                  <div className="flex items-center gap-x-3 mb-5">
                     <span className="px-3 py-2 border-white border rounded-md">
                        Action
                     </span>
                     <span className="px-3 py-2 border-white border rounded-md">
                        Action
                     </span>
                     <span className="px-3 py-2 border-white border rounded-md">
                        Action
                     </span>
                  </div>
                  <button className="bg-primary py-3 px-6 rounded-lg text-xl font-semibold">
                     Watch Now
                  </button>
               </div>
            </div>
         </section>
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
      </div>
   );
}

export default App;

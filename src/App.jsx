import Banner from "./components/banner/Banner";
import MovieList from "./components/movie/MovieList";

// https://api.themoviedb.org/3/movie/now_playing?api_key=6557cc874dda0f42183d0f81b2746b3b

function App() {

   return (
      <div className="App">
         <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
            <span className="text-primary">Home</span>
            <span className="">Movies</span>
         </header>
         <Banner />
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

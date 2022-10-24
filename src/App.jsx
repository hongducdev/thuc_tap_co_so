import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import Banner from "./components/banner/Banner";

// https://api.themoviedb.org/3/movie/now_playing?api_key=6557cc874dda0f42183d0f81b2746b3b

function App() {
   return (
      <div className="App">
         <Routes>
            <Route element={<Main />}>
               <Route
                  path="/"
                  element={
                     <>
                        <Banner />
                        <HomePage />
                     </>
                  }></Route>
               <Route path="/movies" element={<MoviePage />}></Route>
            </Route>
         </Routes>
      </div>
   );
}

export default App;

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailsPage = lazy(() => import("./components/movie/MovieDetailsPage"));

function App() {
   return (
      <div className="App">
         <Suspense
            fallback={
               <>
                  <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto an"></div>
               </>
            }>
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
                  <Route
                     path="/movie/:movieId"
                     element={<MovieDetailsPage />}></Route>
               </Route>
            </Routes>
         </Suspense>
      </div>
   );
}

export default App;

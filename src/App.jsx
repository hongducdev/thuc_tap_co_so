import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
import PageNotFound from "components/PageNotFound/PageNotFound";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailsPage = lazy(() =>
  import("./components/movie/MovieDetailsPage")
);
const InfoPerson = lazy(() => import("./pages/InfoPerson"));
const GenrePage = lazy(() => import("./pages/GenrePage"));

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-screen">
            <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
          </div>
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
            <Route path="/person/:personId" element={<InfoPerson />}></Route>
            <Route path="/genre/:genreId" element={<GenrePage />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

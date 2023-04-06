import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { tmdbAPI } from "apiConfig/config";
import MovieCard from "components/movie/MovieCard";
import Button from "components/button/Button";

const GenrePage = () => {
  const { genreIdParam } = useParams();
  const [genreId, setGenreId] = React.useState(genreIdParam || 28);
  const [genreName, setGenreName] = React.useState([]);
  const [genreMovies, setGenreMovies] = React.useState([]);
  const [genreMoviesPage, setGenreMoviesPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(tmdbAPI.getMovieFromGenre(genreId, genreMoviesPage))
      .then((res) => {
        setGenreMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [genreId, genreMoviesPage]);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(tmdbAPI.getGenreList())
      .then((res) => {
        setGenreName(res.data.genres);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  

  return (
    <div className="max-w-[1200px] mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="w-12 h-12 mb-4 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"></div>
        </div>
      ) : (
        <div className="">
          <div className="">
            {genreName.length > 0 &&
              genreName?.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setGenreId(genre.id)}
                  className="px-4 py-2 mb-2 mr-2 text-sm text-white rounded-md text bg-primary">
                  {genre.name}
                </button>
              ))}
          </div>
          <h1 className="py-10 text-2xl font-semibold text-white">
            Thể loại:{" "}
            {genreName.length > 0 &&
              genreName?.find((genre) => genre.id === parseInt(genreId))?.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {genreMovies.map((movie) => (
              <MovieCard key={movie.id} item={movie} />
            ))}
          </div>

          <div className="py-10 text-center">
            <Button
              onClick={() => setGenreMoviesPage(genreMoviesPage + 1)}
              bgColor="primary"
              className="text-white"
              children="Xem thêm"></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenrePage;

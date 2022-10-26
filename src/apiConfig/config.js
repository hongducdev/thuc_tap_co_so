export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const apiKey = "6557cc874dda0f42183d0f81b2746b3b";

const tmdbEndPoint = "https://api.themoviedb.org/3";

export const tmdbAPI = {
   getMovieList: (type, page = 1) => `${tmdbEndPoint}/movie/${type}?api_key=${apiKey}&page=${page}`,
   getMovieDetails: (id) => `${tmdbEndPoint}/movie/${id}?api_key=${apiKey}`,
   getMovieMeta: (id, type) => `${tmdbEndPoint}/movie/${id}/${type}?api_key=${apiKey}`,
   getSearchedMovie: (query, page = 1) => `${tmdbEndPoint}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`,
   imageOriginal: (path) => `https://image.tmdb.org/t/p/original${path}`,
   imageW500: (path) => `https://image.tmdb.org/t/p/w500${path}`,
}
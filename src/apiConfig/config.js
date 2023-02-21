export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const apiKey = "6557cc874dda0f42183d0f81b2746b3b";

const tmdbEndPoint = "https://api.themoviedb.org/3";

export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndPoint}/movie/${type}?api_key=${apiKey}&page=${page}&language=vi-VN`,
  getMovieDetails: (id) =>
    `${tmdbEndPoint}/movie/${id}?api_key=${apiKey}&language=vi-VN`,
  getMovieMeta: (id, type) =>
    `${tmdbEndPoint}/movie/${id}/${type}?api_key=${apiKey}&language=vi-VN`,
  getSearchedMovie: (query, page = 1) =>
    `${tmdbEndPoint}/search/movie?api_key=${apiKey}&query=${query}&page=${page}&language=vi-VN`,
  imageOriginal: (path) => `https://image.tmdb.org/t/p/original${path}`,
  imageW500: (path) => `https://image.tmdb.org/t/p/w500${path}`,
  genreList: (id) =>
    `${tmdbEndPoint}/genre/movie/list?api_key=${apiKey}&language=vi-VN`,
  getGenreName: (id) => {
    const genres = {
      28: "Hành động",
      12: "Phiêu lưu",
      16: "Hoạt hình",
      35: "Hài hước",
      80: "Tội phạm",
      99: "Documentary",
      18: "Tâm lý",
      10751: "Gia đình",
      14: "Phiêu lưu",
      36: "Lịch sử",
      27: "Kinh dị",
      10402: "Âm nhạc",
      9648: "Bí ẩn",
      10749: "Lãng mạn",
      878: "Khoa học viễn tưởng",
      10770: "Phim chiếu rạp",
      53: "Hành động & Phiêu lưu",
      10752: "Chiến tranh",
      37: "Western",
    };
    return genres[id];
  },
  getPersonDetails: (id) =>
    `${tmdbEndPoint}/person/${id}?api_key=${apiKey}&language=vi-VN`,
  getPersonMovieCredits: (id) =>
    `${tmdbEndPoint}/person/${id}/movie_credits?api_key=${apiKey}&language=vi-VN`,
};


const API_KEY = '5c5e160cd65320a5e5b077aa1ba13d2b';

export const requests={
    fetchTrending: `/trending/all/week?api_key=${API_KEY}`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
    fetchPopular: `/movie/popular?api_key=${API_KEY}`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,

}
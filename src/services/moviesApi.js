import axios from 'axios';

const urlApi = 'https://api.themoviedb.org/3';
const keyApi = 'df1472d4e70acf1f1e9fbc910410c747';

const fetchTrendingMovies = () => {
    return axios 
    .get(`${urlApi}/trending/movie/week?api_key=${keyApi}`)
    .then(response => response.data.results);
};

const fetchMoviesWithQuery = (searchQuery) => {
    return axios 
    .get(`${urlApi}/search/movie?api_key=${keyApi}&query=${searchQuery}&language=en-US&page=1&include_adult=false`)
    .then(response => response.data.results);
};

const fetchMovieDetails = (movieId) => {
    return axios 
    .get(`${urlApi}/movie/${movieId}?api_key=${keyApi}&language=en-US`)
    .then(response => response.data);
}

const fetchCreditsDetails = (movieId) => {
    return axios 
    .get(`${urlApi}/movie/${movieId}/credits?api_key=${keyApi}`)
    .then(response => response.data.cast);
}

const fetchReviewFilms = (movieId) => {
    return axios 
    .get(`${urlApi}/movie/${movieId}/review?api_key=${keyApi}&language=en-US&page=1`)
    .then(response => response.data.results);
}

export default {
    fetchTrendingMovies,
    fetchMoviesWithQuery,
    fetchMovieDetails,
    fetchCreditsDetails,
    fetchReviewFilms
}
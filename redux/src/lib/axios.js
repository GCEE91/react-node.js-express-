import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    accept: 'application/json',
  },
});

export const apis = {
  getTopRankMovie: () =>
    instance.get(`top_rated?api_key=${API_KEY}&language=en-US&page=1`),
  getPopularMovie: () =>
    instance.get(`popular?api_key=${API_KEY}&language=en-US&page=1`),
};

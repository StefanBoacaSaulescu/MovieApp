import Axios from 'axios';
import {EndPoints} from './EndPoints';

export default class MainService {
  static getMovies = (recommendation_type) => {
    return new Promise((resolve, reject) => {
      Axios.get(EndPoints.baseURL + EndPoints.movie + recommendation_type, {
        params: {api_key: EndPoints.apiKey},
      })
        .then((response) => {
          resolve(response);
        })
        .catch(function (error) {
          console.log('Eroarea vietii', error);
          reject(error);
        });
    });
  };
  static getMovieDetails = (movieID) => {
    return new Promise((resolve, reject) => {
      Axios.get(EndPoints.baseURL + EndPoints.movie + movieID, {
        params: {api_key: EndPoints.apiKey},
      })
        .then((response) => {
          resolve(response);
        })
        .catch(function (error) {
          console.log('Eroarea vietii', error);
          reject(error);
        });
    });
  };
  static searchMovie = (querry) => {
    console.log(EndPoints.baseURL + EndPoints.search_movie);
    console.log(querry);
    return new Promise((resolve, reject) => {
      Axios.get(EndPoints.baseURL + EndPoints.search_movie, {
        params: {
            api_key: EndPoints.apiKey,
            query:querry},
      })
        .then((response) => {
          resolve(response);
        })
        .catch(function (error) {
          console.log('Eroarea vietii', error);
          reject(error);
        });
    });
  };
}

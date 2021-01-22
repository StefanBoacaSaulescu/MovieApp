import { ADD_MOVIE_TO_FAVORITES, SET_FAVORITE_MOVIES } from "./actionTypes";

export function setFavoriteMovies(payload){
    return {
        type: SET_FAVORITE_MOVIES,
        payload: payload
    }
}

export function addMovieToFavorites(payload){
    return {
        type: ADD_MOVIE_TO_FAVORITES,
        payload: payload
    }
}

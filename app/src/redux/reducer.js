import { SET_FAVORITE_MOVIES} from './actionTypes';
import {globalState} from './globalState';
export function reducer(state = globalState, action) {
  switch (action.type) {
    case SET_FAVORITE_MOVIES:{
    console.log(action);
      return {
        ...state,
        favorite_movies: action.payload,
      };
    }

    default:
      return state;
  }
}

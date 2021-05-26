
import { AnyAction } from 'redux'
import * as actionTypes from "./action-types";
import { API_SETTINGS } from "../constants";
import { handleResponse } from "./utils";
import type {  AppDispatch } from './configure-store-dev';
import { toast } from "react-toastify";
import type {Cat, Vote} from './types';

// Define a type for the slice state
interface CatState {
  catList: Array<Cat>,
   isFetching: boolean,
   hasError: boolean,
}

// Define the initial state using that type
const initialState: CatState = {
  catList: [],
    isFetching: false,
    hasError: false,
}



const addVotesToCats = (cats: Array<Cat>, votes: Array<Vote>) => {
  return cats.map((cat) => {
    let votedCat = votes.find((votee) => votee.image_id === cat.id);
    return {
      ...cat,
      score: votedCat ? votedCat.value : 0,
    };
  });
};

export default function catsReducer(state = initialState, action :AnyAction) {
  switch (action.type) {
    case actionTypes.BEGIN_CATS_API_CALL:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case actionTypes.CATS_API_ERROR:
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case actionTypes.CATS_API_SUCCESS:
      return {
        ...state,
        catList: [...action.cats],
      };
    case actionTypes.VOTES_API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        catList: addVotesToCats(state.catList, action.votes),
      };
    case actionTypes.VOTE_API_SUCCESS:
      return {
        ...state,
        catList: state.catList.map((cat) => {
          return {
            ...cat,
            score:
              action.catScore.image_id === cat.id
                ? action.catScore.value
                : cat.score,
          };
        }),
      };
    case actionTypes.FAVOURITE_API_SUCCESS:
      return {
        ...state,
        catList: state.catList.map((cat) => {
          return {
            ...cat,
            favourite:
              action.favCat.image_id === cat.id
                ? { id: action.favouriteId }
                : cat.favourite,
          };
        }),
      };
    case actionTypes.UNFAVOURITE_API_SUCCESS:
      return {
        ...state,
        catList: state.catList.map((cat) => {
          return {
            ...cat,
            favourite:
              action.favCat.image_id === cat.id ? undefined : cat.favourite,
          };
        }),
      };
    default:
      return state;
  }
}

export const loadCats = () => (dispatch: AppDispatch) => {

  dispatch({ type: actionTypes.BEGIN_CATS_API_CALL });
  return fetch(
    `${API_SETTINGS.baseUrl}${API_SETTINGS.catlistEndpoint}?limit=20&sub_id=${API_SETTINGS.UserId}`,
    {
      headers: {
        "x-api-key": API_SETTINGS.apiKey,
      },
    }
  )
    .then(handleResponse)
    .then((cats) => {
      dispatch({ type: actionTypes.CATS_API_SUCCESS, cats: cats });
      dispatch(loadVotes());
    })
    .catch((error) => {
      dispatch({ type: actionTypes.CATS_API_ERROR });
      throw error;
    });
};

export const loadVotes = () => (dispatch: AppDispatch) => {
  return fetch(`${API_SETTINGS.baseUrl}${API_SETTINGS.voteEndpoint}`, {
    headers: {
      "x-api-key": API_SETTINGS.apiKey,
      sub_id: API_SETTINGS.UserId,
    },
  })
    .then(handleResponse)
    .then((votes) => {
      dispatch({ type: actionTypes.VOTES_API_SUCCESS, votes: votes });
    })
    .catch((error) => {
      dispatch({ type: actionTypes.CATS_API_ERROR });
      throw error;
    });
};

export const voteCat = (id: number, score: number) => (dispatch: AppDispatch) => {
  const catScore = { image_id: id, sub_id: API_SETTINGS.UserId, value: score };

  return fetch(`${API_SETTINGS.baseUrl}${API_SETTINGS.voteEndpoint}`, {
    method: "POST",
    body: JSON.stringify(catScore),
    headers: {
      "x-api-key": API_SETTINGS.apiKey,
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .then(() => {
      dispatch({ type: actionTypes.VOTE_API_SUCCESS, catScore });
      toast.success("vote received");
    })
    .catch((error) => {
      dispatch({ type: actionTypes.CATS_API_ERROR });
      throw error;
    });
};

export const favouriteCat = (id:number) => (dispatch: AppDispatch) => {
  const favCat = { image_id: id, sub_id: API_SETTINGS.UserId };

  return fetch(`${API_SETTINGS.baseUrl}${API_SETTINGS.favouriteEndpoint}`, {
    method: "POST",
    body: JSON.stringify(favCat),
    headers: {
      "x-api-key": API_SETTINGS.apiKey,
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .then((data) => {
      dispatch({
        type: actionTypes.FAVOURITE_API_SUCCESS,
        favCat,
        favouriteId: data.id,
      });
      toast.success("favourite added");
    })
    .catch((error) => {
      dispatch({ type: actionTypes.CATS_API_ERROR });
      toast.error("favourite couldn't be added");
    });
};

export const unFavouriteCat = (id: number, favouriteId: number) => (dispatch: AppDispatch) => {
  const favCat = { image_id: id, sub_id: API_SETTINGS.UserId };

  return fetch(
    `${API_SETTINGS.baseUrl}${API_SETTINGS.favouriteEndpoint}/${favouriteId}`,
    {
      method: "DELETE",
      headers: {
        "x-api-key": API_SETTINGS.apiKey,
      },
    }
  )
    .then(handleResponse)
    .then(() => {
      dispatch({ type: actionTypes.UNFAVOURITE_API_SUCCESS, favCat });
      toast.success("favourite removed");
    })
    .catch((error) => {
      dispatch({ type: actionTypes.CATS_API_ERROR });
      toast.error("favourite couldn't be removed");
    });
};

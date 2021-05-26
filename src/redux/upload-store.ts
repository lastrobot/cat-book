
import { AnyAction } from 'redux'
import type {  AppDispatch } from './configure-store-dev';
import * as actionTypes from "./action-types";
import { API_SETTINGS } from "../constants";
import { handleResponse } from "./utils";


// Define a type for the slice state
interface UploadState {
  isFetching: boolean,
    hasError: boolean,
    errorMessage: string
    isSuccessful: boolean,
}

// Define the initial state using that type
const initialState: UploadState = {
  isFetching: false,
    hasError: false,
    errorMessage: '',
    isSuccessful: false,
}

export default function uploadReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.BEGIN_UPLOAD_API_CALL:
      return {
        ...state,
        isFetching: true,
        errorMessage: "",
      };
    case actionTypes.UPLOAD_API_ERROR:
      return {
        ...state,
        hasError: true,
        isFetching: false,
        errorMessage: action.message,
      };
    case actionTypes.UPLOAD_API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSuccessful: true,
      };
    case actionTypes.UPLOAD_RESET:
      return initialState;
    default:
      return state;
  }
}

export const resetUpload = () => (dispatch: AppDispatch) => {
  dispatch({ type: actionTypes.UPLOAD_RESET });
};

export const uploadFileApi = (formData:any) => (dispatch: AppDispatch) => {
  dispatch({ type: actionTypes.BEGIN_UPLOAD_API_CALL });

  return fetch(`${API_SETTINGS.baseUrl}${API_SETTINGS.uploadEndpoint}`, {
    method: "POST",
    body: formData,
    headers: {
      "x-api-key": API_SETTINGS.apiKey,
    },
  })
    .then(handleResponse)
    .then(() => {
      dispatch({ type: actionTypes.UPLOAD_API_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: actionTypes.UPLOAD_API_ERROR, message: error.message });
      throw error;
    });
};

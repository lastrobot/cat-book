import initialState from "./initial-state";
import * as actionTypes from "./action-types";
import { API_SETTINGS } from "../constants";
import { handleResponse } from "./utils";

export default function uploadReducer(state = initialState.fileUpload, action) {
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
      return initialState.fileUpload;
    default:
      return state;
  }
}

export const resetUpload = () => (dispatch) => {
  dispatch({ type: actionTypes.UPLOAD_RESET });
};

export const uploadFileApi = (formData) => (dispatch) => {
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

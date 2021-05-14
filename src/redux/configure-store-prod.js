import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import catReducer from "./cat-store";
import uploadReducer from "./upload-store";

const rootReducer = combineReducers({
  cats: catReducer,
  fileUpload: uploadReducer,
});

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

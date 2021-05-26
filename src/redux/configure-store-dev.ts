import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import catReducer from "./cat-store";
import uploadReducer from "./upload-store";

const store = configureStore({
  reducer: {
  cats: catReducer,
  fileUpload: uploadReducer,
  }
})

 export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


// Define a type for the slice state
interface CatState {
  value: number
}

// Define the initial state using that type
const initialState: CatState = {
  value: 0
}

const initialState = {
  cats: {
    catlist: [],
    isFetching: false,
    hasError: false,
  },
  fileUpload: {
    isFetching: false,
    hasError: false,
    errorMessage: "",
    isSuccessful: false,
  },
};

export default initialState;

import {GET_CATEGORY_CONTENT} from "../actions/constants";

const initialState = {
  categories: []
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_CONTENT:
      if (action.payload && action.payload.length)
        return {
          ...state, categories: action.payload
        };
      else return {...initialState}
    default:
      return state;
  }
}

export default categoriesReducer;

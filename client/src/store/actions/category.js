import {GET_CATEGORY_CONTENT} from "./constants";

export const getCategoryContent = (catId) => dispatch => {
  return fetch(`/api/v1/quizzes/all`)
    .then(res => res.json())
    .then(categories => dispatch({type: GET_CATEGORY_CONTENT, payload: categories}))
}

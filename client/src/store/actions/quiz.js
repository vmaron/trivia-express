import {INIT_QUIZ} from "./constants";

export const getNewQuiz = (setId) => dispatch => {
  return fetch(`/api/v1/questions/sequence/${setId}`)
    .then(resp => resp.json())
    .then(res => dispatch({type: INIT_QUIZ, payload: res}))
}

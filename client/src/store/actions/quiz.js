import {INIT_QUIZ} from "./constants";

export const getNewQuiz = (setId) => dispatch => {
  return fetch(`/api/v1/questions/sequence/${setId}`)
    .then(res => res.json())
    .then(sequence => dispatch({type: INIT_QUIZ, payload: sequence}))
}

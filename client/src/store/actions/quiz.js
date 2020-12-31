import {INIT_QUIZ} from "./constants";

export const getNewQuiz = () => dispatch => {
  return fetch('/api/v1/questions/sequence')
    .then(res => res.json())
    .then(sequence => dispatch({type: INIT_QUIZ, payload: sequence}))
}

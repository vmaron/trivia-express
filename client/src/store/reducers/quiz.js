import {INIT_QUIZ, NEXT_QUESTION, PREV_QUESTION, RESET_QUIZ, SUBMIT_QUESTION} from "../actions/constants";

const initialState = {
  questions: [],
  currentQuestion: null,
  id: null,
  name: ''
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload.index < state.questions.length - 1 ? state.questions[action.payload.index + 1] : state.questions[0]
      };
    case PREV_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload.index > 0 ? state.questions[action.payload.index - 1] : state.questions[0]
      };
    case SUBMIT_QUESTION:
      return {
        ...state,
        questions: state.questions.map(q => q.id === action.payload.id ? {
          ...q,
          correct: action.payload.correct,
          incorrect: action.payload.incorrect,
          response: action.payload.response
        } : q)
      };
    case INIT_QUIZ:
      if (action.payload && action.payload.sequence && action.payload.sequence.length)
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name,
          questions: action.payload.sequence.map((x, index) => ({...x, index})),
          currentQuestion: {...action.payload.sequence[0], index: 0, correct: undefined, incorrect: undefined}
        };
      else return {...initialState}
    case RESET_QUIZ:
      return {...initialState};
    default:
      return state;
  }
}

export default quizReducer;

import {INIT_QUIZ, RESET_QUIZ, NEXT_QUESTION} from "../actions/constants";

const initialState = {
  questions: [],
  currentQuestion: null
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_QUESTION:
      const questions = state.questions.map(question => question.id === action.payload.id ? {
        ...question,
        correct: action.payload.correct,
        incorrect: action.payload.correct
      } : question);
      return {
        ...state,
        questions,
        currentQuestion: action.payload.index < state.questions.length - 1 ? questions[action.payload.index + 1] : questions[0]
      };
    case INIT_QUIZ:
      if (action.payload && action.payload.length)
        return {
          ...state,
          questions: action.payload.map((x, index) => ({...x, index})),
          currentQuestion: {...action.payload[0], index: 0, correct: undefined, incorrect: undefined}
        };
      else return {...initialState}
    case RESET_QUIZ:
      return {...initialState};
    default:
      return state;
  }
}

export default quizReducer;

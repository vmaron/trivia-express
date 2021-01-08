import {createSelector} from 'reselect'

const getQuizSelector = state => {
  return state.quiz;
};

const getQuestionsSelector = state => {
  return state.quiz.questions;
};

export const getTotalCorrectSelector = createSelector(
  getQuestionsSelector,
  (questions) => {
    return questions.filter(x => x.correct).length;
  }
)

export const getTotalIncorrectSelector = createSelector(
  getQuestionsSelector,
  (questions) => {
    return questions.filter(x => x.incorrect).length;
  }
)

export const getTotalRemainingSelector = createSelector(
  getQuizSelector,
  (quiz) => {
    return quiz.currentQuestion ? quiz.questions.length - quiz.currentQuestion.index : quiz.questions.length;
  }
)

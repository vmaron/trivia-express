import {createSelector} from 'reselect'

const getQuizSelector = state => {
  return state.quiz;
};

export const getQuestionsSelector = createSelector(
  getQuizSelector,
  (quiz) => {
    return quiz.questions;
  }
)

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
  getQuestionsSelector,
  (questions) => {
    return questions.length - questions.filter(x => x.correct || x.incorrect).length;
  }
)

import { createSelector } from 'reselect'

const getQuestionsSelector = state => state.questions;

const getTotalCorrectSelector = createSelector(
  getQuestionsSelector,
  items => items.filter(x => x.correct).length
)

const getTotalIncorrectSelector = createSelector(
  getQuestionsSelector,
  items => items.filter(x => !x.incorrect).length
)

const getRemainingSelector = createSelector(
  getQuestionsSelector,
  items => state.currentQuestion ? items.length - state.currentQuestion.index : items.length
)



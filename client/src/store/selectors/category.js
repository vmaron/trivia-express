import {createSelector} from 'reselect'

const getCategoriesState = state => {
  return state.categories;
};


export const getCategoriesSelector = createSelector(
  getCategoriesState,
  (state) => {
    return state.categories;
  }
)

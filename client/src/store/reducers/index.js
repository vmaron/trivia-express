import {combineReducers} from 'redux';
import customerReducer from './customer';
import quizReducer from "./quiz";
import categoriesReducer from "./category";

export default combineReducers({
  customers: customerReducer,
  quiz: quizReducer,
  categories: categoriesReducer
})

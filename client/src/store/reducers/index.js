import {combineReducers} from 'redux';
import customerReducer from './customer';
import quizReducer from "./quiz";

export default combineReducers({
  customers: customerReducer,
  quiz: quizReducer
})

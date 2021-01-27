import React, {Component, lazy, Suspense} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import store from './store'
import Spinner from "./components/Common/Spinner/Spinner";
import preset from '@rebass/preset'
import {swiss} from "@theme-ui/presets";
import {ThemeProvider} from "theme-ui";

const theme = {
  ...preset,
  ...swiss,
  colors: {
    ...swiss.colors,
    background: 'rgb(241, 244, 248)',
    headerBkg: 'rgb(76, 86, 106)',
    header: 'white',
    mobileMenuBkg: 'rgb(76, 86, 106)',
  },
  fonts: {
    ...preset.fonts,
    body: '"Nunito", "Helvetica Neue", Helvetica, Arial, sans-serif',
    heading: '"Nunito", "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
}

const FlashCardsLesson = lazy(() => import('./pages/FlashCardsLesson'));
const MultipleChoiceQuiz = lazy(() => import('./pages/MultipleChoiceQuiz'));
const Category = lazy(() => import('./pages/Category'));
const Customers = lazy(() => import('./pages/Customers'));
const ReviewQuestions = lazy(() => import('./pages/ReviewQuestions'));

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Suspense fallback={<Spinner/>}>
              <Route exact path='/' component={Category}/>
              <Route exact path='/multiple-choice-quiz/:id' component={MultipleChoiceQuiz}/>
              <Route exact path='/flash-cards/:id' component={FlashCardsLesson}/>
              <Route exact path='/review/questions/:quizId' component={ReviewQuestions}/>
              <Route exact path='/redux' component={Customers}/>
            </Suspense>
          </Router>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App

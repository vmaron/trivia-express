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
    headerBkg: 'rgb(37, 47, 63)',
    header: 'white',
    mobileMenuBkg: 'rgb(37, 47, 63)',
    ...swiss.colors,
  },
  fonts: {
    ...preset.fonts,
    body: '"Nunito", "Helvetica Neue", Helvetica, Arial, sans-serif',
    heading: '"Nunito", "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
}

const Quiz = lazy(() => import('./pages/Quiz'));
const Customers = lazy(() => import('./pages/Customers'));

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Suspense fallback={<Spinner/>}>
              <Route exact path='/' component={Quiz}/>
              <Route exact path='/redux' component={Customers}/>
            </Suspense>
          </Router>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App

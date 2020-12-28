import React, {Component, lazy, Suspense} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import store from './store'
import Spinner from "./components/Common/Spinner/Spinner";

import preset from '@rebass/preset'
import {ThemeProvider} from 'emotion-theming'
// OR import { ThemeProvider } from 'styled-components'
import {Box, Flex, Link, Text} from 'rebass'
// OR use 'rebass/styled-components'

const theme = {
  ...preset,
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)'
  }
}

const FlashCards = lazy(() => import('./pages/FlashCards'));
const Customers = lazy(() => import('./components/Customer/customers'));


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className="App">

              <Flex
                px={2}
                color='white'
                bg='black'
                alignItems='center'>
                <Text p={2} fontWeight='bold'>Trivia Express</Text>
                <Box mx='auto'/>
                <Link variant='nav' href='/'>Flash Cards</Link>
                <Link variant='nav' href='/redux'>Redux Test</Link>
              </Flex>

              <Suspense fallback={<Spinner/>}>
                <Route exact path='/' component={FlashCards}/>
                <Route exact path='/redux' component={Customers}/>
              </Suspense>

            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App

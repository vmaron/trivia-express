import React, {Component, lazy, Suspense} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Link as RouterLink, Route} from 'react-router-dom';
import './App.css'
import store from './store'
import Spinner from "./components/Common/Spinner/Spinner";
import preset from '@rebass/preset'
import {deep} from "@theme-ui/presets";
import {ThemeProvider} from "theme-ui";
import {Box, Flex, Link as RebassLink, Text} from 'rebass'

const theme = {
  ...preset,
  ...deep,
  fonts: {
    ...preset.fonts,
    body: '"Nunito", "Helvetica Neue", Helvetica, Arial, sans-serif',
    heading: '"Nunito", "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
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
                <RebassLink variant='nav' as={RouterLink} to="/">Flash Cards</RebassLink>
                <RebassLink variant='nav' as={RouterLink} to='/redux'>Redux Test</RebassLink>
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

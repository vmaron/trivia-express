import React, {Component, lazy, Suspense} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import store from './store'
import Spinner from "./components/Common/Spinner/Spinner";
import preset from '@rebass/preset'
import {deep} from "@theme-ui/presets";
import {ThemeProvider} from "theme-ui";
import Navbar from "./components/Common/Navbar/Navbar";

const theme = {
  ...preset,
  ...deep,
  colors: {
    headerBkg: '#1c1e2e',
    header: 'white',
    ...deep.colors,
  },
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
              <Navbar theme={theme}/>

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

import React, {Component, lazy, Suspense} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import store from './store'
import Spinner from "./components/Common/Spinner/Spinner";
import preset from '@rebass/preset'
import {swiss} from "@theme-ui/presets";
import {ThemeProvider} from "theme-ui";
import Navbar from "./components/Common/Nav/Navbar";

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

const FlashCards = lazy(() => import('./pages/FlashCards'));
const Customers = lazy(() => import('./components/Customer/customers'));

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className="layout">
              <Navbar/>
              <div className="layout-body">
                <main className="layout-content">
                  <Suspense fallback={<Spinner/>}>
                    <Route exact path='/' component={FlashCards}/>
                    <Route exact path='/redux' component={Customers}/>
                  </Suspense>
                </main>
                <nav className="layout-nav">
                  Navigation
                </nav>
                <aside className="layout-ads">
                  Advertisements
                </aside>
              </div>
              <footer className="layout-footer">
                <div className="footer">
                  Footer
                </div>
              </footer>
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App

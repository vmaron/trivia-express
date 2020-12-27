import React, {Component, lazy, Suspense} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css'
import store from './store'
import Spinner from "./components/Common/Spinner/Spinner";

const FlashCards = lazy(() => import('./pages/FlashCards'));
const Customers = lazy(() => import('./components/Customer/customers'));


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <div className="App">

              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to='/'>Flash Cards</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/redux'>Redux Test</Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <Suspense fallback={<Spinner/>}>
                <Route exact path='/' component={FlashCards}/>
                <Route exact path='/redux' component={Customers}/>
              </Suspense>

            </div>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App

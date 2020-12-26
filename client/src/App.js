import React, {Component} from 'react'
import {Provider} from 'react-redux'
import './App.css'
import store from './store'
import FlashCards from "./pages/FlashCards";
// import Customers from "./components/Customer/customers";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <FlashCards/>
          {/*<Customers/>*/}
        </div>
      </Provider>
    )
  }
}

export default App

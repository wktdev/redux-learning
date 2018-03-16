import React, { Component } from 'react';
import {createStore} from 'redux';
import combinedReducers from "./reducers"
import Navigation from "./components/Navigation"
import Playbutton from './components/Playbutton';
import {Provider} from "react-redux";





const store = createStore(combinedReducers);


class App extends Component {
  
  render() {
      console.log("STORE: " + store);
    return (
      <Provider store={store}>
          <div className="App">
            <Navigation/>
            <Playbutton/>
          </div>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import combinedReducers from "./reducers"
import Navigation from "./components/Navigation"
import Playbutton from './components/Playbutton';





const store = createStore(combinedReducers);


class App extends Component {
  
  render() {

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

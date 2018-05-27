import React, { Component } from 'react';
import Navigation from "./components/Navigation";
import PlayButton from './components/Playbutton';
import Form from "./components/Form";

import {createStore} from 'redux';
import {Provider} from "react-redux";
import combinedReducers from "./reducers"

// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(combinedReducers);

class App extends Component {
  
  render() {
    console.log(store);
    return (
      <Provider store={store}>
          <div className="App">
            <Navigation/>
          <Form/>
          <PlayButton/>
          </div>
      </Provider>
    );
  }
}

export default App;

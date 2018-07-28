import React, { Component } from 'react';
import Play from './components/Play';
import Stop from './components/Stop';
import StateRender from './components/StateRender';



import {createStore} from 'redux';
import {Provider} from "react-redux";
import combinedReducers from "./reducers"


const store = createStore(combinedReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
class App extends Component {
  
  render() {
    console.log(store);
    return (
      <Provider store={store}>
          <div className="App">
          <Play/>
          <Stop/>
          <hr/>
          <StateRender/>
          </div>
      </Provider>
    );
  }
}

export default App;

import React from 'react';
import PlayButton from './components/Playbutton';
import Form from './components/Form';
import Todo from './components/Todo';
import playToggle from './reducers/playstate_reducer';
import form from './reducers/form_reducer';
import todo from './reducers/todo_reducer';

//______________________________________________BEGIN redux imports 
import {createStore} from 'redux';
import {Provider} from "react-redux";
import {combineReducers} from 'redux';

const combinedReducers = combineReducers({
  playToggle,
  form,
  todo

});


//______________________________________________END redux imports 

const store = createStore(combinedReducers);//__Object store


const App =()=> {
	return (
      <Provider store={store}> 
          <div className="App">
             <PlayButton/>
             <Form/>

     
          <Todo/>
          </div>
      </Provider>              
    );
}

export default App;
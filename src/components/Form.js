import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {createTodoActionCreator} from "../actions/createTodoActionCreator" 
import {useDispatch, useSelector} from "react-redux";

function Form(props){
  const [cacheState,setCacheState] = useState("");
  const [todoListState, setTodoListState] = useState([]);
  const dispatch = useDispatch();
  const list = useSelector(state=> state.form.todos);
  console.log(list)
  function handleChange(event){
      console.log(event.target.value);
      setCacheState(event.target.value)
        console.log(props)
  }

  
  return (
     
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
              let result = [...todoListState, cacheState];
              dispatch(createTodoActionCreator(result))
          }}>

          <input onChange={(e) => {
              handleChange(e)
          }}
            type="text"

          />
          <input type="submit" />
        </form>

        <ul>
        {list.map((val,index)=>{
            return <li key={index}>{val}</li>    
           }) } 
         
          
        </ul>

      </div>
    )
}



export default Form;  // add mapStateToProps

import React, { Component } from "react";
import { connect } from "react-redux";
import {createTodoActionCreator} from "../actions/createTodoActionCreator" 


const mapDispatchToProps = dispatch => {
  return {
    captureFormInput: (e, data) =>{
      e.preventDefault()
      console.log(data);

      dispatch(createTodoActionCreator(data))

    }
  };
};

//_____________________________________________BEGIN get relevant portion of state

const mapStateToProps = state =>({
    todoList:state.captureFormInput.todos
});

//_____________________________________________END get relevant portion of state


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearFormField = this.clearFormField.bind(this);
  }

  handleChange(e) {
    this.setState({
      data: e.target.value
    });
  }

  clearFormField(){
      this.setState({
      data: ""
    });
  }



  render() {

    //_________________________________________________BEGIN loop and get todos

    let todos = this.props.todoList.map((val,index)=>{
            return <li key={index}>{val.todos.todo}</li>    
    }) 

    //_________________________________________________END loop and get todos



    return (
      <div>
        <form onSubmit={(e) => {

        	this.props.captureFormInput(e, this.state.data); 
        	this.clearFormField() 

         }} >
          <input
            type="text"
            value={this.state.data}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>

        {/*__________________________BEGIN display todos */}

        <ul>

          {todos}

        </ul>

        {/*___________________________END display todos */}

      </div>
    );
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Form);  // add mapStateToProps

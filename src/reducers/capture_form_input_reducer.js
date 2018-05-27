const initialState = {
  todos:[]
}

export default function addTodo (state = initialState, action) {
    console.log(action);
    if (action.type === "CREATE_TODO") {

         return Object.assign({}, state, { todos: [...state.todos, { todos: {todo: action.todo}}]}) 
               
    }

    return state
}





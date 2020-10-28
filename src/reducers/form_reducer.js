

const initialState = {
  todos:[{todo:"thing"},{todo:"stuff"}]
}

export default function addTodo (state = initialState, action) {

    if (action.type === "CREATE_TODO") {
console.log(action.todo)
         return Object.assign({}, state, { todos: [...state.todos,  {todo:action.todo}]}); 

         console.log(state)       
    }

    return state
}

// https://www.youtube.com/watch?v=uz3oGaePaSs&ab_channel=DailyWebCoding





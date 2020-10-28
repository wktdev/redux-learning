const initialState = {

	list:[],
}


export default function todoReducer(state = initialState, action){

	if(action.type === "TODO"){
       console.log("WORKED")
       console.log(action.data)
       return Object.create({},state,{list:[...state.list,action.data]})
	   console.log(state.list)
	}

	return state
}


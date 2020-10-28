const state = {

	text:"TEST DATA FROM REDUCER"
}



export default function getInput(initialState = state, action){
   
    if(action.type === "SET_INPUT"){
    	console.log(action.type + " works!");
    	
    	return Object.assign({},state,{text:action.text})
    }


	return state
}


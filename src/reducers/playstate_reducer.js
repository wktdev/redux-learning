

//_________________________BEGIN initial state

const initialState = {
  isPlaying:false
}


//_________________________END initial state


//_________________________BEGIN reducer

export default function playToggle (state = initialState, action) {

    if (action.type === "TOGGLE_PLAY") {
    	 console.log(action);

        // if (state.isPlaying) {
        //     return Object.assign({}, state, { isPlaying: false})
           
        // } else {
        //     return Object.assign({}, state, { isPlaying: true})
        // }
    }

    return state
}

//_________________________END reducer

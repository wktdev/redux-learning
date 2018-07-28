const initialState = {
  isPlaying:false,	
  isStopped:true
}

export default function stopToggle (state = initialState, action) {

    if (action.type === "STOP") {
            console.log(action);
            return Object.assign({}, state, { isPlaying: action.isPlaying, isStopped: action.isStopped})
    }

    return state
}
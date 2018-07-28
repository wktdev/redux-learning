const initialState = {
  isPlaying:false,
  isStopped:true
}

export default function playToggle (state = initialState, action) {
   
    if (action.type === "PLAY") {
            console.log(action);
            return Object.assign({}, state, { isPlaying: action.isPlaying, isStopped: action.isStopped})
           
    }

    return state
}
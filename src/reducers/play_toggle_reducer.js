const initialState = {
  isPlaying:false
}

export default function playToggle (state = initialState, action) {
  console.log(state);
    if (action.type === "TOGGLE_PLAY") {
        if (state.isPlaying) {
            return Object.assign({}, state, { isPlaying: false})
           

        } else {
            return Object.assign({}, state, { isPlaying: true})
        }
    }

    return state
}
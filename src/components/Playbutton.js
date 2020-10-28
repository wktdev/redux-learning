import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { togglePlayActionCreator } from '../actions/togglePlayActionCreator';
// <-- Reference action


function PlayButton(){
     const boolState = useSelector(state => state.playToggle.isPlaying); // gets store data
     const dispatch = useDispatch();

	 return (
      <div>
          <button onClick={() => dispatch({type: "TOGGLE_PLAY", isPlaying: true})}>Click me</button>
          <div>{boolState + " "}</div>
      </div>
    );
}

export default PlayButton


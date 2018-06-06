
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {playAction} from '../actions/playPauseStop'
import {pauseAction} from '../actions/playPauseStop'
import {stopAction} from '../actions/playPauseStop'
import {song} from '../audio';
const mapStateToProps = state =>({
    isPlaying:state.playStopToggle.isPlaying,
    timeStamp:state.playStopToggle.timeStamp
});


const mapDispatchToProps = (dispatch)=>{  // attach all your methods here
    return{
       play:  () => {
       	dispatch(playAction())

       },

        pause:  () => {
        dispatch(pauseAction())

       },

        stop:  () => {
        dispatch(stopAction())

       }
   }
}


class Playbutton extends Component {
	render(){
    console.log(this.props);
		console.log(this.props.timeStamp);
		return(
         <div>
            <div>{this.props.isPlaying + ""}</div>
            <button onClick={this.props.play}>Play</button>
            <button onClick={this.props.stop}>Stop</button>
            <button onClick={this.props.pause}>Pause</button>
         </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Playbutton);


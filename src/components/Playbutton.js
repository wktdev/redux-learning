
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { togglePlayActionCreator } from '../actions/togglePlayActionCreator'

const mapStateToProps = state =>({
    isPlaying:state.playToggle.isPlaying 
});


const mapDispatchToProps = (dispatch)=>{  // attach all your methods here
    return{
       togglePlayAction:  () => dispatch(togglePlayActionCreator())
   }
}


class Playbutton extends Component {
	render(){

		return(
         <div>
            <div>{this.props.isPlaying + ""}</div>
            <button onClick={this.props.togglePlayAction}> CLICK ME </button>
         </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Playbutton);



import React, { Component } from 'react';
import {connect} from 'react-redux';


const mapStateToProps = state =>({
    isPlaying:state.isPlaying
});


const mapDispatchToProps = (dispatch)=>{  // attach all your methods here
    return{
        togglePlay: ()=>{
            const action = {type: "TOGGLE_PLAY", isPlaying: true};
            dispatch(action);  
        }
    }
}


class Playbutton extends Component {
	render(){
        
		return(
         <div>
         
            <button onClick={this.props.togglePlay}> CLICK ME </button>
         </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Playbutton)


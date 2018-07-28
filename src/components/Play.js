
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { playAction } from '../actions/playAction'

const mapStateToProps = state =>({
     isPlaying:state.playReducerData.isPlaying,
     isStopped:state.stopReducerData.isStopped 
});


const mapDispatchToProps = (dispatch)=>{  // attach all your methods here
    return{
       playAction:  function(){
           dispatch(playAction())
       }
   }
}


class Playbutton extends Component {
	render(){
		return(
         <div>
            <button onClick={()=>this.props.playAction()}>PLAY</button>
         </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Playbutton);


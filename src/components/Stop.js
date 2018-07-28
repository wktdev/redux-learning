
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { stopAction } from '../actions/stopAction'

const mapStateToProps = state =>({
     isStopped:state.playReducerData.isStopped,
     isPlaying:state.playReducerData.isPlaying
});



const mapDispatchToProps = (dispatch)=>{  // attach all your methods here
    return{
       stopAction:  function(){
           dispatch(stopAction())
       }
   }
}


class Stopbutton extends Component {
	render(){
    
		return(
         <div>
            <button onClick={()=>this.props.stopAction()}> STOP </button>
         </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Stopbutton);


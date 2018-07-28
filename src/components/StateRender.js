
import React, { Component } from 'react';
import {connect} from 'react-redux';


const mapStateToProps = state =>({
    isPlaying:state.playReducerData.isPlaying,
    isStopped:state.stopReducerData.isStopped
});



class StateRender extends Component {
	render(){
       
		return(
         <div>
           <div> Is playing </div>
           <div>{this.props.isPlaying + ""}</div>
           <hr/>
           <div> Is stopped </div>
           <div>{this.props.isStopped+ ""}</div>
         </div>
		)
	}
}

export default connect(mapStateToProps,null)(StateRender);


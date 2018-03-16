
import React, { Component } from 'react';
import {connect} from 'react-redux';
const mapStateToProps = state =>({
	isPlaying:false
});

const mapDispatchToProps = (dispatch)=>{  // attach all your methods here
    return{
 
    }
}


class Navigation extends Component {
	render(){
        console.log(this.props.isPlaying);
		return(
         <div>

         <p>{this.props.isPlaying}</p>
         
         </div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation)


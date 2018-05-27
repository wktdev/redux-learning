
import React, { Component } from 'react';
import {connect} from 'react-redux';


const mapStateToProps = state =>({
    isPlaying: state.playToggle.isPlaying
});

class Navigation extends Component {
	render(){
            console.log(this.props.isPlaying);
		return(
         <div>

         {/* <p>{this.props.isPlaying + ""}</p> */}

         </div>
		)
	}
}

const mapDispatchToProps = (dispatch)=>{  // attach all your methods here
    return{
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation)


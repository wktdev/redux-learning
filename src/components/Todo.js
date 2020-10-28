import React, {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';

function Todo(){

	const [listState,updateListState] = useState(["one","two","three"]);
	let result = useSelector(state=> state.todo.list);
	let dispatch = useDispatch();
	console.log(result);
	return (
       <div onClick ={()=>{ dispatch({"type":"TODO","data":"some new data"}) }}>
       CLICK ME
       <ul>
       	
	      {result.map((val,index)=>{

	      	return <li key={index}> {val} </li>

	      })}

       </ul>


       </div>


	)
}

export default Todo


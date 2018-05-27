export const createTodoActionCreator = function(todo){
	console.log(todo);
	return {type:"CREATE_TODO", todo:todo};
};
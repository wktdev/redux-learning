export const playAction = function(){
	return {type: "PLAY", isPlaying: true}
};

export const pauseAction = function(){
	return {type: "PAUSE"}
};

export const stopAction = function(){
	return {type: "STOP"}
};



function GameState(){
	//game starts at home unless loaded from cookie
	this.currentRoom = Home; 
}

GameState.prototype.getCurrentRoom = function() {
	return this.currentRoom;
};

GameState.prototype.setCurrentRoom = function(newRoom){
	this.currentRoom = newRoom;
};
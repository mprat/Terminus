function GameState(){
	//game starts at home unless loaded from cookie
	this.currentRoom = Home; 
};

GameState.prototype.getCurrentRoom = function() {
	return this.currentRoom;
};

GameState.prototype.setCurrentRoom = function(newRoom){
	this.currentRoom = newRoom;

	//when you call this function, set the cookie in the browser
	var date = new Date();
	//by default, cookies active for a week
	date.setTime(date.getTime()+(7*24*60*60*1000));
	console.log(document.cookie);
	// console.log("terminuscookie="+this.getState()+"; expires="+date.toGMTString()+"; path=/");
	// document.cookie = "terminuscookie="+this.getState()+"; expires="+date.toGMTString()+"; path=/";
	// console.log(document.cookie);
	// document.cookie="thename=testcookie";
	document.cookie="yourname=" + prompt("What is your name?");
	console.log(document.cookie);
};

GameState.prototype.getState = function(){
	return this.currentRoom.toString();
};
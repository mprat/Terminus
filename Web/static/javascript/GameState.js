function GameState(){
	//game starts at home unless loaded from cookie
	this.currentRoom = Home; 
};

//this function reads from a cookie if one exists
GameState.prototype.getCurrentRoom = function() {
	//by default the new room is just the current room
	var newRoomToSet=this.currentRoom;

	//if there is a cookie, the newRoomToSet is read from the cookie
	var cookieval=this.readCookie();
	if (cookieval){
		//parse the cookie. right now it is only the current room name
		newRoomToSet=window[cookieval];
	}

	//call setCurrentRoom to reset the expiration date on the cookie
	this.setCurrentRoom(newRoomToSet);
	return this.currentRoom;
};

GameState.prototype.setCurrentRoom = function(newRoom){
	this.currentRoom=newRoom;

	//when you call this function, set the cookie in the browser
	var date = new Date();
	//by default, cookies active for a week
	date.setTime(date.getTime()+(7*24*60*60*1000));
	document.cookie = "terminuscookie="+this.getState()+"; expires="+date.toGMTString()+"; path=/";
};

GameState.prototype.getState = function(){
	return this.currentRoom.toString();
};

GameState.prototype.readCookie = function(){
	var nameCookie = "terminuscookie";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameCookie) == 0) return c.substring(nameCookie.length + 1,c.length);
	}
	return null;
};
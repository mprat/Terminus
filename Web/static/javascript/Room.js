String.prototype.replaceAll = function(replaceThis, withThis){
	toreturn = this.toString();
	while (toreturn.indexOf(replaceThis) > 0){
		toreturn = toreturn.replace(replaceThis, withThis);
	}
	return toreturn;
};

function Room(roomname, introtext, roompic){
	this.parents = [];
	this.children = new Array();
	this.items = new Array();
	this.commands = ["cd", "ls", "less", "man", "help", "exit", "pwd"];
	this.room_name = (typeof roomname === 'undefined') ? "Generic Room": roomname;
	this.room_pic = (typeof roompic === 'undefined') ? "./static/img/none.gif": "./static/img/" + roompic;
	this.intro_text = (typeof introtext === 'undefined') ? "This is a simple room": introtext;
	this.cmd_text = {"man": "room man text", "less": this.room_name + " is a Room", "help": "room help text", "exit": "room exit text", "pwd": "You are in " + this.room_name + "."};
};

Room.prototype.toString = function(){
	return this.room_name;
};

Room.prototype.addItem = function(newitem) {
	if (typeof newitem != 'undefined'){
		this.items[this.items.length] = newitem;
	}
};

Room.prototype.removeItem = function(itemtoremove){
	index = this.items.indexOf(itemtoremove);
	if (index != -1){
		this.items.splice(index, 1);
	}
};

Room.prototype.addChild = function(newchild){
	if (typeof newchild != 'undefined'){
		this.children[this.children.length] = newchild;
	}
};

Room.prototype.removeChild = function(child){
	index = this.children.indexOf(child);
	if (index != -1){
		this.children.splice(index, 1);
	}
};

Room.prototype.addParent = function(parent){
	this.parents[0] = parent;
};

Room.prototype.addCommand = function(cmd){
	this.commands[this.commands.length] = cmd;
};

Room.prototype.removeCommand = function(cmd){
	index = this.commands.indexOf(cmd);
	if (index != -1){
		this.commands.splice(cmd, 1);
	}
};

Room.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
};

Room.prototype.ls = function(args){
	other_rooms = (this.children.toString()).replaceAll(",", "\n");
	if (this.items.length > 0){
		return other_rooms + "\n Items: \n" + (this.items.toString()).replaceAll(",", "\n");
	}
	return other_rooms;
};

Room.prototype.cd = function(args){
	if (args.length > 1){
		return "You can't move to multiple locations.";
	} else if (args[0] === "..") {
		if (this.parents.length >= 1){
			current_room = this.parents[0];
			return "You have moved to " + current_room.toString() + ".";
		} else {
			return "You are at the first room.";
		}
	} else if (args[0] === ".") {
		return "You have moved to " + current_room.toString() + ".";
	} else {
		roomname = args[0];
		for (var i = 0; i < this.children.length; i++){
			if (roomname === this.children[i].toString()){
				current_room = this.children[i];
				return "You have moved to " + current_room.toString() + ".";
			}
		}
		return "There is no room called " + args[0] + ".";
	}
};

Room.prototype.less = function(args){
	if (args.length < 1){
		return "Pick a different item to less.";
	} else {
		item = args[0];
		for (var i = 0; i < this.items.length; i++){
			if (item === this.items[i].toString()){
				return this.items[i].cmd_text["less"];
			}
		}
		return "There is no " + args[0] + " here.";
	}
};

//only valid for command names
Room.prototype.man = function(args){
	if (args.length < 1){
		return "Must ask the man about something to receive a response.";
	} else if (this.commands.indexOf(args[0]) < 0){
		return "You cannot do that right now - no need to know about it at the moment.";
	} else {
		if (args[0] == "ls"){
			return "the ls man page";
		} else if (args[0] == "cd"){
			return "the cd man page";
		} else if (args[0] == "less"){
			return "the less man page";
		} else if (args[0] == "man"){
			return "the man man page";
		} else if (args[0] == "help"){
			return "the help man page";
		} else if (args[0] == "exit"){
			return "the exit man page";
		} else if (args[0] == "mv"){
			return "the mv man page";
		} else if (args[0] == "cp"){
			return "the cp man page";
		} else if (args[0] == "pwd"){
			return "the pwd man page";
		} 
		return "there is no man page for that command";
	}
};

Room.prototype.help = function(args){
	return "Type 'man' to ask the man for help";
};

//TODO: for some reason this doesn't close the window
Room.prototype.exit = function(args){
	window.close();
};

Room.prototype.pwd = function(args){
	return this.cmd_text["pwd"];
};
String.prototype.replaceAll = function(replaceThis, withThis){
	toreturn = this.toString();
	while (toreturn.indexOf(replaceThis) > 0){
		toreturn = toreturn.replace(replaceThis, withThis);
	}
	return toreturn;
};

function Room(roomname, introtext){
	this.parents = [];
	this.children = new Array();
	this.items = new Array();
	this.commands = ["cd", "ls", "less", "man", "help", "exit", "pwd"];
	this.room_name = (typeof roomname === 'undefined') ? "Generic Room": roomname;
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
	return (this.children.toString()).replaceAll(",", "\n");
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

};

Room.prototype.man = function(args){

};

Room.prototype.help = function(args){

};

Room.prototype.exit = function(args){

};

Room.prototype.pwd = function(args){
	return this.cmd_text["pwd"];
};
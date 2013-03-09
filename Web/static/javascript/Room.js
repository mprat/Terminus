function Room(roomname, introtext){
	this.parents = new Array();
	this.children = new Array();
	this.items = new Array();
	this.commands = ["cd", "ls", "less", "man", "help", "exit"];
	this.room_name = (typeof roomname === 'undefined') ? "Generic Room": roomname;
	this.intro_text = (typeof introtext === 'undefined') ? "This is a simple room": introtext;
}
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

Room.prototype.setParent = function(parent){
	this.parents[this.parents.length] = parent;
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
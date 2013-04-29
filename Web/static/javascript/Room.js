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
	this.cmd_text = {"pwd": "You are in " + this.room_name + "."};
	//for event handling
	this.ev = new EventTarget();
	EventTarget.call(this);
};

Room.prototype.toString = function(){
	return this.room_name;
};

Room.prototype.addItem = function(newitem) {
	if (typeof newitem != 'undefined'){
		this.items[this.items.length] = newitem;
		this.ev.fire("addItem");
	}
};

Room.prototype.removeItem = function(itemnametoremove){
	index = this.itemStringArray().indexOf(itemnametoremove);
	if (index != -1){
		this.ev.fire("removeItem");
		return this.items.splice(index, 1)[0];
	}
	return null;
};

Room.prototype.itemStringArray = function(item){
	itemstrarray = []
	for (var i = 0; i < this.items.length; i++){
		itemstrarray[itemstrarray.length] = this.items[i].toString();
	}
	return itemstrarray;
};

Room.prototype.getItemFromName = function(itemname){
	itemindex = this.itemStringArray().indexOf(itemname);
	if (itemindex > -1)
		return this.items[itemindex];
	return -1;
}

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

Room.prototype.childrenStringArray = function(child){
	childrenstrarray = []
	for (var i = 0; i < this.children.length; i++){
		childrenstrarray[childrenstrarray.length] = this.children[i].toString();
	}
	return childrenstrarray;
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
		this.commands.splice(index, 1);
	}
};

Room.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
};

Room.prototype.removeCmdText = function(cmd){
	delete this.cmd_text[cmd];
};

Room.prototype.ls = function(args){
	if (args.length > 0){
		if (this.childrenStringArray().indexOf(args[0]) > -1){
			return this.children[this.childrenStringArray().indexOf(args[0])].printLS();
		} else {
			return "That is not a valid object to look at.";
		}
	} else {
		other_rooms = (this.children.toString()).replaceAll(",", "\n");
		$("#scene").attr("src",this.room_pic); // Display image of room
		if (this.items.length > 0){
			return " Locations: \n" + other_rooms + "\n Items: \n" + (this.items.toString()).replaceAll(",", "\n");
		}
		return " Locations: \n" + other_rooms;
	}
};

Room.prototype.printLS = function(){
	other_rooms = (this.children.toString()).replaceAll(",", "\n");
		if (this.items.length > 0){
			return " Locations: \n" + other_rooms + "\n Items: \n" + (this.items.toString()).replaceAll(",", "\n");
		}
		return " Locations: \n" + other_rooms;
}

var enterRoom = function(new_room){
    $("#scene").attr("src", "./static/img/none.gif"); //Always show blank image when moving into a room
 	current_room = new_room;
    state.setCurrentRoom(current_room);
}

Room.prototype.cd = function(args){
	if (args.length > 1){
		return "You can't move to multiple locations.";
	} else if (args.length == 0){
		enterRoom(Home);
		return "You have come Home!";
	}else if (args[0] === "..") {
		if (this.parents.length >= 1){
			if (this.room_name === "AthenaCluster"){
				this.ev.fire("AthenaClusterExited");
			}
            enterRoom(this.parents[0]);
			return "You have moved to " + current_room.toString() + ". " + current_room.intro_text;
		} else {
			return "You are at the first room.";
		}
	} else if (args[0] === "~"){
		enterRoom(Home);
		return "You have come Home!";
	} else if (args[0] === ".") {
        enterRoom(current_room);
        $("#scene").attr("src", "./static/img/none.gif"); //Always show blank image when moving into a room
		return "You have moved to " + current_room.toString() + ". " + current_room.intro_text;
	} else {
		roomname = args[0];
		for (var i = 0; i < this.children.length; i++){
			if (roomname === this.children[i].toString()){
				if (this.children[i].commands.indexOf("cd") > -1){
	                enterRoom(this.children[i]);
					return "You have moved to " + current_room.toString() + ". " + current_room.intro_text;
				} else {
					if (roomname === "AthenaCluster"){
						this.ev.fire("tryEnterAthenaCluster");
					} 
					return this.children[i].cmd_text["cd"];
				}
			}
		}
		return "There is no room called " + args[0] + ".";
	}
};

/*Checks if arg can be reached from this room
* Returns the room if it can
* Returns false if it cannot
*
* 'arg' is a single node, not a path
* i.e. Home.can_cd("next_room") returns true
*      Home.can_cd("next_room/another_room") is invalid
*/
Room.prototype.can_cd = function(arg){
    //Don't allow for undefined or multiple paths
    if (arg == undefined || arg.indexOf("/") > -1){
        return false;
    }
    else if(arg === "..") {
		return this.parents[0];
	} else if (arg === ".") {
        return this;
	} else {
		for (var i = 0; i < this.children.length; i++){
			if (arg === this.children[i].toString()){
				return this.children[i];
			}
		}
		return false;
	}
};

Room.prototype.less = function(args){
	if (args.length < 1){
		return "Pick a different item to less.";
	} else {
		item = args[0];
		for (var i = 0; i < this.items.length; i++){
			if (item === this.items[i].toString()){
                $("#scene").attr("src",this.items[i].picturename); // Display image of item
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
	} else {
		if (args[0] in man_pages){
			return man_pages[args[0]];
		}
		return "there is no man page for that command";
	}
};

Room.prototype.help = function(args){
	return "Type 'man' to ask the man for help";
};

//TODO: for some reason this doesn't close the window
Room.prototype.exit = function(args){
	window.open('', '_self', ''); 
	window.close(); 
};

Room.prototype.pwd = function(args){
    $("#scene").attr("src", this.room_pic);
	return "";
};

Room.prototype.mv = function(args){
	if (args.length != 2){
		return "You need to move thing A to place B. Use mov [thingA] [placeB].";
	} else {
		if ((this.itemStringArray().indexOf(args[0]) >= 0) && (this.childrenStringArray().indexOf(args[1]) >= 0)){
			itemtoadd = this.items[this.itemStringArray().indexOf(args[0])];
			this.children[this.childrenStringArray().indexOf(args[1])].addItem(itemtoadd);
			this.removeItem(args[0]);
			return "Moved " + args[0] + " to " + args[1] + ".";
		} else {
			return "Must be a valid item and location to move it.";
		}
	}
};

Room.prototype.rm = function(args){
	if (args.length < 1){
		return "You must remove a particular item";
	} else {
		stringtoreturn = "";
		for (var i = 0; i < args.length; i++){
			if (this.getItemFromName(args[i]) != -1){
				if (this.getItemFromName(args[i]).valid_cmds.indexOf("rm") > 0){
					var removedItem = this.removeItem(args[i]);
					if ("rm" in removedItem.cmd_text){
						stringtoreturn += removedItem.cmd_text["rm"] + "\n";
					} else {
						stringtoreturn += "You just removed " + args[i] + "\n";
					}
				} else {
					stringtoreturn += "That item cannot be removed";
				}
			} else {
				return "That's not a valid object to remove.";
			}
		}
		return stringtoreturn;
	}
};

Room.prototype.grep = function(args){
	return "You haven't learned this spell yet.";
};

Room.prototype.touch = function(args){
	if (args.length < 1){
		return "You must touch something in particular.";
	} else {
		var createdItemsString = "";
		for (var i = args.length - 1; i >= 0; i--) {
			if (args[i].length > 0){
				this.addItem(new Item(args[i], "This is a " + args[i]));
				createdItemsString += args[i];
				if (args[i] === "Plank"){
					this.ev.fire("touchPlank");
				}
			}
		};
		if (createdItemsString === ""){
			return "You haven't touched anything. Check your syntax.";
		} else {
			return "You have just created " + createdItemsString;
		}
	}
	return "You haven't learned this spell yet.";
};

Room.prototype.cp = function(args){
	return "You haven't learned this spell yet.";
};

Room.prototype.terminus = function(args){
	var text_to_return = this.cmd_text["terminus"]
	this.ev.fire("AthenaComboEntered");
	return text_to_return;
}
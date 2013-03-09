function Item(name, text){
	this.itemname = name;
	this.cmd_text = (typeof text === 'undefined') ? {"less": "This is a generic item"} : {"less": text};
}

Item.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
};
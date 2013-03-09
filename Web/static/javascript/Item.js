function Item(name){
	this.itemname = name;
	this.cmd_text = {};
}

Item.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
};
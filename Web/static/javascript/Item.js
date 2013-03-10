function Item(name, text, picname){
	this.itemname = name;
    this.picturename = (typeof picname === 'undefined') ? "./static/img/none.gif": "./static/img/" + picname;
	this.cmd_text = (typeof text === 'undefined') ? {"less": "This is a generic item"} : {"less": text};

	//for event handling
	this.ev = new EventHandler(); 
	EventHandler.call(this);
	Object.prototype.get = function(){
	if (index === "less"){
		this.ev.fire("itemLess");
	}
	return this[index];
};

Item.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
};

Item.prototype.toString = function(){
	return this.itemname;
}
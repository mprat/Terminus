function link(parentRoom, childRoom){
	if (!(childRoom in parentRoom.children)){
		parentRoom.addChild(childRoom);
	}
	if (!(parentRoom in childRoom.parents)){
		childRoom.addParent(parentRoom);
	}
};

var Home = new Room("home", "You are in the comfort of your own home.");

// TODO: add Level 1 tag here

var Letter = new Item("letter", "Welcome to the game.");
Home.addItem(Letter);
var WesternForest = new Room("WesternForest", "You enter and travel deep into the forest. \
	Eventually, the path leads to a clearing with a large impressive building. A sign \
	on it reads: Spell Casting Academy: The Elite School of Magic.");
var TestRoom = new Room("TestRoom", "this is a test");

link(Home, WesternForest);
link(Home, TestRoom);

// set the current room
var current_room = Home;

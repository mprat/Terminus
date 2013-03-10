/**
* Objects used to build levels
*/

/**
* ROOMS
* Players can cd between rooms
*
* API: Room(roomname, introtext){
*/
var Home = new Room("home",
    "You are in the comfort of your own home.",
    "./static/img/loc_farm.gif");
var WesternForest = new Room("WesternForest",
    "You enter and travel deep into the forest. \
        Eventually, the path leads to a clearing with a large impressive building. A sign \
        on it reads: Spell Casting Academy: The Elite School of Magic.",
    "./static/img/loc_forest");
var TestRoom = new Room("TestRoom", "this is a test");

/**
* LINKS BETWEEN ROOMS
* Fulfill parent/child relationships between rooms
*
* API: link(parentRoom, childRoom) 
*/
function link_rooms(parentRoom, childRoom){if (!(childRoom in parentRoom.children)){parentRoom.addChild(childRoom);}if (!(parentRoom in childRoom.parents)){childRoom.addParent(parentRoom);}};
link_rooms(Home, WesternForest);
link_rooms(Home, TestRoom);

/**
* ITEMS
* Items are objects that can be moved between Rooms.
*
* API: Item(name, text, picname){
*/
var Letter = new Item("letter", "Welcome to the game.");
var Sign = new Item("Sign",
                "Spell Casting Academy: The Elite School of Magic \n" +
                    "Today Only: Free Introductory Lessons! Novices welcome! \n",
                "./static/img/loc_forest.gif");
/**
* ITEMS ADDED TO ROOMS 
*/
Home.addItem(Letter);
WesternForest.addItem(Sign);
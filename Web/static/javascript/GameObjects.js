/**
* Objects used to build levels
*/

/**
* ROOMS
* Players can cd between rooms
*
* API: Room(roomname, introtext, img){
*/
var Home = new Room("home",
    "You are in the comfort of your own home.",
    "loc_farm.gif");
var WesternForest = new Room("WesternForest",
    "You enter and travel deep into the forest. \
        Eventually, the path leads to a clearing with a large impressive building. A sign \
        on it reads: Spell Casting Academy: The Elite School of Magic.",
    "loc_forest.gif");
var spellCastingAcademy = new Room("SpellCastingAcademy", "The halls are filled the hustle \
	and bustle of academy students scurrying to and from classes. The inside of the \
	academy is as impressive as it is on the outside with a high ceiling and gothic \
	arches, it seems even larger on the inside.", "loc_academy.gif");
var practiceRoom = new Room("PracticeRoom", "The room is filled with practice dummies \
	for students to practice their new spells on.", "loc_practiceroom.gif");
var box = new Room("Box", "This box is too small for you to fit into.");
box.removeCommand("cd");
box.addCmdText("cd", "You are too small to fit into the box.");

/**
* LINKS BETWEEN ROOMS
* Fulfill parent/child relationships between rooms
*
* API: link(parentRoom, childRoom) 
*/
function link_rooms(parentRoom, childRoom){if (!(childRoom in parentRoom.children)){parentRoom.addChild(childRoom);}if (!(parentRoom in childRoom.parents)){childRoom.addParent(parentRoom);}};
link_rooms(Home, WesternForest);
link_rooms(WesternForest, spellCastingAcademy);
link_rooms(spellCastingAcademy, practiceRoom);
link_rooms(practiceRoom, box);

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
                "loc_forest.gif");
var HurryingStudent = new Item("HurryingStudent", "You to speak to a hurrying student. \
	The student runs into you and falls to the ground. The student quickly gets up \
	and apologizes to you, asking if you are okay. You are sturdier than you look and \
	you're undamaged. I'm so sorry, I was in such a hurry that I didn't see you \
	there... Say, I haven't seen you here before. You're new here aren't-cha?\" the \
	student winks at you, \"Don't worry, there's tons of newbies around today, \
	why don't you try checking out one of the free intro lessons? I'd show you where \
	to go, but I gotta run to class. Just head into the Lessons hall and someone \
	should help you out. See you around.\" The student runs past you. You notice that \
	the student is pretty cute, and probably around your age. Unfortunately, the \
	student disappears around a corner before you can ask for a name.\n", "item_student.gif");

/**
* ITEMS ADDED TO ROOMS 
*/
Home.addItem(Letter);
WesternForest.addItem(Sign);
spellCastingAcademy.addItem(HurryingStudent);
practiceRoom.addItem(new Item("Instructions", "Welcome to the Practice Room. Here \
	you will find practice dummies try your new spells on. Go ahead, give it a go! \
	Practice dummies will respawn in their original location once you leave the \
	Practice Room. If you don't know any spells yet, go back and check out some \
	Lessons.", "item_manuscript.gif"));
practiceRoom.addItem(new Item("PracticeDummy1", "It's a practice dummy", "item_dummy.gif"));
practiceRoom.addItem(new Item("PracticeDummy2", "It's a practice dummy", "item_dummy.gif"));
practiceRoom.addItem(new Item("PracticeDummy3", "It's a practice dummy", "item_dummy.gif"));
practiceRoom.addItem(new Item("PracticeDummy4", "It's a practice dummy", "item_dummy.gif"));
practiceRoom.addItem(new Item("PracticeDummy5", "It's a practice dummy", "item_dummy.gif"));

/**
* ADD COMMANDS TO ROOMS
*/
practiceRoom.addCommand("mv");
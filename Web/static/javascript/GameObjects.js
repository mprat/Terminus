/**
* Objects used to build levels
*/

/**
* ROOMS
* Players can cd between rooms
*
* API: Room(roomname, introtext, img){
*/

//HOME
var Home = new Room("home",
    "You are in the comfort of your own home.",
    "loc_farm.gif");
Home.addItem(new Item("letter", "Welcome to the game."));

//WESTERN FOREST
var WesternForest = new Room("WesternForest",
    "You enter and travel deep into the forest. \
        Eventually, the path leads to a clearing with a large impressive building. A sign \
        on it reads: Spell Casting Academy: The Elite School of Magic.",
    "loc_forest.gif");
WesternForest.addItem(new Item("Sign",
                "Spell Casting Academy: The Elite School of Magic \n" +
                    "Today Only: Free Introductory Lessons! Novices welcome! \n",
                "loc_forest.gif"));

//SPELL CASTING ACADEMY
var SpellCastingAcademy = new Room("SpellCastingAcademy", "The halls are filled the hustle \
	and bustle of academy students scurrying to and from classes. The inside of the \
	academy is as impressive as it is on the outside with a high ceiling and gothic \
	arches, it seems even larger on the inside.", "loc_academy.gif");
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
	student disappears around a corner before you can ask for a name.\n", "item_student.gif")
SpellCastingAcademy.addItem(HurryingStudent);

//PRACTICE ROOM
var PracticeRoom = new Room("PracticeRoom", "The room is filled with practice dummies \
	for students to practice their new spells on.", "loc_practiceroom.gif");
PracticeRoom.addItem(new Item("Instructions", "Welcome to the Practice Room. Here \
	you will find practice dummies try your new spells on. Go ahead, give it a go! \
	Practice dummies will respawn in their original location once you leave the \
	Practice Room. If you don't know any spells yet, go back and check out some \
	Lessons.", "item_manuscript.gif"));
PracticeRoom.addItem(new Item("PracticeDummy1", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addItem(new Item("PracticeDummy2", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addItem(new Item("PracticeDummy3", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addItem(new Item("PracticeDummy4", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addItem(new Item("PracticeDummy5", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addCommand("mv");

//BOX
var Box = new Room("Box", "This box is too small for you to fit into.");
Box.removeCommand("cd");
Box.addCmdText("cd", "You are too small to fit into the box.");

//NORTHERN MEADOW
var NorthernMeadow = new Room("NorthernMeadow", "This is a beautiful green meadow. A plump but majestic pony prances happily about.", "loc_meadow.gif");
NorthernMeadow.addItem(new Item("Pony", "You go up to the pony and attempt to ride it. \
	It compiles and you ride the pony around in circles for a bit. It then grows tired \
	of having you as a burden and knocks you off. He then looks towards the east as if \
	suggesting that you head in that direction.", "item_fatpony.gif"));

//EASTERN MOUNTAINS
var EasternMountains = new Room("EasternMountains", "You travel through a mountain path, \
	which eventually leads you to the entrance of a cave. Sitting right outside this \
	cave is an old man.", "loc_mountains.gif");
EasternMountains.addItem(new Item("OldMan", "You speak with the old man. He greets \
	you warmly as if you were old friends. You feel at ease with him. Hello \
	adventurer! Top of the morning to you! You seem like a young and energetic \
	explorer. If you're brave enough, your destiny awaits within this cave. That \
	destiny will manifest itself as a portal. Enter this portal and begin the next \
	chapter of your life. The old man sees the shock on your face and smiles \
	comforting smile, \"I am but a fragile old man, and cannot accompany you through \
	this cave, but what I can provide are a few simple spells that will help you \
	along your way. Just read my old manuscripts and tryout those spells.\"", 
	"item_mysteryman.gif"));
EasternMountains.addItem(new Item("OldManuscripts", "If you ever forget a spell just use\
	\"help\" and a list of available spells will appear. If you need details on how \
	to use a specific spell, use 'man' followed by spell command. For example, \
	if you were interested in details on how to use the \"mv\" spell you would use: \
		man mv", "item_manuscript.gif"));

//LESSONS
var Lessons = new Room("Lessons", "You enter the Lessons hall ready and eager. \
	It's much quieter here, as many of the lessons have already started. \
	You quickly ushered into the Introductory Lesson, which already begun. \
	You enter the class on the \"Move Spell.\"", "loc_classroom.gif");
Lessons.addItem(new Item("Professor", "The professor is difficult to understand, but you pick up just enough to learn 3 things: \
	1. You can use 'mv' to move things in the world \
	2. You have to indicate the object and the new location (i.e.: mv OBJECT NEWLOCATION) \
	3. This spell will only work on certain objects, for example the PracticeDummy objects in the PracticeRoom\
	You did not pay enough attention to learn which types of objects are unmovable. Oh well, \
	experimenting was always more of your style anyways. But be careful!", "item_professor.gif"));

//CAVE
var Cave = new Room("Cave", "It's your typical cave: dark and dank.", "loc_cave.gif");
		
//DARK CORRIDOR
var DarkCorridor = new Room("DarkCorridor", "You travel through the dark corridor \
	and find a small dank room at the end.", "loc_corridor.gif");

//STAIRCASE
var Staircase = new Room("Staircase", "The rocky staircase leads you to a dead end \
	and a sign indicating such.", "loc_stair.gif");
Staircase.addItem(new Item("Sign", "DEAD END\n", "item_sign.gif"));

//DANK ROOM
var DankRoom = new Room("DankRoom", "It's a musty dank room. A round boulder sits \n" +
		"to the right side of the room.", "loc_darkroom.gif");
DankRoom.addItem(new Item("Boulder", "You feel a slight breeze coming from behind the \n" +
		"boulder. Maybe move it out of your way?\n", "item_boulder.gif"));
DankRoom.addCommand("mv");

//SMALL HOLE
var SmallHole = new Room("SmallHole", "There's nothing exciting in the small hole, and it's pretty dirty. There's no real reason to go into the hole.");
SmallHole.addCmdText("cd", "There's nothing exciting in the small hole, and it's pretty dirty. There's no real reason to go into the hole. I suggest going back out.");
//add event handler to the "addItem" method of SmallHole to cause the rest of the level to be connected
SmallHole.ev.addListener("addItem", function(){
	link_rooms(DankRoom, Tunnel);
});

//TUNNEL
var Tunnel = new Room("Tunnel", "It's quite moist in here. \n" +
		"You notice a small furry movement in the corner of your vision. \n" +
		"It's most likely a rat. A very large rat. Perhaps a mongoose. \n" +
		"At the end of the tunnel you find a stone chamber.\n", "loc_tunnel.gif");
Tunnel.addItem(new Item("Rat", "Upon further inspection, you determine that the furry \n" +
		"presence is in fact a rat...the size of a small dog. It bites you. \n" +
		"You are very displeased.\n", "item_rat.gif"));

//STONE CHAMBER
var StoneChamber = new Room("StoneChamber", "The whole rooms glows a dim green light. \n" +
		"The source of this light is a portal standing in the middle of the room. \n" +
		"This is obviously the portal of which the old man spoke.\n", "loc_portalroom.gif");

//PORTAL (to bring you to the next level
var Portal = new Room("Portal", "You have been transported through time...\n", "item_portal.gif");
//---------------END LEVEL 1-----------------


//---------------LEVEL 2---------------------
//TOWN SQUARE
var TownSquare = new Room("TownSquare", "You are in a sunny and spacious town square. \n" +
		"There is a pedestal at the center of the cobblestone turnabout, but no statue on it. \n" +
		"The architecture is charming, but everyone here seems nervous for some reason.\n", "loc_square.gif");
TownSquare.addItem(new Item("RandomCitizen1", "\"Excuse me,\" you begin. The man turns, startled. \n" +
		"\"Oh, hello! Welcome to Terminus. You'll have to forgive me, but we're all a little \n" +
		"on edge lately, what with the Dark Wizard spreading corruption all along the \n" +
		"coast.  You should be careful!\" \n", "item_citizen1.gif"));
TownSquare.addItem(new Item("RandomCitizen2", "The man looks up from his newspaper when he notices you staring. \n" +
		"\"Have you read this?\" he exclaims, shaking the latest edition of \"The Last \n" +
		"Word\" in your face. \"It says here the wizard's corruption has spread as far\n" +
		"as Oston to the south, and New Console is completely unrecoverable! These are \n" +
		"dangerous times,\" he mutters, shaking his head and turning back to his reading. \n", "item_citizen2.gif"));
TownSquare.addItem(new Item("DistraughtLady", "The woman is sobbing uncontrollably, her face in her hands.\n" +
		"\"My baby,\" she cries, \"They kidnapped my baby! I just know that wizard had \n" +
		"something to do with it.\"\n", "item_lady.gif"));


/**
* LINKS BETWEEN ROOMS
* Fulfill parent/child relationships between rooms
*
* API: link(parentRoom, childRoom) 
*/
function link_rooms(parentRoom, childRoom){if (!(childRoom in parentRoom.children)){parentRoom.addChild(childRoom);}if (!(parentRoom in childRoom.parents)){childRoom.addParent(parentRoom);}};
link_rooms(Home, WesternForest);
link_rooms(WesternForest, SpellCastingAcademy);
link_rooms(SpellCastingAcademy, PracticeRoom);
link_rooms(PracticeRoom, Box);

link_rooms(Home, NorthernMeadow);
link_rooms(NorthernMeadow, EasternMountains);
link_rooms(SpellCastingAcademy, Lessons);
link_rooms(SpellCastingAcademy, PracticeRoom);
link_rooms(EasternMountains, Cave);
link_rooms(Cave, DarkCorridor);
link_rooms(Cave, Staircase);
link_rooms(DarkCorridor, DankRoom);
link_rooms(DankRoom, SmallHole);
link_rooms(Tunnel, StoneChamber);
link_rooms(StoneChamber, Portal);
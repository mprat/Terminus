package gameCode;

import java.util.ArrayList;

import javax.swing.Icon;
import javax.swing.ImageIcon;

public class Game {
	//private HashSet<Room> rooms;
	private Room currentRoom;
	private Item currentItem;
	private ImageIcon currentIcon;
	private Room dankRoom;
	private Room tunnel;
	private Room library;
	private Room backRoom;
	public Room rockyPath;
	public Item boulder;
	private Room artisanShop;
	public Room clearing;
	private Room brokenbridge;
	private Item librarian;
	private Room cage;
	public Room farm;
	public Room caveOfTrolls;
	public Item hideousTroll;
	public Item uglyTroll;
	public Item uglierTroll;
	private Item farmer;
	private Item artisan;
	private ArrayList<String> spellsLearned = new ArrayList<String>();
	private boolean libquestcomplete = false;
	private boolean rockinpath = true;
	//private boolean madeAllGears = false;
	private int numGearsMade = 0;
	public String gearName;
	private int cornCounter = 0;
	private Item cryingMan;
	private Item kidnappedChild;
	public Room ominousPath;
	public Item thornybrambles;
	public boolean bridgesolved = false;
	private boolean housequestcomplete = false;
	public boolean bramblessolved = false;
	private boolean awaitingPassword = false;
	public boolean troll1gone = false;
	public boolean troll2gone = false;
	private Room house;
	
	public Game(){
		String introText = "Welcome! If you are new to the game, here are some tips: \n " +
		"Look at your surroundings with the command \"ls\". \n " +
		"Move to a new location with the command \"cd LOCATION\" \n" +
		"You can backtrack with the command \"cd ..\". \n" +
		"Interact with things in the world with the command \"less ITEM\" \n" +
		"Go ahead, explore. We hope you enjoy what you find. Do ls as your first command.\n";
		//this.rooms = new HashSet<Room>();
		
		//HOME
		Room home = new Room("Home", introText + "\n", "titlescreen");
		home.addItem(new Item("Letter", introText, "item_manuscript"));
		
		this.currentIcon = new ImageIcon("graphic/" + home.getIconText() + ".gif");
		this.currentRoom = home;
		
		//---------LEVEL 1----------------------
		//WESTERN FOREST
		Room westernForest = new Room("WesternForest", "You enter and travel deep into the forest. \n" +
				"Eventually, the path leads to a clearing with a large impressive building. \n" +
				"A sign on it reads: Spell Casting Academy: The Elite School of Magic.\n", 
				"loc_forest");
		westernForest.addItem(new Item("Sign", "Spell Casting Academy: The Elite School of Magic \n" +
				"Today Only: Free Introductory Lessons! Novices welcome! \n", "item_sign"));
		
		//SPELL CASTING ACADEMY
		Room spellCastingAcademy = new Room("SpellCastingAcademy", "The halls are filled the hustle and bustle " +
				"of academy students scurrying to and from classes. " +
				"The inside of the academy is as impressive as it is on the outside " +
				"with a high ceiling and gothic arches, it seems even larger on the inside. \n", 
				"loc_academy");
		spellCastingAcademy.addItem(new OnceItem("HurryingStudent", "You to speak to a hurrying student. " +
				"The student runs into you and falls to the ground. " +
				"The student quickly gets up and apologizes to you, asking if you are okay. " +
				"You are sturdier than you look and you're undamaged." + 
				"\"I'm so sorry, I was in such a hurry that I didn't see you there... " +
				"Say, I haven't seen you here before. You're new here aren't-cha?\" " +
				"the student winks at you, \"Don't worry, there's tons of newbies around today, " +
				"why don't you try checking out one of the free intro lessons? " +
				"I'd show you where to go, but I gotta run to class. " +
				"Just head into the Lessons hall and someone should help you out. See you around.\" " + 
				"The student runs past you. You notice that the student is pretty cute, " +
				"and probably around your age. Unfortunately, the student disappears around " +
				" a corner before you can ask for a name.\n", "item_student"));
		
		//PRACTICE ROOM
		Room practiceRoom = new Room("PracticeRoom", "The room is filled with practice dummies \n" +
				"for students to practice their new spells on. \n", "loc_practiceroom");
		practiceRoom.addItem(new Item("Instructions", "Welcome to the Practice Room. \n" +
				"Here you will find practice dummies try your new spells on. \n" + 
				"Go ahead, give it a go! Practice dummies will respawn in their original \n" +
				"location once you leave the Practice Room. If you don't know any spells yet, \n" +
				"go back and check out some Lessons.\n", "item_manuscript"));
		practiceRoom.addItem(new MoveableItem("PracticeDummy1", "It's a practice dummy\n", "item_dummy"));
		practiceRoom.addItem(new MoveableItem("PracticeDummy2", "It's a practice dummy\n", "item_dummy"));
		practiceRoom.addItem(new MoveableItem("PracticeDummy3", "It's a practice dummy\n", "item_dummy"));
		practiceRoom.addItem(new MoveableItem("PracticeDummy4", "It's a practice dummy\n", "item_dummy"));
		practiceRoom.addItem(new MoveableItem("PracticeDummy5", "It's a practice dummy\n", "item_dummy"));
		practiceRoom.addCommand("mv");
		
		//BOX
		Box box = new Box("Box", "This box is too small for you to fit into.");
		
		//MEADOW
		Room northernMeadow = new Room("NorthernMeadow", "This is a beautiful green meadow. " +
				"A plump but majestic pony prances happily about.\n", "loc_meadow");
		northernMeadow.addItem(new Item("Pony", "You go up to the pony and attempt to ride it. " +
				"It compiles and you ride the pony around in circles for a bit. " +
				"It then grows tired of having you as a burden and knocks you off. " +
				"He then looks towards the east as if suggesting that you head in that direction.\n", "item_fatpony"));
		
		
		//EASTERN MOUNTAINS
		Room easternMountains = new Room("EasternMountains", "You travel through a mountain path, " +
				"which eventually leads you to the entrance of a cave. " +
				"Sitting right outside this cave is an old man.", "loc_mountains");
		easternMountains.addItem(new Item("OldMan", "You speak with the old man. " +
				"He greets you warmly as if you were old friends. " +
				"You feel at ease with him. Hello adventurer! Top of the morning to you! " +
				"You seem like a young and energetic explorer. " +
				"If you're brave enough, your destiny awaits within this cave." +
				"That destiny will manifest itself as a portal. " +
				"Enter this portal and begin the next chapter of your life. " +
				"The old man sees the shock on your face and smiles comforting smile, " +
				"\"I am but a fragile old man, and cannot accompany you through this cave, " +
				"but what I can provide are a few simple spells that will help you along " +
				"your way. Just read my old manuscripts and tryout those spells.\"", "item_mysteryman"));
		easternMountains.addItem(new Item("OldManuscripts", "If you ever forget a spell just use \"help\" " +
				"and a list of available spells will appear. If you need details " +
				"on how to use a specific spell, use 'man' followed by spell command. " +
				"For example, if you were interested in details on how to use the " +
				"\"mv\" spell you would use: man mv\n", "item_manuscript"));
		
		//LESSONS
		Room lessons = new Room("Lessons", "You enter the Lessons hall ready and eager. \n" +
				"It's much quieter here, as many of the lessons have already started. \n" +
				" You quickly ushered into the Introductory Lesson, which already begun. \n" +
				"You enter the class on the \"Move Spell.\"\n", "loc_classroom");
		lessons.addItem(new Item("Professor", "The professor is difficult to understand, \n" +
				"but you pick up just enough to learn 3 things: \n" + 
				"1. You can use 'mv' to move things in the world \n" + 
				"2. You have to indicate the object and the new location \n" +
				"(i.e.: mv OBJECT NEWLOCATION) \n" + 
				"3. This spell will only work on certain objects, for example \n" +
				"the PracticeDummy objects in the PracticeRoom \n" +
				"You did not pay enough attention to learn which types of \n" +
				"objects are unmovable. Oh well, experimenting was always more of \n" +
				"your style anyways. But be careful!\n", "item_professor"));
		
		//CAVE
		Room cave = new Room("Cave", "It's your typical cave: dark and dank.\n", "loc_cave");
		
		//DARK CORRIDOR
		Room darkCorridor = new Room("DarkCorridor", "You travel through the dark corridor \n" +
				"and find a small dank room at the end.\n", "loc_corridor");
		
		//STAIRCASE
		Room staircase = new Room("Staircase", "The rocky staircase leads you to a dead end \n" +
				"and a sign indicating such.\n", "loc_stair");
		staircase.addItem(new Item("Sign", "DEAD END\n", "item_sign"));
		
		//DANK ROOM
		dankRoom = new Room("DankRoom", "It's a musty dank room. A round boulder sits \n" +
				"to the right side of the room.\n", "loc_darkroom");
		dankRoom.addItem(new MoveableItem("Boulder", "You feel a slight breeze coming from behind the \n" +
				"boulder. Maybe move it out of your way?\n", "item_boulder"));
		dankRoom.addCommand("mv");
		
		//SMALL HOLE
		Box smallHole = new Box("SmallHole", "There's nothing exciting in the small hole, and it's pretty dirty. There's no real reason to go into the hole.");
		
		//TUNNEL
		tunnel = new Room("Tunnel", "It's quite moist in here. \n" +
				"You notice a small furry movement in the corner of your vision. \n" +
				"It's most likely a rat. A very large rat. Perhaps a mongoose. \n" +
				"At the end of the tunnel you find a stone chamber.\n", "loc_tunnel");
		tunnel.addItem(new Item("Rat", "Upon further inspection, you determine that the furry \n" +
				"presence is in fact a rat...the size of a small dog. It bites you. \n" +
				"You are very displeased.\n", "item_rat"));
		
		//STONE CHAMBER
		Room stoneChamber = new Room("StoneChamber", "The whole rooms glows a dim green light. \n" +
				"The source of this light is a portal standing in the middle of the room. \n" +
				"This is obviously the portal of which the old man spoke.\n", "loc_portalroom");
	
		//PORTAL (to bring you to the next level
		Room portal = new Room("Portal", "You have been transported through time...\n", "item_portal");
		
		//link LEVEL 1 together
		link(home, westernForest);
		link(home, northernMeadow);
		link(westernForest, spellCastingAcademy);
		link(northernMeadow, easternMountains);
		link(spellCastingAcademy, lessons);
		link(spellCastingAcademy, practiceRoom);
		link(easternMountains, cave);
		link(cave, darkCorridor);
		link(cave, staircase);
		link(darkCorridor, dankRoom);
		//link(dankRoom, tunnel); - this link is made when you move the boulder
		link(dankRoom, smallHole);
		link(tunnel, stoneChamber);
		link(stoneChamber, portal);
		//---------------END LEVEL 1-----------------
		
		
		//---------------LEVEL 2---------------------
		//TOWN SQUARE
		Room townSquare = new Room("TownSquare", "You are in a sunny and spacious town square. \n" +
				"There is a pedestal at the center of the cobblestone turnabout, but no statue on it. \n" +
				"The architecture is charming, but everyone here seems nervous for some reason.\n", "loc_square");
		townSquare.addItem(new Item("RandomCitizen1", "\"Excuse me,\" you begin. The man turns, startled. \n" +
				"\"Oh, hello! Welcome to Terminus. You'll have to forgive me, but we're all a little \n" +
				"on edge lately, what with the Dark Wizard spreading corruption all along the \n" +
				"coast.  You should be careful!\" \n", "item_citizen1"));
		townSquare.addItem(new Item("RandomCitizen2", "The man looks up from his newspaper when he notices you staring. \n" +
				"\"Have you read this?\" he exclaims, shaking the latest edition of \"The Last \n" +
				"Word\" in your face. \"It says here the wizard's corruption has spread as far\n" +
				"as Oston to the south, and New Console is completely unrecoverable! These are \n" +
				"dangerous times,\" he mutters, shaking his head and turning back to his reading. \n", "item_citizen2"));
		townSquare.addItem(new Item("DistraughtLady", "The woman is sobbing uncontrollably, her face in her hands.\n" +
				"\"My baby,\" she cries, \"They kidnapped my baby! I just know that wizard had \n" +
				"something to do with it.\"\n", "item_lady"));
		
		//MARKETPLACE
		Room marketplace = new Room("Marketplace", "You are in the marketplace.\n", "loc_market");
		Item vendor = new Item("Vendor", "\" 'Ello there.\" The vendor smiles at you unpleasantly, \n" +
				"revealing a mouth full of gold teeth. \"Well? Wot are you looking for?\"\n", "item_merchant");
		vendor.setRMText("\"Ha! That spell doesn't work on everything, you know. I may have forgotten \n" +
				"to mention that before I sold it to you...\"\n");
		marketplace.addItem(vendor);
		YNItem backpack = new YNItem("Backpack", "There's a beat-up looking backpack on the table with no price tag.  Its cloth looks \n" +
				"frayed, but sturdy. You glance quickly at the vendor, but his attention is elsewhere. \n" +
				"Do you take the backpack? y\\n \n", "item_backpack", "You quickly snatch the backpack from the table. This could come in handy.\n" +
						"From now on, you can put items into your backpack.\n", 
						"You decide to leave the backpack where it is for now.\n");
		marketplace.addItem(backpack);
		YNItem rmSpell = new YNItem("rmSpell", "There's a spell scroll on the table labeled \"Remove.\" \n" +
				"Do you want to buy it for 15 gold pieces? y/n \n", "item_manuscript", "The vendor snatches the gold from your hand and then hands you the scroll,\n" +
						"leering as he does so. \"Ah, yes, the rm spell,\" he muses. \"Simply say \"rm\" followed by the name of an item or person, \n" +
						"and they will disappear from this plane... forever. D'you have the guts to use it, I wonder?\"\n" +
						"You can now use the \"rm\" spell.\n", "Come back later.\n");
		marketplace.addItem(rmSpell);
		YNItem mkdirSpell = new YNItem("mkdirSpell", "There's a spell scroll on the table labeled \"Make dreams into reality.\" \n" +
				"Do you want to buy it for 30 gold pieces? y\\n \n", "item_manuscript", "The vendor cackles. \"An ambitious one, eh? Very well. \n" +
						"Just say \"mkdir\" followed by any name that pleases you, and you can create a new place \n" +
						"that never existed there before. Ha! Not very useful, if y'ask me...\"\n" +
						"You can now use the \"mkdir\" spell.\n", "You leave the mkdirSpell on the table\n");
		marketplace.addItem(mkdirSpell);
		
		//LIBRARY
		library = new Room("Library", "The Library is dimly lit and smells like mildew. \n" +
				"Still, it's warm in here and the soft green carpet makes it seem kind of cozy.\n", "loc_library");
		library.addItem(new Item("TotallyRadSpellbook", "Legends speak of a great word of power that allows the speaker to perform \n" +
				"any action on any item. \"Sudo\", as the ancients called it, conveys complete mastery over the elements. \n" +
				"Unfortunately, or perhaps fortunately, the mystical password has been lost \n" +
				"to the sands of time.\n", "item_radspellbook"));
		library.addItem(new Item("PaperbackRomance", "You flip the paperback open to a random page. \n" +
				"\"Oh, Horatio!\" Antonia exclaimed, her bosom heaving as Horatio deftly ripped the \n" +
				"bodice from her lithe frame. Horatio gave an animalistic growl and he clasped her \n" +
				"fingers in his strong hands and brought them to rest upon his swollen— You close the \n" +
				"book, disinterested, and place it back on the shelf. \n", "item_romancenovel"));
		library.addItem(new GrepItem("HistoryOfTerminus", "It looks like an interesting book, but it's way too \n" +
				"long and the print is too tiny.\n", "item_historybook", "DarkWizard", "...old tales tell of a dark wizard who will fragment the land...\n" +
				"...only the world-maker can stop the dark wizard's virus from...\n" +
				"...that the power of \"sudo\" may be the dark wizard's only weakness...\n"));
		library.addItem(new Item("InconspicuousLever", "You spot an inconspicuous lever behind the shelves.  Curious, you pull it, \n" +
				"and a panel slides open to reveal a secret back room.\n", "item_lever"));
		library.addCommand("grep");
		
		//BACK ROOM
		backRoom = new Room("BackRoom", "You find a mysterious back room. You find a librarian \n" +
				"alone with a small elf. You hope you're not interrupting.", "loc_backroom");
		backRoom.addItem(new Item("Grep", "The exceptionally ugly elf turns to you with a sour expression. \n" +
				"\"Greeeeeep,\" he says sullenly.\n", "grep"));
		librarian = new Item("Librarian", "\"Hm? Oh, hello. I apologize for the mess, but I'm very busy \n" +
				"doing research on the dark wizard. Would you do me a favor? Go look up all \n" +
				"references to DarkWizard in the History of Terminus. My assistant Grep \n" +
				"can help you.\" \n" +
				"Grep eyes you balefully. \"Greeepp.\" \"To search the contents of the book, just type \n" +
				"\"grep PHRASE DOCUMENT\", where PHRASE is the phrase you want to search for,\n" +
				"and DOCUMENT is the name of the book you want to search.\"\n", "item_librarian");
		backRoom.addItem(librarian);
		backRoom.addCommand("grep");
		
		//ROCKY PATH
		rockyPath = new Room("RockyPath", "The weed-choked path leads off into the fields. \n" +
				"There is an enormous boulder blocking your way, however.\n", "loc_rockypath");
		boulder = new Item("LargeBoulder", "It's much too big to move. \n", "item_boulder");
		boulder.setRMText("The boulder disappears with a pop. The way is clear now.\n");
		boulder.setRM(true);
		rockyPath.addItem(boulder);
		rockyPath.addCommand("rm");
		
		//ARTISAN'S SHOP
		artisanShop = new Room("ArtisanShop", "The walls of the shop are covered in clocks, \n" +
				"all slightly out of sync. At the workbench, a woman in an enormous pair of goggles \n" +
				"is wielding a blowtorch with frightening enthusiasm.\n", "loc_artisanshop");
		Item strangeTrinket = new Item("StrangeTrinket", "It looks like a crystal of some sort.  It's very beautiful.", "item_trinket");
		strangeTrinket.setRMText("Didn't your mother ever teach you that it's rude to rease other people's \n" +
				"things from their plane of existence?\n");
		strangeTrinket.setMVText("You can't take that, it's not yours!\n");
		artisanShop.addItem(strangeTrinket);
		Item clockworkDragon = new Item("ClockworkDragon","A dragon the size of a small dog is frolicking about the room. \n" +
				"You'd think it was real if it weren't for the wind-up key sticking out of its \n" +
				"back.","item_clockdragon");
		clockworkDragon.setRMText("Didn't your mother ever teach you that it's rude to erase other people's \n" + 
				"things from their plane of existence?\n");
		clockworkDragon.setMVText("You can't take that, it's not yours!\n");
		artisanShop.addItem(clockworkDragon);
		artisan = new Item("Artisan", "The Artisan lifts up her goggles and peers at you in " +
				"surprise. \"Are you the new assistant? You're late! ...  \n You say you aren't my assistant? \n" +
				"Well, that doesn't mean you can't make yourself useful. I need some gears, quickly! \n" +
				"... \n" +
				"You don't even know how to make things? Hmph. Some assistant you are. Just \n" +
				"say \"touch ITEM\" alright? Where ITEM is the name of the thing you want to create. \n" +
				"Now make me a Gear! Then come back.\"\n", "item_artisan");
		artisanShop.addItem(artisan);
		artisanShop.addCommand("touch");
		
		//FARM
		farm = new Room("Farm", "There was once a farm of some sort here, but now the fields are scorched and \n" +
				"brown.\n", "loc_farm");
		Item earOfCorn = new Item("EarOfCorn","The corn is sad and withered-looking.\n","item_corn");
		earOfCorn.setRMText("rm: Why would you destroy a starving man's only food?\n");
		farm.addItem(earOfCorn);
		farmer = new Item("Farmer", "\"Ruined! I'm ruined! Look at these crops... almost nothing \n" +
				"left! The wizard's minions were here last week... they destroyed everything. How \n" +
				"will I feed my 10 children with just one ear of corn? Can you help me? \" \n", "");
		farm.addItem(farmer);
		farm.addCommand("cp");
		
		//BROKEN BRIDGE
		brokenbridge = new Room("BrokenBridge", "A creaky wooden bridges stretches across a chasm. But it's missing a \n" +
				"Plank, and the gap is too far to jump. \n", "loc_bridge");
		//beforeClearing = new Room("Clearing", "You can't cross the bridge until you've replaced the missing Plank.", "");
		brokenbridge.addCommand("touch");
		
		//CLEARING
		clearing = new Room("Clearing", "There's a small grassy clearing here, with a man sitting on a \n" +
				"stone and sobbing. Behind him is a pile of rubble. \n", "loc_clearing");
		cryingMan = new Item("CryingMan", "\"You! You're a magic-user! I can tell, you've got that look. \n" +
				"Come to finish the job, have you? Well, go ahead, do your worst there's nothing else you \n"+
				"can take from me. Not since the rest of you were here a few days ago.\"\n"+
				" \n"+
				"\"What happened? You DARE to ask-- you know perfectly well what happened.\n"+
				"Your friends, the wizard's minions, destroyed my house and kidnapped my poor \n"+
				"daughter, that's what! My wife even went into town to look for help, and I haven't \n"+
				"heard from her since!\"\n"+
				" \n"+
				"\"Hm? Well, I guess it's true that you don't look like one of the wizard's minions. Still, \n"+
				"I don't trust you magicfolk. If you really are who you say you are, then prove your \n"+
				"good intentions by making me a new House!\" \n", "item_man");
		clearing.addItem(cryingMan);
		house = new Room("House", "You made this house for the man. How thoughtful of you!", "");
				
		//OMINOUS-LOOKING PATH
		ominousPath = new Room("OminousLookingPath", "The path leads toward a dark cave. It's an ordinary cobblestone path, but for \n" +
				"some reason it fills you with a sense of dread.\n", "loc_path");
		thornybrambles = new Item("ThornyBrambles", "This thicket of brambles is covered with wicked-looking thorns. You \n" +
				"can't go around it, and you definitely aren't about to go through it.\n", "");
		thornybrambles.setMVText("You can't touch them because they are covered with thorns. Ouch!\n");
		thornybrambles.setRMText("You speak the words of the Remove spell and the brambles glimmer a \n" +
				"deep blue. The sparks rearrange themselves into a prompt: 'PASSWORD?' \n");
		ominousPath.addItem(thornybrambles);
		ominousPath.addCommand("rm");
		
		//CAVE
		//Room beforeCave = new Room("CaveOfDisgruntledTrolls", "A patch of thorny brambles is growing at the mouth of the cave, blocking your way.", "loc_cave");
		caveOfTrolls = new Room("CaveOfDisgruntledTrolls", "The cave is dark and smells like... feet? Oh, right, it's probably the trolls. \n" +
				"There's a scared-looking kid in a cage by the far wall.\n", "loc_cave");
		uglyTroll = new Item("UglyTroll", "He looks mad, and really ugly.\n", "item_troll1");
		uglyTroll.setRMText("The troll looks briefy surprised, then vanishes with an unpleasant squelching sound.\n");
		caveOfTrolls.addItem(uglyTroll);
		//beforeCave.addItem(uglyTroll);
		uglierTroll = new Item("UglierTroll", "He looks mad, and really, really ugly.\n", "item_troll2");
		uglierTroll.setRMText("The troll looks briefy surprised, then vanishes with an unpleasant \n" +
				"squelching sound.\n");
		caveOfTrolls.addItem(uglierTroll);
		//beforeCave.addItem(uglierTroll);
		/*hideousTroll = new MoveableItem("AbsolutelyHideousTroll", "You probably don't want to look at this guy. Oops, too late. \n", "item_supertroll");
		hideousTroll.setRMText("The troll belches spectacularly, and you could swear he actually smirks. \n" +
				"You won't get rid of him that easily, not without admin privileges.\n");
		hideousTroll.setMVText("If you move him out of the cave, he'll terrorize \n" +
				"the countryside. Also he will probably eat you. \n");*/
		hideousTroll = new Item("AbsolutelyHideousTroll", "You probably don't want to look at this guy. Oops, too late. \n", "item_supertroll");
		hideousTroll.setRMText("The troll belches spectacularly, and you could swear he actually smirks. \n" +
				"You won't get rid of him that easily, not without admin privileges.\n");
		hideousTroll.setMVText("If you move him out of the cave, he'll terrorize \n" +
				"the countryside. Also he will probably eat you. \n");
		caveOfTrolls.addItem(hideousTroll);
		//beforeCave.addItem(hideousTroll);
		caveOfTrolls.addCommand("rm");
		caveOfTrolls.addCommand("mv");
		
		//CAGE
		cage = new Room("Cage", "There's a scared-looking kid in there.\n", "item_cage");
		kidnappedChild = new Item("kidnappedChild", "You know it's kind of mean, but you can't help but think that that is one \n" +
				"funny-looking kid.\n", "item_cagedboy");
		kidnappedChild.setMVText("The kid looks around, dazed, surprised to find himself out of the cage. \n" +
				"You smile at him and speak in a gentle voice. 'You should probably be getting home, \n" +
				"little boy. Someone is there waiting for you.' \n" +
				"'I'm a girl,' says the little girl smartly. Then she dashes past you, out of the cave, and \n" +
				"runs up the ominous path towards home.\n");
		cage.addItem(kidnappedChild);
		
		//link level 2 together
		link(townSquare, marketplace);
		link(townSquare, library);
		link(townSquare, rockyPath);
		link(townSquare, artisanShop);
		link(townSquare, brokenbridge);
		//link(library, backRoom); 
		link(rockyPath, farm);
		link(brokenbridge, clearing);
		link(clearing, ominousPath);
		link(ominousPath, caveOfTrolls);
		link(caveOfTrolls, cage);
		link(practiceRoom, box);

		//link level 1 to level 2
		link(portal, townSquare);
		
		//---------------END LEVEL 2-----------------
		
		this.currentRoom = home;
	}
	
	private void link(Room parent, Room child){
		if (!(parent.getChildren().contains(child)))
			parent.addChild(child);
		child.setParent(parent);
	}
	
	public ArrayList<MoveableItem> getMoveableItems(){
		ArrayList<MoveableItem> mov = new ArrayList<MoveableItem>();
		for (Item i: this.getCurrentLessItems()){
			if (i instanceof MoveableItem){
				mov.add((MoveableItem)i);
			}
		}
		return mov;
	}
	
	/*public Game(ArrayList<Room> rooms){
		this.rooms = new HashSet<Room>(rooms);
	}*/
	
	public boolean changeRoom(String roomName){
		for (Room r: this.currentRoom.getChildren()){
			if (r.getName().equals(roomName))
			{	
				this.currentRoom = r;
				return true;
			}
		}
		return false;
	}
	
	public ArrayList<String> getLocationNames()
	{
		ArrayList<String> locations = new ArrayList<String>();
		for (Room r: this.currentRoom.getChildren())
			locations.add(r.getName());
		return locations;
	}
	
	public ArrayList<String> getItemNames()
	{
		ArrayList<String> items = new ArrayList<String>();
		for (Item i: this.currentRoom.getItems())
			items.add(i.getName());
		return items;
	}
	
	public ArrayList<String> getCurrentLSList(){
		ArrayList<String> lsList = new ArrayList<String>();
		lsList.add("Locations:");
		lsList.addAll(getLocationNames());
		lsList.add("Items:");
		lsList.addAll(getItemNames());
		return lsList;
	}
	
	public ArrayList<Room> getCurrentCDRooms(){
		return this.currentRoom.getChildren();
	}
	
	public ArrayList<? extends Item> getCurrentLessItems(){
		return this.currentRoom.getItems();
	}
	
	public String getCurrentText() {
		return this.currentRoom.getText();
	}

	public Room getCurrentRoom() {
		return this.currentRoom;
	}

	public void changeRoom(Room r) {
		this.currentRoom = r;
		this.currentIcon = new ImageIcon("graphic/" + r.getIconText() + ".gif");
	}

	public ArrayList<Box> getBoxes() {
		ArrayList<Box> boxes = new ArrayList<Box>();
		for (Room r: this.currentRoom.getChildren()){
			if (r instanceof Box)
				boxes.add((Box)r);
		}
		return boxes;
	}
	
	public void resetAllBoxes(){
		for (Box b: getBoxes())
			b.resetItems();
	}

	public void move(MoveableItem itemToMove, Room box) {
		box.addItem(itemToMove);
		this.currentRoom.removeItem(itemToMove);
	}

	public void linkDankRoomToTunnel() {
		link(dankRoom, tunnel);
	}
	
	public void linkLibraryToBackRoom(){
		link(library, backRoom);
	}

	public Icon getCurrentIcon() {
		return this.currentIcon;
	}
	
	public void setIcon(String imgName){
		this.currentIcon = new ImageIcon("graphics/" + imgName + ".gif");
	}
	
	public Item getCurrentItem(){
		return this.currentItem;
	}
	
	public void setCurrentItem(Item i){
		this.currentItem = i;
	}
	
	public void unlink(){
		dankRoom.removeChild(tunnel);
		tunnel.removeParent(dankRoom);
		library.removeChild(backRoom);
		backRoom.removeParent(library);
	}
	
	/*public void linkClearingAndHouse(){
		link(afterClearing, house);
	}*/
	
	public void libQuestCompleted(){
		libquestcomplete = true;
	}
	
	public boolean isLibQuestFinished(){
		return libquestcomplete;
	}
	
	public void setLibrarianPostQuestText(){
		librarian.setText("\"Thank you, you've been most helpful! Here, take this for your troubles. It's the least I can do.\" The librarian hands you five gold pieces.");
	}
	
	public boolean isRockInPath(){
		return rockinpath;
	}
	
	public void rockMovedFromPath(){
		rockinpath = false;
	}
	
	public void setRockyPathText(){
		rockyPath.setText("The weed-choked path leads off into the farm fields.");
		//link(getRockyPath(), farm);
	}
	
	public void addGearToArtisanShop(String name){
		artisanShop.addItem(new Item(name, "You made this gear.", "item_manuscript"));
	}
	
	public void setArtisanText(int num){
		if (num == 1){
			artisan.setText("\"Well that's lovely, thank you, but you can't expect me to make \n" +
					"anything with just one gear! Can't you copy it? \n" +
					"... \n" +
					"*sigh* I can see you are going to need a lot of training. Just say \"cp ITEM \n" +
					"NEWITEM\". ITEM's the name of the item that you want copy, and NEWITEM is the \n" +
					"new name of the copy, got it? Then poof! You'll have shiny new item. I need five \n" +
					"more gears so you'd better get started! Come back when you've made all five. \n");
		} else if (num == 2){
			artisan.setText("\"Ha, finished already? I guess you learn fast. Well, thanks for \n" +
				"your assistance. Take this.\" The Artisan hands you some gold pieces.");
			artisanShop.removeCommand("touch");
			artisanShop.addCommand("cp");
		} else if (num == 3){
			artisan.setText("\"I need more gears!\"");
		}
		
	}

	public int numGearsMade() {
		return this.numGearsMade;
	}
	
	public void incrementNumGears(){
		this.numGearsMade++;
	}
	
	public boolean hasLearned(String spell){
		return spellsLearned.contains(spell);
	}
	
	public void learnSpell(String spell){
		spellsLearned.add(spell);
	}
	
	public void setNewFarmerText(String txt){
		farmer.setText(txt);
	}

	public void incrementCornCounter() {
		cornCounter++;
	}

	public int getCornCounter() {
		return cornCounter;
	}

	/*public void setRockyPath(Room rockyPath) {
		this.rockyPath = rockyPath;
	}

	public Room getRockyPath() {
		return rockyPath;
	}*/
	
	/*public void switchClearings(){
		link(brokenbridge, afterClearing);
		brokenbridge.setText("A creaky rope bridges stretches across a chasm.\n");
		brokenbridge.removeChild(beforeClearing);
		//beforeClearing.removeParent(brokenbridge);
	}*/
	
	public void fixBridge(){
		bridgesolved=true;
		brokenbridge.setText("A creaky rope bridges stretches across a chasm.\n");
	}
	
	/*public void makeHouseComplete(){
		clearing.setText("There's a small grassy clearing here, with a man sitting on a stone and \n" +
				"sobbing. Behind him is a small white house.\n");
	}*/
	
	public void setTrollText(boolean cage){
		if (cage){
			hideousTroll.setMVText("The troll vanishes with a pop and reappears \n" +
			"inside of the cage. He scowls and then begins to chew on the kidnapped \n" +
			"child's leg. \n");
		} else {
			hideousTroll.setMVText("The troll vanishes with a pop and reappears inside of the cage. He scowls and roars.\n");
		}
	}
	
	public void completeHouseQuest(Room house){
		housequestcomplete = true;
		link(clearing, house);
		clearing.setText("There's a small grassy clearing here, with a man sitting on a stone and " +
		"sobbing. Behind him is a small white house.\n");
		cryingMan.setText("\"Maybe you aren't so bad after all. If you really want "+
				"to help, though, you'll go save my daughter! They took her that way, down that "+
				"ominous-looking path. I heard one of them mutter the word 'brambles_b_gone' as "+
				"they were leaving. It doesn't mean anything to me, but maybe it will help you on "+
				"your journey.\" \n ");
	}
	
	public boolean houseQuestComplete(){
		return housequestcomplete;
	}

	/*public Room getAfterClearing() {
		return afterClearing;
	}*/

	/*public void setOminousPath(Room ominousPath) {
		this.ominousPath = ominousPath;
	}

	public Room getOminousPath() {
		return ominousPath;
	}*/

	/*public void setThornyBrambles(Item thornyBrambles) {
		this.thornyBrambles = thornyBrambles;
	}

	public Item getThornyBrambles() {
		return thornyBrambles;
	}*/

	public void setAwaitingPassword(boolean awaitingPassword) {
		this.awaitingPassword = awaitingPassword;
	}

	public boolean isAwaitingPassword() {
		return awaitingPassword;
	}

	public void setBramblessolved(boolean bramblessolved) {
		this.bramblessolved = bramblessolved;
	}

	public boolean isBramblessolved() {
		return bramblessolved;
	}
	
	public void moveTroll(){
		caveOfTrolls.removeItem(hideousTroll);
		cage.addItem(hideousTroll);
	}
	
	public void moveKid(){
		cage.removeItem(kidnappedChild);
		clearing.addItem(kidnappedChild);
		kidnappedChild.setText("I am so glad to be away from those stinky trolls!");
		kidnappedChild.setIconName("item_boy");
		cryingMan.setText("Oh, thank goodness she's safe!");
		clearing.setText("A man and his daughter are frolicking in front of a lovely house.");
	}
	
	
}

package gameCode;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Code that emulates a terminal
 */
public class Emulator 
{	
	private HashMap<String, Boolean> commandPermissions = new HashMap<String, Boolean>();
	private Game game;
	private boolean expectYN = false;
	
	/**
	 * Creates a new emulator
	 * @param game 
	 */
	public Emulator(Game g)
	{
		initialize();
		game = g;
	}
	
	/**
	 * Prepare new emulator
	 */
	private void initialize()
	{
		//Initalize all commands.  Default command permission is false;
		for(Command c: Command.values())
		{
			commandPermissions.put(c.toString(), false);
		}
		
		//commandPermissions.put("cd", true);
		//commandPermissions.put("ls", true);
		//commandPermissions.put("less", true);
	}
	
	public void setCommandPermission(ArrayList<String> command)
	{
		//Validate command
		
		for (String s: commandPermissions.keySet()){
			if (command.contains(s)){
				commandPermissions.put(s, true);
			} else{
				commandPermissions.put(s, false);
			}
		}
		
		/*if(commandPermissions.containsKey(command))
		{
			commandPermissions.put(command, permission);
			return true;
		}
		
		return false;
		*/
	}
	
	public Game getGame()
	{
		return this.game;
	}
	
	/**
	 * Currently, assume commands are written:
	 * command [command_target]* [-param1 [value1] -param2 [value2] ...]*
	 * 
	 * @param userInput Command to execute
	 */
	public String execute(String userInput) {
		String output = "";
		
		//If the input is blank, return
		if(userInput.equals("")) return "";
		
		//Tokenize input and cause events from user input
		String[] tokens = userInput.split(" ");
		
		//System.out.println("commandperms = " + commandPermissions.keySet());
		
		if (!expectYN){
			//Validate command 
			if(commandPermissions.containsKey(tokens[0]) &&
					commandPermissions.get(tokens[0]) == true)
			{
				//System.out.println("tokens[0] = " + tokens[0]);
				//output = tokens[0] + ": Command found";
				if (tokens[0].equals("cd")){
					if (tokens.length > 1){
						if(game.getCurrentRoom().getName().equals("RockyPath") && game.isRockInPath() && tokens[1].equals("Farm")){
							output = "The large boulder is blocking your way and there are steep ravines off to either side of you.";
						}else if(game.getCurrentRoom().getName().equals("BrokenBridge") && game.bridgesolved==false && tokens[1].equals("Clearing")){
							output = "You are crazy if you set foot on that creaky old bridge! The missing Plank needs to be replaced first.";
						}else if(game.getCurrentRoom().getName().equals("OminousLookingPath") && game.bramblessolved==false && tokens[1].equals("CaveOfDisgruntledTrolls")){
							output = "You can't get into the cave; those spiky brambles are in your way.";
						}else if (tokens[1].equals("..") && game.getCurrentRoom().getParent() != null){
							Room changed = game.getCurrentRoom().getParent();
							game.changeRoom(changed);
							output = changed.getName() + ": \n " + changed.getText();
						}  else {
							Room changed = null;
							boolean exists = false;
							for (Room r: game.getCurrentCDRooms()){
								if (r.getName().equals(tokens[1])){
									if (!(r instanceof Box)){
										game.changeRoom(r);
										//System.out.println("roomtochangeto = " + r.getName());
									}
									changed = r;
									exists = true;
								}
							}
							if (!exists)
								output = "No room of that name\n";
							else{
								output = changed.getName() + ": \n " + changed.getText();
								game.getCurrentRoom().resetMoveableItems();
								if (!tokens[1].equals("Box")){
									game.resetAllBoxes();
								}
								if (!game.isRockInPath()){
									game.setRockyPathText();
								}
							}
						}
					} else {
						output = tokens[0] + ": Need an argument\n";	
					}
				} else if (tokens[0].equals("ls")){
					if (tokens.length > 1){
						for (Box b: game.getBoxes()){
							if (b.getName().equals(tokens[1])){
								for (Item i: b.getItems()){
									output += (i.getName() + "\n");
								}
								if (output.equals(""))
									output = " ";
							}
						}
						if (output.equals("")){
							output = "Cannot look at that object. Try using \"less\"\n";
						}
					} else {
						if (output.equals("")){
							for (String s: game.getCurrentLSList())
								output += (s + "\n");
							game.setIcon(game.getCurrentRoom().getIconText());
						}
					}
				} else if (tokens[0].equals("less")){
					if (tokens.length > 1){
						Item lessed = null;
						for (Item i: game.getCurrentLessItems()){
							if (i.getName().equals(tokens[1])){
								lessed = i;
							}
						}
						game.setCurrentItem(lessed);
						if (lessed instanceof OnceItem){
							game.getCurrentRoom().removeItem((OnceItem)lessed);
						}
						if (lessed == null)
							output = "No item of that name\n";
						else{
							if (lessed.getName().equals("InconspicuousLever"))
								game.linkLibraryToBackRoom();
							if (lessed instanceof YNItem){
								expectYN = true;
							}
							output = lessed.getName() + ": \n " + lessed.getText();
							if (game.isLibQuestFinished()){
								game.setLibrarianPostQuestText();
								output = lessed.getName() + ": \n " + lessed.getText();
							}
							game.setIcon(lessed.getIconName());
						}
					} else
						output = "Need to less something.";
				} else if (tokens[0].equals("mv")){
					if(tokens.length ==3 && game.getCurrentRoom().getName().equals("CaveOfDisgruntledTrolls")){
						if(tokens[1].equals("AbsolutelyHideousTroll")){
							if(tokens[2].equals("Cage")){
								game.moveTroll();
								output = "You throw the troll into the cage! That'll teach him.";
							} else {
								output = "If you move him out of the cave, he'll terrorize the countryside. Also he will probably eat you.";
							}
						} else if(tokens[1].equals("Cage/kidnappedChild") && tokens[2].equals(".")){
							game.moveKid();
							output = "The kid looks around, dazed, surprised to find himself out of the cage. \n" +
							"You smile at him and speak in a gentle voice. 'You should probably be getting home, \n" +
							"little boy. Someone is there waiting for you.' \n" +
							"'I'm a girl,' says the little girl smartly. Then she dashes past you, out of the cave, and \n" +
							"runs up the ominous path towards home.\n";
						} else {
							output = "You can't move that there.";
						}
					}
					else if (tokens.length == 3){
						MoveableItem itemToMove = null;
						Box box = null;
						for (MoveableItem m: game.getMoveableItems()){
							if (tokens[1].equals(m.getName())){
								itemToMove = m;
							}
						}
						for (Box b: game.getBoxes()){
							//System.out.println("box b text = " + b.getName());
							//System.out.println("tokens[2] = " + tokens[2]);
							if (tokens[2].equals(b.getName()))
								box = b;
						}
						if (itemToMove == null){
							for (Item i: game.getCurrentRoom().getItems()){
								if (i.getName().equals(tokens[1])){
									output = i.getMVText();
								}
							}
							if (output.equals(""))
								output = "Sorry you cannot move that. \n";
						} else if (box != null){
							game.move(itemToMove, box);
							if (box.getName().equals("SmallHole"))
								game.linkDankRoomToTunnel();
							if (box.getName().equals("Cage"))
								game.setTrollText(true);
							if (itemToMove.getMVText().equals(""))
								output = itemToMove.getMVText();
							else
								output = "You just moved " + itemToMove.getName() + " into " + box.getName();
							if (itemToMove.getName().equals("Boulder"))
								output = "You move the boulder into the small hole, revealing a tunnel.";
						} else{
							if (tokens[2].equals("Cave")){
								game.move(itemToMove, game.caveOfTrolls);
							}
							output = "Can't move that object there \n";
						}
					} else {
						output = "Need mv OBJECT LOCATION\n";
					}
				} else if (tokens[0].equals("help")){
					for (String s: game.getCurrentRoom().getCommands())
						output += (s + "\n");
				} else if (tokens[0].equals("exit")){
					System.exit(0);
				} else if (tokens[0].equals("man")){
					if (tokens.length > 1){
						if (tokens[1].equals("cd")){
							output = "The old man's voice echoes in your head as if from a great distance: \n" +
									"(Choose Destination) \n" +
									"Use ‘cd’ to move about the world. \n\n" +
									"Command Input: cd LOCATION \n Rememberrrrrr...";
						} else if (tokens[1].equals("ls")){
							output = "The old man's voice echoes in your head as if from a great distance: \n" +
									"(Look at your Surroundings)\n" +
									"Use \"ls\" to look at what’s in a certain location. Either your current location or (rarely) you may have look into a location to see what's in it. \n" +
									"Command Input:\n" +
									"ls			(for current location)\n" +
									"		-OR- \n" +
									"ls LOCATION		(for locations you that you cannot \"cd\" into)\n" +
									"Rememberrrrrr...";
						} else if (tokens[1].equals("less")){
							output = "The old man's voice echoes in your head as if from a great distance:\n" +
									"(Look  at, Examine, or Speak to Something)\n" +
									"Use \"less\" to look at what’s in a certain location. Either your current location or (rarely) you may have look into a location to see what is in it.\n" +
									"Command Input:\n" +
									"less			(for current location)\n" +
									"OR-\n" +
									"less ITEM		(for locations you that you cannot \"cd\" into)\n" +
									"Rememberrrrrr...";
						} else if (tokens[1].equals("mv")){
							output = "The old man's voice echoes in your head as if from a great distance:\n" +
									"(MoVe)\n" +
									"Use \"mv\" to move an object to a new location.\n" +
									"Command Input:\n" +
									"mv OBJECT NEWLOCATION\n" +
									"Rememberrrrrr...";
						} else if (tokens[1].equals("rm")){
							output = "The old man's voice echoes in your head as if from a great distance:\n" +
									"(ReMove)\n" +
									"Use \"rm\" to remove an object. Banishing it completely out of this plane of reality.\n" +
									"Command Input:\n" +
									"rm OBJECTNAME\n" +
									"Rememberrrrrr...";
						} else if (tokens[1].equals("mkdir")){
							output = "The old man's voice echoes in your head as if from a great distance:\n" +
									"(MaKe Dream Into Reality)\n" +
									"Use \"mkdir\" to make new locations.\n" +
									"Command Input:\n" +
									"rm OBJECTNAME\n" +
									"Rememberrrrrr...";
						} else if (tokens[1].equals("grep")){
							output = "The old man's voice echoes in your head as if from a great distance:\n" +
									"(grep)\n" +
									"Use \"grep\" to command your minion to help search through text for you.\n" +
									"Command Input:\n" +
									"grep WORDTOSEARCH PLACETOSEARCH \n" +
									"Rememberrrrrr...";
						} else if (tokens[1].equals("touch")){
							output = "The old man's voice echoes in your head as if from a great distance:\n" +
									"(Touch) gives you the artisan's touch to create new objects.\n" +
									"Use \"touch\" to create new objects in the world.\n" +
									"Command Input:\n" +
									"touch OBJECT\n" +
									"Rememberrrrrr...";
						} else if (tokens[1].equals("cp")){
							output = "The old man's voice echoes in your head as if from a great distance:\n" +
									"(CoPy)\n" +
									"Use \"cp\" to duplicate an item.\n" +
									"Command Input:\n" +
									"cp ITEM NEWNAME\n" +
									"Rememberrrrrr...";
						} else if (tokens[1].equals("exit")){
							output = "The old man's voice echoes in your head as if from a great distance:\n" +
							"(exit)\n" +
							"Use \"exit\" to exit the game permanently.\n" +
							"Command Input:\n" +
							"exit\n" +
							"Rememberrrrrr...";
						} else{
							output = "Come up with a better thing to man.";
						}
					} else {
						output = "Must man a specific command.";
					}
				} else if (tokens[0].equals("grep")){
					if (tokens.length > 2){
						for (Item i: game.getCurrentRoom().getItems()){
							if (i.getName().equals(tokens[2])){
								if (tokens[1].equals("DarkWizard")){
									if (tokens[2].equals("HistoryOfTerminus")){
										output = "Grep finds all of the passages that mention the evil DarkWizard. \nYou should recount your findings to the Librarian.";
										game.libQuestCompleted();
									}else output = "Grep sniffs all over the book but cannot find anything.";
								}
								//if (i instanceof GrepItem){
									//if (tokens[1].equals(((GrepItem)i).getSearchText())){
										//output = ((GrepItem)i).getGrepText();
										//game.libQuestCompleted();
									//}
								//}
							}
						}
						if (output.equals("")){
							output = "\"Grep.\" Says Grep, shaking his head with a shrug. He didn't find anything.";
						}
					} else{
						output = "Can't grep thin air. Need a thing to search for and a place to search.";
					}
				} else if (tokens[0].equals("rm")) {
					if (tokens.length == 2){
						for (Item i: game.getCurrentRoom().getItems()){
							if (i.getName().equals(tokens[1])){
								output = i.getRMText();
							}
						}
						if (tokens[1].equals("LargeBoulder") && game.isRockInPath()){
							game.rockMovedFromPath();
							game.rockyPath.removeItem(game.boulder);
							output = "The boulder vanishes with a pop. The way is clear now!";
						} else if (tokens[1].equals("ThornyBrambles") && game.isBramblessolved()==false){
							game.setAwaitingPassword(true);}
						else if (game.getCurrentRoom().getName().equals("CaveOfDisgruntledTrolls") && tokens[1].equals("UglyTroll") && game.troll1gone==false){
							game.caveOfTrolls.removeItem(game.uglyTroll);
							game.troll1gone = true;
							}
						else if (game.getCurrentRoom().getName().equals("CaveOfDisgruntledTrolls") && tokens[1].equals("UglierTroll") && game.troll2gone==false){
							game.caveOfTrolls.removeItem(game.uglierTroll);
							game.troll2gone = true;
						}
					} else {
						output = "You need to tell me to remove something.";
					}
				} else if (tokens[0].equals("touch")){
					if (tokens.length == 2){
						if(tokens[1].equals("Gear") || tokens[1].equals("gear")){
							game.incrementNumGears();
							if (game.numGearsMade() == 1){
								game.gearName = tokens[1];
								game.getCurrentRoom().addItem(new Item(tokens[1], "You made this object.\n", ""));
								game.setArtisanText(game.numGearsMade());
								output = "Made a new Gear.";
							}
							else{
								output = "Can't make any more gears.";
							}
						} else if (tokens[1].equals("Plank") && game.getCurrentRoom().getName().equals("BrokenBridge")){
							//game.switchClearings();
							game.fixBridge();
							output = "You add the new Plank to the bridge. There! Good as new.";
						} else{
							output = "Can't touch that object.";
						}
					} else {
						output = "Must touch a specific object.";
					}
				} else {
					output = tokens[0] + ": Command not found\n";	
				}
			} else if (tokens[0].equals("cp")){
				if(tokens.length == 3){
					if(tokens[1].equals(game.gearName)){
						if (game.numGearsMade() < 5){
							game.incrementNumGears();
							game.addGearToArtisanShop(tokens[2]);
							game.setArtisanText(3);
							output = "Made a copy of the gear.";
						} else if (game.numGearsMade() == 5){
							game.incrementNumGears();
							game.addGearToArtisanShop(tokens[2]);
							game.setArtisanText(2);
							output = "Made your last gear.";
						} else {
							output = "You can't make any more gears.";
						}
					} else if (tokens[1].equals("EarOfCorn")){
						if(game.getCornCounter() < 8){
							game.incrementCornCounter();
							game.getCurrentRoom().addItem(new Item(tokens[2],"The corn is sad and withered-looking.\n","item_corn"));
							output = "You just made another piece of Corn with your magic! That's "+ game.getCornCounter()+ " so far.";
							game.setNewFarmerText("I need more corn!");
						}
						else if (game.getCornCounter() == 8){
							game.incrementCornCounter();
							game.setNewFarmerText("\"It's a miracle! Thank you, friend. Take these gold \n" +
									"pieces as a token of my gratitude, and may the Admin bless you.\"\n");
							game.getCurrentRoom().addItem(new Item(tokens[2],"The corn is sad and withered-looking.\n","item_corn"));
							output = "Now you have 10 ears of corn total!";
						} else {
							output = "You can't make any more corn.";
						}
					} else {
						output = "You can't copy the "+ tokens[1];
					}
				} else {
					output = "cp: Wrong number of inputs. You need to type cp, then the name of thing you want to copy, then the new name of the copy.";
				}
				
			}else if (tokens[0].equals("mkdir")){
				if(tokens.length == 2){
					if((tokens[1].equals("house") || tokens[1].equals("House")) && game.houseQuestComplete()==false){
						output = "A charming house with a white picket fence springs up out of nowhere.";
						Room house = new Room("House", "You made this house for the man and is family. How thoughtful of you!", "");
						game.completeHouseQuest(house);
					} else if (game.getCurrentRoom().getName().equals("Clearing")){
						output = "The man scowls. 'That isn't what I asked for!'";
					} else {
						output = "You can't use that spell here.";
					}
				} else {
					output = "mkdir: Wrong number of inputs. You need to type mkdir, then the name of place you want to make.";
				}
		} else if(game.isAwaitingPassword()){
			if (tokens[0].equals("brambles_b_gone")){
				output = "The brambles catch fire, choking you with a thick black smoke. When the smoke clears, they're gone.";
				game.ominousPath.removeItem(game.thornybrambles);
				game.setBramblessolved(true);
			} else{
				output = "Red sparks arc across the brambles before fizzling out. They are definitely still there. Nice try though.";
			}
			game.setAwaitingPassword(false);
		} else if (commandPermissions.containsKey(tokens[0]) &&
				commandPermissions.get(tokens[0]) == false){
			output = "You do not know that spell yet.";
		} else{
			output = tokens[0] + ": Command not found\n";	
		}
	} else{
		if (tokens[0].equals("y")){
			if(game.getCurrentRoom().getName().equals("Marketplace")){
				if(game.getCurrentItem().getName().equals("Backpack")){
					output = ((YNItem)game.getCurrentItem()).getYesText();
					//If we actually kept items in backpack, this is where we'd enable it
					game.getCurrentRoom().removeItem(game.getCurrentItem());
				} else if(game.getCurrentItem().getName().equals("rmSpell")){
					if(game.numGearsMade() == 6 && game.isLibQuestFinished()){
						output = ((YNItem)game.getCurrentItem()).getYesText();
						game.learnSpell("rm");
						game.rockyPath.addCommand("rm");
						game.getCurrentRoom().removeItem(game.getCurrentItem());
					} else {
						output = "You don't have enough money to buy that.";
					}
				} else if(game.getCurrentItem().getName().equals("mkdirSpell")){
					if(game.numGearsMade() == 6 && game.isLibQuestFinished()){
						output = ((YNItem)game.getCurrentItem()).getYesText();
						game.learnSpell("mkdir");
						game.getCurrentRoom().removeItem(game.getCurrentItem());
					} else {
						output = "You don't have enough money to buy that.";
					}
				}
			}
		} else if (tokens[0].equals("n")){
			output = ((YNItem)game.getCurrentItem()).getNoText();
		} else{
			output = "y or n expected. Try again.";
		}
		expectYN = false;
	}
	
		return "\n" + output + "\n";
	}
	
	
}
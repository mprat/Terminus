package gameCode;

import java.util.ArrayList;

import javax.swing.Icon;
import javax.swing.ImageIcon;

public class Room {
	private Room parent;
	private ArrayList<Room> children;
	private ArrayList<Item> items;
	private ArrayList<String> commands;
	private String introText = "";
	private String name = "";
	private boolean containsMoveableItems = false;
	private ArrayList<MoveableItem> mov;
	private String icon;
	
	private Room(){
		this.children = new ArrayList<Room>();
		this.items = new ArrayList<Item>();
		this.mov = new ArrayList<MoveableItem>();
		this.commands = new ArrayList<String>();
		this.commands.add("cd");
		this.commands.add("ls");
		this.commands.add("less");
		this.commands.add("man");
		this.commands.add("help");
		this.commands.add("exit");//COMMENT ME OUT IF YOU DON'T WANT TO ALLOW EXIT
		this.name = "Generic room";
		this.introText = "This is a simple room";
	}
	
	public Room(String title, String txt, String iconName){
		this();
		this.name = title;
		this.introText = txt;
		this.icon = iconName;
	}
	
	public ArrayList<String> getCommands(){
		return this.commands;
	}
	
	public Room getParent(){
		return this.parent;
	}
	
	public ArrayList<Room> getChildren(){
		return this.children;
	}
	
	public ArrayList<Item> getItems(){
		return this.items;
	}
	
	public void addItem(Item itm){
		this.items.add(itm);
		if (itm instanceof MoveableItem){
			containsMoveableItems = true;
			this.mov.add((MoveableItem)itm);
		}
	}
	
	public void removeItem(Item itm){
		this.items.remove(itm);
	}
	
	public void removeItem(OnceItem itm){
		this.items.remove(itm);
	}
	
	public void removeItem(MoveableItem itm){
		this.items.remove(itm);
	}
	
	public void addChild(Room r){
		this.children.add(r);
	}
	
	public void addCommand(String c){
		this.commands.add(c);
	}
	
	public void removeCommand(String c){
		this.commands.remove(c);
	}
	
	public void setParent(Room r){
		this.parent = r;
	}
	
	public String getText(){
		return this.introText;
	}

	public String getName() {
		return this.name;
	}
	
	public void resetMoveableItems(){
		if (containsMoveableItems){
			this.items.clear();
			for (MoveableItem m: this.mov){
				this.items.add((Item)m);
			}
		}
	}
	
	public String getIconText(){
		return this.icon;
	}

	public void removeChild(Room r) {
		if (this.children.contains(r))
			this.children.remove(r);
	}
	
	public void removeParent(Room r){
		if (this.parent != null)
			this.parent = null;
	}
	
	public void setText(String s){
		this.introText = s;
	}
}

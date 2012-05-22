package gameCode;

import javax.swing.ImageIcon;

public class Box extends Room {
	/*
	 * Box: 
	 * Note 1: This is a directory inside PracticeRoom so that 
	 * players can try moving PracticeDummies in and out of this Box. 
	 * Note 2: This directory should not be accessible by ‘cd’ an attempt 
	 * (cd Box) should give text: "The box is too small for you to fit into. 
	 * Trying “looking” into the box to see what’s inside (ls Box)." 
	 */
	
	public Box(String txt, String flavor){
		super(txt, flavor, "item_box");
		super.addCommand("mv");
	}
	
	public Box(String txt, String flavor, String img){
		super(txt, flavor, img);
		super.addCommand("mv");
	}
	
	public void resetItems(){
		super.getItems().clear();
	}
}

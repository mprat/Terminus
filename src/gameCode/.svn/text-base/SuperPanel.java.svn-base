package gameCode;

import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.util.ArrayList;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;


//the panel that contains the split frame

public class SuperPanel extends JFrame implements KeyListener{

	private static final long serialVersionUID = 1L;
	private JSplitPane splitPane;
	private JSplitPane leftPane;
	private JTextArea terminal;
	private JTextField input;
	private JScrollPane scrollPane;
	private JLabel graphic;
	private final static String newline = "\n";
	private Emulator emulator;// = new Emulator();
	private Game game;
	// Records the last command entered by the user.  Used to cycle through past commands when a user
	// presses the "UP" arrow
	private ArrayList<String> lastCommand = new ArrayList();
	private int lastCommandIndex = 0;
	// Records the number of matches when using "TAB" for auto-complete
	private ArrayList<String> matches = new ArrayList<String>();
	private String incomplete = "";
	private int matchIndex = 0;
	private Boolean cyclingTab = false;
	
	public SuperPanel(){
		super("Terminus");
        
		game = new Game();
		emulator = new Emulator(game);
		lastCommand.add(0, ">");
		
        // call System.exit() when user closes the window
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        
        terminal = new JTextArea();
        terminal.setLineWrap(true);
        terminal.setBackground(Color.white);
        terminal.setFont(new Font("monospace", Font.BOLD, 14));
        terminal.append(game.getCurrentText());
        terminal.setEditable(false);
        
        //set room and emulator permissions
		setRoomAndPermissions();
		
		input = new JTextField(terminal.getWidth());
        input.setText(">");
        input.setFocusable(true);
        input.addKeyListener(this);
        input.setFocusTraversalKeysEnabled(false);
        
        scrollPane = new JScrollPane(terminal);
        scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
        scrollPane.setPreferredSize(new Dimension(600, 600));

        leftPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT, scrollPane, input);
        
        graphic = new JLabel();
        graphic.setPreferredSize(new Dimension(600, 600));
        graphic.setHorizontalAlignment(JLabel.CENTER);
        graphic.setVerticalAlignment(JLabel.CENTER);
        //graphic.setBackground(Color.black);
        graphic.setIcon(new ImageIcon("graphics/titlescreen.gif"));
        
        splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, leftPane, graphic);
        splitPane.setResizeWeight(0.5);        
        splitPane.setContinuousLayout(true);
        splitPane.setBackground(Color.black);
        
        Container cp = this.getContentPane();
        cp.add(splitPane);
        
        this.pack();        
	}
	
	private void setRoomAndPermissions(){
		emulator.setCommandPermission(game.getCurrentRoom().getCommands());
	    terminal.setCaretPosition(terminal.getDocument().getLength());
	    //System.out.println("currroom = " + game.getCurrentRoom().getName());
	    //System.out.println("currroomperms = " + game.getCurrentRoom().getCommands());
	}
	
	public static void main(String[] args){
		SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new SuperPanel().setVisible(true);
            }
        });
	}
	
	/**
	 * When you press enter in the textArea it right now prints
	 * to the system.out but that stuff can be routed to any reader/writer
	 */
	@Override
	public void keyPressed(KeyEvent arg0) {
		int key = arg0.getKeyCode();
		
		//Key is not tab, set cycling tab to false
		if (key != KeyEvent.VK_UP) cyclingTab = false;
		
		if (key == KeyEvent.VK_ENTER) {
	    	 lastCommandIndex = -1;
	    	 lastCommand.add(0, input.getText());
	    	 final String text = input.getText().replace(">", "");
		     final String[] lines = text.split(newline);
		     SwingUtilities.invokeLater(new Runnable(){
				@Override
				public void run() {
				     terminal.append(text + "\n" + emulator.execute(lines[lines.length - 1]));
				     //Make sure the new text is visible, even if there
				     //was a selection in the text area.
				     terminal.setCaretPosition(terminal.getDocument().getLength());
				     graphic.setIcon(game.getCurrentIcon());
				     input.setText(">");
				     setRoomAndPermissions();
				}
		     });
		     
		     //update emulator as necessary
		     //System.out.println("currroom = " + game.getCurrentRoom().getName());
		     //System.out.println("currroomperms = " + game.getCurrentRoom().getCommands());
	     }
	     else if (key == KeyEvent.VK_UP){
	    	 lastCommandIndex = (lastCommandIndex + 1)% lastCommand.size();
	    	 input.setText(lastCommand.get(lastCommandIndex));
	     }
	     else if (key == KeyEvent.VK_TAB){
	    	 String text = input.getText().replace(">", "");
	    	 //If we have not already pressed tab, then we want to rebuild our matches
	    	 if(!cyclingTab){
		    	 matches.clear();
		    	 matchIndex = 0;
		    	//Take the text from the current index to the previous space.
		    	//If it matches an appropriate item/location/command/etc
		    	 int caretPos = input.getCaretPosition()-1;
	    		 int lastSpace = text.substring(0, caretPos).lastIndexOf(" ");
	    		 
	    		 if(lastSpace == caretPos ||	// We are auto-completing a space " "
	    				 lastSpace == -1){		// We find no previous space
	    			 return;
	    		 }
	    		 incomplete = text.substring(lastSpace+1, caretPos); 
		    	 
	    		 //CD, LS
		    	 //Only auto-fill locations
		    	 if(text.startsWith("cd ") || 
		    			 text.startsWith("ls "))
		    	 {
		    		 ArrayList<String> locations = emulator.getGame().getLocationNames();
		    		 for(String location : locations)
		    		 {
	    				if(location.startsWith(incomplete))
	    				{
	    					matches.add(location);
	    				}
	    			 }
		    	 }
		    	 //LESS, GREP, RM, MV
		    	 //Only auto-fill items
		    	 else if (text.startsWith("less ") || 
		    			 text.startsWith("grep ") || 
		    			 text.startsWith("rm ") || 
		    			 text.startsWith("mv "))
		    	 {
		    		 ArrayList<String> items = emulator.getGame().getItemNames();
		    		 for(String item : items)
		    		 {
	    				if(item.startsWith(incomplete))
	    				{
	    					matches.add(item);
	    				}
	    			 }
		    	 }
		    	 //HELP, MKDIR, TOUCH, or nonsense does not autocomplete
		    	 cyclingTab = true;
	    	 }
	    	 
	    	 //Replace from current carrot position to position after space
	    	 if(matches.size()>0){
		    	 text = ">" + text.replace(incomplete, matches.get(matchIndex));
		    	 input.setText(text);
		    	 input.setCaretPosition(text.indexOf(matches.get(matchIndex))+matches.get(matchIndex).length());
		    	 incomplete = matches.get(matchIndex);
		    	 matchIndex = (matchIndex + 1)%matches.size();
	    	 }
	    	 
	     }
	     else{
	    	 cyclingTab = false;
	     }
	}

	@Override
	public void keyReleased(KeyEvent arg0) {}
	@Override
	public void keyTyped(KeyEvent arg0) {}
	
}

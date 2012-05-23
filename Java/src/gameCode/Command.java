package gameCode;

public enum Command {
	//PWD ("pwd"),
	EXIT ("exit"),	//Acts on NOTHING
	LESS ("less"), 	//Acts on items
	GREP ("grep"), 	//Acts on items
	CD ("cd"), 		//Acts on locations
	MV ("mv"),		//Acts on items
	LS ("ls"),		//Acts on locations
	MAN ("man"),	//Acts on commands
	HELP("help"),	//Acts on NOTHING
	RM("rm"),		//Acts on items
	MKDIR("mkdir"),	//Acts on NOTHING
	TOUCH("touch");	//Acts on NOTHING
	
	private final String string; //String to accept in terminal
	Command(String str){
		this.string = str;
	}
	
	@Override
	public String toString(){
		return string;
	}
}

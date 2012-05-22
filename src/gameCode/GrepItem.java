package gameCode;

public class GrepItem extends Item{

	private String searchText;
	private String grepText;
	
	public GrepItem(String name, String text, String imgName, String searchText, String grepText) {
		super(name, text, imgName);
	}

	public String getSearchText() {
		return searchText;
	}
	
	public String getGrepText(){
		return grepText;
	}

}

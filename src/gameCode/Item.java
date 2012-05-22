package gameCode;

public class Item {
	private String text = "";
	private String name = "";
	private String imgFileName = "";
	private String rmText = "";
	private String mvText = "";
	private boolean rm = false;
	
	public Item(String name, String text, String imgName){
		this.name = name;
		this.text = text;
		this.imgFileName = imgName;
	}

	public String getName() {
		return this.name;
	}
	
	public void setText(String string){
		text = string;
	}
	
	public String getText(){
		return this.text;
	}

	public void setRMText(String string) {
		rmText = string;
	}
	
	public String getRMText() {
		return rmText;
	}
	
	public void setMVText(String string){
		mvText = string;
	}

	public String getMVText() {
		return mvText;
	}
	public String getIconName() {
		return imgFileName;
	}
	public void setIconName(String imgName) {
		this.imgFileName = imgName;
	}
	public void setRM(boolean rm){
		this.rm = rm;
	}
}

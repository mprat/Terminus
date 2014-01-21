* There is a list of default commands that the game "knows". The default for any given command is to print out "You don't have the power to do that."
* Each command comes with a default "action" that is a function that does some action
* A room / connections list can be specified through an XML file that will be parsed into the Javascript
* Each room has items in it
* Each room knows what rooms it is connected to and which room it came from
* Each room specifies which commands it turns on with a dictionary of functions
* Each room has a picture associated with it, along with welcome text
* The man file is written as a .txt file and parsed into the javascript by an interpreter
* Game has a "state": what current room you are in
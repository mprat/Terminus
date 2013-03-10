// set the current room
var current_room = Home;

$(document).ready(function() {
    $('#term').terminal(function(input, term) {
        var split = input.split(" ");
        var command = split[0].toString();
        var args = split.splice(1,split.length);
        if( current_room.commands.indexOf(command) > -1 ){ //Could use current_room.hasOwnProperty(command)
            term.echo(current_room[command](args));
        }
        else{
            term.echo("Command '"+command+"' not found in room '"+current_room.room_name+"'");
        }
    }, { history: true,                     // Keep user's history of commands
        prompt: '>',                        // Text that prefixes terminal entries
        name: 'terminus_terminal',          // Name of terminal
                                            // Signiture to include at top of terminal
        greetings:"Welcome! If you are new to the game, here are some tips: \n\n" +
		"Look at your surroundings with the command \"ls\". \n" +
		"Move to a new location with the command \"cd LOCATION\" \n" +
		"You can backtrack with the command \"cd ..\". \n" +
		"Interact with things in the world with the command \"less ITEM\" \n\n" +
		"Go ahead, explore. We hope you enjoy what you find. Do ls as your first command.\n",
        exit: false,                        // Disable 'exit' command
        clear: false,                       // Disable 'clear' command
        });
});
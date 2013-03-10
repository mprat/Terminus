// set the current room
var current_room = Home;
var man_pages = {"cd": "the cd man pages", 
"mv": "the mv man pages",
"ls": "the ls man pages", 
"less": "the less man pages", 
"man": "the man man pages", 
"help": "the help man pages", 
"exit": "the exit man pages", 
"cp": "the cp man pages", 
"pwd": "the pwd man pages",
"grep": "the grep man pages",
"touch": "the touch man pages"}

$(document).ready(function() {
    $('#term').terminal(function(input, term) {
        var split = input.split(" ");
        var command = split[0].toString();
        var args = split.splice(1,split.length);
        if( current_room.commands.indexOf(command) > -1 ){ //Could use current_room.hasOwnProperty(command)
            term.echo(current_room[command](args));
            if (command in current_room.cmd_text){
                term.echo(current_room.cmd_text[command]);
            }
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
        "If you forget where you are, type \"pwd\" \n\n" + 
		"Go ahead, explore. We hope you enjoy what you find. Do ls as your first command.\n",
        exit: false,                        // Disable 'exit' command
        clear: false,                       // Disable 'clear' command
        });
    
    // Clear history on page reload
    $("#term").terminal().history().clear();
    
    //Tab Completion FOR LAST ARGUMENT
    $(window).keyup(function(event){
        if(event.keyCode == 9){
            var command = $("#term").terminal().get_command().replace(/\s+$/,"");
            var split_command = command.split(" ");
            var last_arg = split_command.pop();
            //Start in a room, try to move through path, and if we get to the end
            // check whether a room/item could complete our trip
            
            //Get starting room
            var search_room;
            if(last_arg.substring(0,1) == "/"){
                search_room = Home;
            }
            else{
                search_room = jQuery.extend(true, {}, current_room);
            }
            //Iterate through each room
            var path_rooms = last_arg.split("/");
            var new_room;
            var incomplete_room;
            var substring_matches = [];
            for (room_num=0;room_num<path_rooms.length;room_num++)
            {
                new_room = search_room.can_cd(path_rooms[room_num]);
                if(new_room){
                    search_room = new_room;
                }
                else{
                    //We've made it to the final room,
                    // so we should look for things to complete our journey
                    if(room_num == path_rooms.length-1){
                        //Compare to this room's children
                        for(child_num = 0; child_num<search_room.children.length; child_num++){
                            if(search_room.children[child_num].room_name.match(path_rooms[room_num])){
                                substring_matches.push(search_room.children[child_num].room_name);
                            }
                        }
                        //Compare to this room's items
                        for(item_num = 0; item_num<search_room.items.length; item_num++){
                            if(search_room.items[item_num].itemname.match(path_rooms[room_num])){
                                substring_matches.push(search_room.items[item_num].itemname);
                            }
                        }
                        
                        //If one match exists
                        if(substring_matches.length == 1){
                            path_rooms.pop();
                            path_rooms.push(substring_matches[0]);
                            split_command.push(path_rooms.join("/"))
                            $("#term").terminal().set_command(split_command.join(" "));
                        }
                        //If multiple matches exist
                        else if(substring_matches.length > 1){
                            split_command.push(last_arg)
                            $("#term").terminal().echo(">"+split_command.join(" ").replace(/\s+$/,""));
                            $("#term").terminal().echo(substring_matches.join(" "));
                            $("#term").terminal().set_command(split_command.join(" ").replace(/\s+$/,""));
                        }
                        //If no match exists
                        else{
                            //DO NOTHING (except remove TAB)
                            $("#term").terminal().set_command(command.replace(/\s+$/,""));
                        }
                    }
                    else{
                        //DO NOTHING (except remove TAB)
                        $("#term").terminal().set_command(command.replace(/\s+$/,""));
                    }
                }
            }
        }
    });
});
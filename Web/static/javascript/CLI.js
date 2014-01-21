$(document).ready(function() {
	$('#term').terminal(function(command, term) {
	    term.echo('unknown command');
	}, {
		prompt: '> ', 
		greetings: "A new version of Terminus",
		history: true
	});
});
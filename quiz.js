$( document ).ready(function() {
	var oIterator = 0;
	var nIterator = 0;
	loadHeadline();
	$( "#onion" ).click(function(event){
		//onion clicked
		if(onion) {
			$("#answer-text").html("Correct!");
		}
		else {
			$("#answer-text").html("Wrong!");
		}
		$(" #answer ").removeClass("hidden");
	});
	$( "#not" ).click(function(event){
		//not clicked
		if(!onion) {
			$("#answer-text").html("Correct!");
		}
		else {
			$("#answer-text").html("Wrong!");

		}
		$(" #answer ").removeClass("hidden");
	});
	$(" #continue ").click(function(event){
		$(" #answer ").addClass("hidden");
		loadHeadline();
	});
});

function loadHeadline() {
	$.getFeed({
	   url: 'http://reddit.com/r/nottheonion/.rss',
	   success: function(feed) {
	     alert(feed.title);
	   }
	 });
}



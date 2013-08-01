$( document ).ready(function() {
	if(!localStorage.getItem('visited')) {
		$("#about").modal("show");
		localStorage.setItem('visited', "true");
	}
	var oIterator = 0;
	var nIterator = 0;
	var onion;
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
	$("#not").click(function(event){
		//not clicked
		if(!onion) {
			$("#answer-text").html("Correct!");
		}
		else {
			$("#answer-text").html("Wrong!");

		}
		$(" #answer ").removeClass("hidden");
	});
	$("#startover").click(function(event){
		oIterator=0;
		nIterator=0;
		loadHeadline();
	});
	$(" #continue ").click(function(event){
		$(" #answer ").addClass("hidden");
		loadHeadline();
	});

	function loadHeadline() {
		onion = (Math.floor(Math.random()*2)==1);
		if(onion){
			parseRSS("http://feeds.theonion.com/theonion/daily", function(data){
				var entries = data.entries;
				if(entries[oIterator]) {
					title = entries[oIterator].title;
					oIterator++;
					$("#headline-text").html(title);
				}
				else {
					$("#alldone").modal("show");
				}
			});
		}
		else {
			parseRSS("http://www.reddit.com/r/nottheonion/.rss", function(data){
				var entries = data.entries;
				if(entries[nIterator]) {
					title = entries[nIterator].title;
					nIterator++;
					$("#headline-text").html(title);
				}
				else {
					$("#alldone").modal("show");
				}
			});
		}
	}

});



function parseRSS(url, callback) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      callback(data.responseData.feed);
    }
  });
}


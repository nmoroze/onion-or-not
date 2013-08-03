$( document ).ready(function() {
	if(!localStorage.getItem('visited')) {
		$("#about").modal("show");
		localStorage.setItem('visited', "true");
	}

	parseRSS("http://feeds.theonion.com/theonion/daily", function(data){
		for(var i=0; i<data.entries.length; i++) {
			data.entries[i].src="onion"
		}
		var onionEntries = data.entries;
		parseRSS("http://www.reddit.com/r/nottheonion/.rss", function(data){
			for(var i=0; i<data.entries.length; i++) {
				data.entries[i].src="reddit"
			}
			var notEntries = data.entries;
			var allEntries = onionEntries.concat(notEntries);	
			allEntries = shuffle(allEntries);
			console.log(allEntries);
			nextHeadline(allEntries, 0);		
		});
	});
});

function nextHeadline(headlines, question) {
	if(question<headlines.length) {
		$("#headline-text").html(headlines[question].title);
		$("#onion").click(function(){
			buttonClicked("onion", headlines, question);
		});
		$("#not").click(function(){
			buttonClicked("reddit", headlines, question);
		});
	}
	else {
		$("#alldone").modal("show");
		$("#startover").click(function(){
			nextHeadline(headlines, 0);
		});
	}
}

function buttonClicked(ans, headlines, question) {
	console.log("button");
	if(ans==headlines[question].src) {
		$("#answer-text").html("Correct! Click either button to move on.");
	}
	else {
		$("#answer-text").html("Nope! Click either button to move on.");
	}
	$("#link-text").html("<a href='"+headlines[question].link+"'>Link to article</a>.");
	$("#answer").removeClass("hidden");

	$("#onion").click(function(){
		$("#answer").addClass("hidden");
		nextHeadline(headlines, question+1);
	});
	$("#not").click(function(){
		$("#answer").addClass("hidden");
		nextHeadline(headlines, question+1);
	});
}

function parseRSS(url, callback) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      callback(data.responseData.feed);
    }
  });
}

//http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
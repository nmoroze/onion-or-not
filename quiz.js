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

			headline.init(allEntries);
			buttons.init();
			headline.show();
		});
	});
});

var answerDisplay = function() {
	var show = function(isCorrect, link) {
		if(isCorrect) {
			$("#answer-text").html("Correct! Click either button to go on.");
		}
		else {
			$("#answer-text").html("Wrong! Click either button to go on.");
		}
		$("#link-text").html("<a href='"+link+"'>Link to article</a>.");
		$("#answer").removeClass("hidden");
	}

	var hide = function() {
		$("#answer").addClass("hidden");
	}

	return {
		show: show,
		hide: hide
	}
} ();

var buttons = function() {
	var setAnswer = function() {
		$("#onion").unbind("click").click(function() {
			console.log("clicked");
			answerDisplay.show(headline.verify("onion"),headline.getLink());

			setContinue();
		});
		$("#not").unbind("click").click(function() {
			console.log("clicked");
			answerDisplay.show(headline.verify("reddit"),headline.getLink());
			setContinue();
		});
	}

	var setContinue = function() {
		console.log("setContinue");
		$("#onion, #not").unbind("click").click(function() {
			console.log("clicked");
			answerDisplay.hide();
			headline.next();
			setAnswer();
		});
	}

	return {
		init: setAnswer
	}
} ();

var headline = function() {
	var current = 0,
	data = [];

	var init = function(headlines) {
		data=headlines;
	}

	var show = function() {
		console.log("show");
		$("#headline-text").html(data[current].title);
	}

	var next = function() {
		console.log("next");
		current++;
		if(current<data.length) {
			show();
		}
		else {
			$("#alldone").modal("show");
			$("#startover").click(function() {
				current=0;
				show();
			});
		}
	}

	var getLink = function() {
		return data[current].link;
	}

	var verifyAnswer = function(answer) {
		return (data[current].src==answer);
	}

	return {
		init: init,
		show: show,
		next: next,
		getLink: getLink,
		verify: verifyAnswer
	}
} ();

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
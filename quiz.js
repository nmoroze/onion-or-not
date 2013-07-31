var onion=true; 
$( document ).ready(function() {
	$( "#onion" ).click(function(event){
		//onion clicked
		if(onion) {
			$(" #answer ").html("Correct!");
		}
		else {
			$(" #answer ").html("Wrong!");
		}
		$(" #answer ").removeClass(".hidden");
	});
	$( "#not" ).click(function(event){
		//not clicked
		if(!onion) {
			$(" #answer ").html("Correct!");
		}
		else {
			$(" #answer ").html("Wrong!");

		}
		$(" #answer ").removeClass("hidden");

	});
});
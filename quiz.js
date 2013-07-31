var onion=true; 
$( document ).ready(function() {
	alert("hi!"); 
	$( "#onion" ).click(function(event){
		//onion clicked
		if(onion) {
			//correct
		}
		else {
			//wrong
		}
	});
	$( "#not" ).click(function(event){
		//not clicked
		if(!onion) {
			//correct
		}
		else {
			//wrong
		}
	});
});
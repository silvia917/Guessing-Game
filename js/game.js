$(document).ready(function() {
	//creating initial variables
	var compNumber = Math.floor(Math.random() * 100) + 1
	var guess = 0;
	var guesses = [];
	var numGuesses = 0;
	var difference = 0;

	$('body').append('<img src= "./images/fluffy.jpg">');

	//function to check if input is a number and within range
	function goodNum(num) {
		if ((!isNaN(num)) && (num > 0) && (num < 101)) {
			return true}
		else { 
			return false}
		};

	/*function that tells how close guess is to actual number.
	only takes one number, a 'difference' to be calculated later */

	function hotCold(x) {
		switch(true) {
			case (x < -25):
				return "Freezing Cold" + '\n' + "Guess Lower!";
			case (x <= -10):
				return "Cold!" + '\n' + "Guess Lower!";
			case (x <= -5):
				return "Warm" + '\n' + "Guess Lower!";
			case (x < 0):
				return "Hot!!" + '\n' + "Guess Lower!";
			case (x === 0):
				return "Yay!!" + '\n' + "You Win!!";
			case (x <= 5):
				return "Hot!!" + '\n' + "Guess Higher!";
			case (x <= 10):
				return "Warm" + '\n' + "Guess Higher!";
			case (x <= 25):
				return "Cold!" + '\n' + "Guess Higher!";
			case (x > 25):
				return "Freezing Cold" + '\n' + "Guess Higher!";
	}};

	//user can submit a guess using the enter key

	$('#guessing').keypress(function(e) {
    	if(e.which == 13) {
        	$('.submit').click();
    	}
	});

	//when 'hint' button is clicked, the number is revealed
	$('button').on('click', function() {
		$('#message').text("The number is " + compNumber);
	});

	$('#reset').on('click', function() {
		for (i = 1; i <= 5; i++) {
			$('#guess' + i).text("");
		};
		$('#message').text("");
		compNumber = Math.floor(Math.random() * 100) + 1;
		guess = 0;
		guesses = [];
		numGuesses = 0;
		$('#guessing').val("");
		$('img').hide();	
	});


	$('.submit').on('click', function() {
		//user's input it assigned variable number
		var number = $('#guessing').val();
		//makes sure user hasn't already guessed 5 times
		if (numGuesses < 5) {
			//checks to see if input is valid by using previously defined function
			if (goodNum(number)) {
				guess = number;
				if (guesses.indexOf(guess) !== -1) {
					$('#message').text("...but you've guessed that before!");}
				else {	
					numGuesses += 1;
					$('#message').text((5 - numGuesses) + " guesses left!");
					guesses.push(guess);
					difference = compNumber - guess;
					$('#guess' + numGuesses).text(guess + '\n' + hotCold(difference));
					if (difference === 0) {
						$('#message').text("Yay!! A Fluffy Unicorn!");
						$('img').show();	
					}
				}}
			else {
				$('#message').text("Seems like someone doesn't want a prize...");
			};}
		else {
			$('#message').text("Sorry! No More Guesses. Click Reset to Play Again!");}
});
});


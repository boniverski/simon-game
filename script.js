// Initialize audio variales:
var greenAudio  = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var redAudio    = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio   = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// Initialize all game variables:
var game = [];
var user = [];
var rand = 1;
var count = 0;
var counter = 0;
var userCount = 0;
var n = 0;

// User click events trigget functions for each button:
$('#green').click(function() {
	green();
	user.push(1);
	userPlay();
});

$('#red').click(function() {
	red();
	user.push(2);
	userPlay();
});

$('#yellow').click(function() {
	yellow();
	user.push(3);
	userPlay();
});

$('#blue').click(function() {
	blue();
	user.push(4);
	userPlay();
});

// Functions for each button:
function green() {
	reset();
	$('#green').toggleClass("clickedGreen");
	greenAudio.play();
}

function red() {
	reset();
	$('#red').toggleClass("clickedRed");
	redAudio.play();
}

function yellow() {
	reset();
	$('#yellow').toggleClass("clickedYellow");
	yellowAudio.play();
}

function blue() {
	reset();
	$('#blue').toggleClass("clickedBlue");
	blueAudio.play();
}

// Reset function for all buttons:
function reset() {
	$("#green").removeClass("clickedGreen");
	$("#red").removeClass("clickedRed");
	$("#yellow").removeClass("clickedYellow");
	$("#blue").removeClass("clickedBlue");
}

// Game start function:
$("#startGame").click(function() {
	if ( w > 0 ) {
		$(".green").removeClass("greenWinner");
		$(".red").removeClass("redWinner");
		$(".yellow").removeClass("yellowWinner");
		$(".blue").removeClass("blueWinner");

		n = 0;
		game = [];
		user = [];
		count = 0;
		counter = 0;
		userCount = 0;
		document.getElementById("gameCounter").innerHTML = 1;
		machine();
	}
	else {
		console.log("Game is off");
	}
});

var z = -1;
var w = -1;

// Input switches control On/Off State and Strict Mode:
$('#switchRight').change(function(){
	z *= -1;
	console.log("Strict Mode On/Off");
});

$('#switchLeft').change(function(){

	w *= -1;
	console.log("Game On/Off");
	if ( w > 0 ) {
		$("#startGame").css("color", "white");
	}

	if ( w < 0 ) {
		n = 0;
		game = [];
		user = [];
		count = 0;
		counter = 0;
		userCount = 0;
		reset();
		document.getElementById("gameCounter").innerHTML = "--";

		$("#startGame").css("color", "rgb(200,200,200");

		$(".green").removeClass("greenLoser");
		$(".red").removeClass("redLoser");
		$(".yellow").removeClass("yellowLoser");
		$(".blue").removeClass("blueLoser");

		$(".green").removeClass("greenWinner");
		$(".red").removeClass("redWinner");
		$(".yellow").removeClass("yellowWinner");
		$(".blue").removeClass("blueWinner");
	}
});

// Computer plays function:
function machine() {
	var x = 1;
	function clear() {
		clearInterval(machine);
	}
	if ( count > 0 ) {
		x = 0;
	}

	var machine = setInterval(function() {
			reset();
			random();
			simon();
			count++;

			// Resets buttons after machine plays final round, so the user can continue:
			if (count === counter + 1) {
				clear();
				setTimeout(function() {
					reset();
				}, 500);
			}
		 // 500 millisecond pause before first button press
	}, 750 * x); // Pause between iterations of button press functions

};

// Generate a random number between 1 and 4 for each round:
function random() {
	rand = Math.floor((Math.random() * 4) + 1);
	game.push(rand);
	return rand;
}

// Assign the number to a button:
function simon() {
	if (rand === 1) {
		green();
		console.log("Clicked Green");
	}
	else if (rand === 2) {
		red();
		console.log("Clicked Red");
	}
	else if (rand === 3) {
		yellow();
		console.log("Clicked Yellow");
	}
	else if (rand === 4) {
		blue();
		console.log("Clicked Blue");
	}
}

// Parse user input:
function userPlay() {
	// Game ends function:
	if ( user[userCount] === game[userCount] && game.length === 20 && user.length === game.length ) {
		console.log("Game over, you win!");

		$(".green").addClass("greenWinner");
		$(".red").addClass("redWinner");
		$(".yellow").addClass("yellowWinner");
		$(".blue").addClass("blueWinner");

		document.getElementById("gameCounter").innerHTML = "Win!";
	}

	// User correctly completed a round:
	else if ( user.length === game.length && user[userCount] === game[userCount] ) {
		console.log("Correct!");
		user = [];
		userCount = 0;

		setTimeout(function() {
			counter++;
			document.getElementById("gameCounter").innerHTML = counter + 1;
			reset();
			check();
		}, 500);
	}

	// User correctly identifies next element in series:
	else if ( user[userCount] === game[userCount] ) {
		console.log("Correct!");
		userCount++;
		setTimeout(function() {
			reset();
		}, 500);
	}

	else if ( z > 0 ) {

		console.log("Wrong!");
		game = [];
		user = [];
		count = 0;
		counter = 0;
		n = 0;
		document.getElementById("gameCounter").innerHTML = "Wrong!";

		$(".green").addClass("greenLoser");
		$(".red").addClass("redLoser");
		$(".yellow").addClass("yellowLoser");
		$(".blue").addClass("blueLoser");
		// This is the restart function for strict mode:
		setTimeout(function() {

			document.getElementById("gameCounter").innerHTML = 1;

			$(".green").removeClass("greenLoser");
			$(".red").removeClass("redLoser");
			$(".yellow").removeClass("yellowLoser");
			$(".blue").removeClass("blueLoser");
			machine();
		}, 1750);
	}

	else {
		n = 0;

		document.getElementById("gameCounter").innerHTML = "Wrong!";

		$(".green").addClass("greenLoser");
		$(".red").addClass("redLoser");
		$(".yellow").addClass("yellowLoser");
		$(".blue").addClass("blueLoser");

		setTimeout(function() {
			$(".green").removeClass("greenLoser");
			$(".red").removeClass("redLoser");
			$(".yellow").removeClass("yellowLoser");
			$(".blue").removeClass("blueLoser");

			document.getElementById("gameCounter").innerHTML = counter + 1;
			document.getElementById("gameTitle").innerHTML = "Simon<sup>®</sup>";
			checkRepeat();
		}, 750);
	}
}

// Repeat function for subsequent game rounds:
function repeat() {
	if ( game[n] === 1 ) {
		green();
		n++;
	}
	else if ( game[n] === 2) {
		red();
		n++;
	}
	else if ( game[n] === 3) {
		yellow();
		n++;
	}
	else if (game[n] === 4) {
		blue();
		n++;
	}
}

// Check if the computer has iterated to the current round:
function check() {
	function clear() {
		clearInterval(timeFunction);
	}

	var timeFunction = setInterval(function() {
		reset();
		if ( n !== game.length ) {
			repeat();
		}
		else if ( n === game.length ) {
			user = [];
			userCount = 0;
			n = 0;
			clear();
			machine();
		}
	}, 750);

}

// Check function for when the user fails a round (normal mode):
function checkRepeat() {
	function clear() {
		clearInterval(timeFunction);
	}

	var timeFunction = setInterval(function() {
		reset();
		if ( n !== game.length ) {
			repeat();
		}
		else if ( n === game.length ) {
			user = [];
			userCount = 0;
			n = 0;
			clear();
		}
	}, 750);
}

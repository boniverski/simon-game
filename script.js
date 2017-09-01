var greenAudio  = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var redAudio    = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio   = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

var game = [];
var user = [];
var rand = 1;
var count = 0;
var counter = 0;
var userCount = 0;
var n = 0;

// Click handler for all areas within toy
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

// Handling start of game
$("#startGame").click(function() {
	if ( w > 0 ) {
		$(".green").removeClass("greenWin");
		$(".red").removeClass("redWin");
		$(".yellow").removeClass("yellowWin");
		$(".blue").removeClass("blueWin");

		n = 0;
		game = [];
		user = [];
		count = 0;
		counter = 0;
		userCount = 0;
		document.getElementById("gameCounter").innerHTML = 1;
		machine();
	}
});

var z = -1;
var w = -1;

$('#switchRight').change(function(){
	z *= -1;
});

$('#switchLeft').change(function(){

	w *= -1;
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

		$(".green").removeClass("greenLose");
		$(".red").removeClass("redLose");
		$(".yellow").removeClass("yellowLose");
		$(".blue").removeClass("blueLose");

		$(".green").removeClass("greenWin");
		$(".red").removeClass("redWin");
		$(".yellow").removeClass("yellowWin");
		$(".blue").removeClass("blueWin");
	}
});

// Handiling computer move
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

			// Resets buttons after computer plays final round, so the user can continue:
			if (count === counter + 1) {
				clear();
				setTimeout(function() {
					reset();
				}, 500);
			}
	}, 750 * x);

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

		$(".green").addClass("greenWin");
		$(".red").addClass("redWin");
		$(".yellow").addClass("yellowWin");
		$(".blue").addClass("blueWin");

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
		userCount++;
		setTimeout(function() {
			reset();
		}, 500);
	}

	else if ( z > 0 ) {
		game = [];
		user = [];
		count = 0;
		counter = 0;
		n = 0;
		document.getElementById("gameCounter").innerHTML = "Wrong!";

		$(".green").addClass("greenLose");
		$(".red").addClass("redLose");
		$(".yellow").addClass("yellowLose");
		$(".blue").addClass("blueLose");
		// This is the restart function for strict mode:
		setTimeout(function() {

			document.getElementById("gameCounter").innerHTML = 1;

			$(".green").removeClass("greenLose");
			$(".red").removeClass("redLose");
			$(".yellow").removeClass("yellowLose");
			$(".blue").removeClass("blueLose");
			machine();
		}, 1750);
	}

	else {
		n = 0;

		document.getElementById("gameCounter").innerHTML = "Wrong!";

		$(".green").addClass("greenLose");
		$(".red").addClass("redLose");
		$(".yellow").addClass("yellowLose");
		$(".blue").addClass("blueLose");

		setTimeout(function() {
			$(".green").removeClass("greenLose");
			$(".red").removeClass("redLose");
			$(".yellow").removeClass("yellowLose");
			$(".blue").removeClass("blueLose");

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

// Check function for when the user fails a round:
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

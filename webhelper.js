window.onload = start;

var turn=0;
var colors=[], code=[], guess=[], feedback=[];
colors = ["r","b","g","w","c","y"];
// add arrays for thisTurn, turnRecords
var thisTurn = [], turnRecords = [];
var alertString="";

function start() {
	setup();
}

function setup() {
	var welcome="<h1>Welcome to Mastermind!</h1>\n<p>Here are instructions.</p>";
	var buttonElement = document.getElementById("submit-guess");
	var board = document.getElementById("board");
	buttonElement.innerHTML = "Start Game";
	board.innerHTML=welcome;
	buttonElement.onclick = function () {
		code=startGame();
	}
}

function startGame() {
	code=setCode(colors);
	var buttonElement = document.getElementById("submit-guess");
	var board = document.getElementById("board");
	var startPlay="<h1>Code Is Set up!</h1>\n<p>Pick your four choices for your first guess.</p>";
	buttonElement.innerHTML = "Submit color choices";
	board.innerHTML=startPlay;
	buttonElement.onclick = function () {
		newGetGuess(code);
	}
	return code;
}

function newGetGuess(code) {
	var guess =[];
	var g = 0;
	turn++;
	var alertString="";
	var buttonElement = document.getElementById("submit-guess");
	var board = document.getElementById("board");
	for (i=0;i<4;i++) {
		g=document.getElementById(i);
		guess[i]=g.options[g.selectedIndex].value;
	}
	alertString=masterMain(code,guess,turn);
	board.innerHTML=alertString;
}

function masterMain(code,guess,turn){
  var alertString="<h1> Mastermind</h1>";
	var buttonElement = document.getElementById("submit-guess");
	var board = document.getElementById("board");
	feedback = testGuess(code,guess);
	thisTurn = addTurn(guess,feedback);
	turnRecords.push(thisTurn);
	if(feedback[3]=="b"){
	  alertString=alertString.concat("You guessed it in "+turn+" turns!");
	  document.body.style.backgroundImage = "url('https://media.giphy.com/media/13vfiD0VBeksYE/giphy.gif')";
	  newGame();
	}
	else if(guess[0]=="q"){
	  alertString=alertString.concat("Quitter!");
	  document.getElementById("board").style.backgroundColor = "red";
	  board.style.color = "white";
	  newGame();
	}
	else{
	  alertString = formatTurnRecords(turnRecords, alertString);
	}
	return alertString;
}

function newGame(){
  var board = document.getElementById("board");
  var buttonElement = document.getElementById("submit-guess");
  buttonElement.innerHTML="Play Again";
  board.innerHTML=alertString;
  buttonElement.onclick = function () {
	  document.location.reload();
	}
}
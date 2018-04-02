// global variables
let movesMade = document.querySelector('.moves');

let currentcard;

//Create a list that holds all cards
let allCardsClosed = document.querySelectorAll('.card');
let allCardsClosedArray = [...allCardsClosed];
// create empty array to store which cards are opened
let openCards = [];
// create empty array to store which cards are already matched
let matchedCards = [];

/*
 * Timer functionality 
 */

let secCounter = 0;
let clock = 0;
let minCounter = 0;
let secDisplay = '0' + secCounter;
let minDisplay = '0' + minCounter;

function startTimer() {
	clock = setInterval(elapsedTime, 1000);
}

function stopTimer() {
	clearInterval(clock);
}

function elapsedTime() {
	secCounter++;
	if (secCounter >= 60) {
		secCounter = 0;
		minCounter++;
	}
	//to show the zero before seconds and minutes less than 10
	secDisplay = '0' + secCounter;
	minDisplay = '0' + minCounter;
	document.getElementById('seconds').innerText = secDisplay.slice(-2);
	document.getElementById('minutes').innerText = minDisplay.slice(-2);
}

function resetTimer() {
	secCounter = 0;
	minCounter = 0;
	document.getElementById('seconds').innerText = '00';
	document.getElementById('minutes').innerText = '00';
}

/*
 * mainGameLogic function 
 */


function mainGameLogic() {
	if (secCounter > 0) {} else {
		startTimer();
	}
	// True = check if card is valid to click on
	if (checkIfCardClickedOnIsValid() === true) {
		//log click counter
		logClickCounter();
		//update the stars
		updateStarCounter();
		//add currentcard to openCards list
		addClickedCardToOpenCardsList();
		//check if there are 2 cards in openCards List
		if (checkIf2CardsInOpenCardsList() === true) {
			//check if the two cards in the array matches
			if (checkIfMatched() === true) {
				//if match, display cards as matched
				updateDisplayMatch();
				//add the 2 cards from openCards to MatchedCardsList and remove from OpenCards
				addCardsToMatchedCardsList();
				//check if the game is won
				checkWinningCondition();
			} else {
				//if not a match, display as wrong
				updateDisplayWrong();
			}
		} else {
			//display the card as open
			updateDisplayOpen();
		}
	} else {
		// invalid move, do nothing
	}
}

//function to check the winning condition
function checkWinningCondition() {
	if (matchedCards.length === 16) {
		stopTimer();
		overlay();
	} else {
		return false;
	}
}

//function to add cards that match from openCards to matchedCards array
function addCardsToMatchedCardsList() {
	for (const q of openCards) {
		matchedCards.push(q);
		//empty the openCards List
		openCards = [];
	}

}

//function to check if the two cards are a match in openCards List
function checkIfMatched() {
	if ((openCards[0].innerHTML) === (openCards[1].innerHTML)) {
		return true;
	} else {
		return false;
	}
}

//functions to update the display of the card
//open and show
function updateDisplayOpen() {
	for (const o of openCards) {
		o.classList.add('show', 'open');
	}
}
//display matched cards
function updateDisplayMatch() {
	for (const m of openCards) {
		m.classList.add('match');
	}
}
//display wrong cards
function updateDisplayWrong() {
	for (const w of openCards) {
		w.classList.add('wrong', 'show');
	}
	setTimeout(function () {
		for (const r of openCards) {
			r.classList.remove('wrong', 'show', 'open');
		}
		openCards = [];
	}, 1100);
}

//function to add clicked card to clicked cards list
function addClickedCardToOpenCardsList() {
	openCards.push(currentcard);
}

//function to check if there are two cards in the openCards List
function checkIf2CardsInOpenCardsList() {
	if (openCards.length === 2) {
		return true;
	} else {
		return false;
	}
}

// create a function to update the star counter
function updateStarCounter() {
	// when moves counter reaches 20, one star is removed
	if (Number(movesMade.innerText) === 20) {
		let star = document.querySelector('#star-one').classList.add('none');
	}
	// when moves counter reaches 29, two stars are removed
	if (Number(movesMade.innerText) === 29) {
		let star = document.querySelector('#star-two').classList.add('none');
	}
	//when moves counter is zero, all stars should be shown
	if (Number(movesMade.innerText) === 0) {
		document.querySelector('#star-one').classList.remove('none');
		document.querySelector('#star-two').classList.remove('none');
		document.querySelector('#star-three').classList.remove('none');
	}
}

// create log click counter function

function logClickCounter() {
	movesMade.innerText = Number(movesMade.innerText) + 1;
}

// create function to check if the card clicked on is a valid one

function checkIfCardClickedOnIsValid() {
	if (currentcard.classList.contains("open")) {
		//do not allow click, invalid move
		return false;
	} else if (currentcard.classList.contains("show")) {
		return false;
	} else if (currentcard.classList.contains("match")) {
		return false;
	} else if (currentcard.classList.contains("wrong")) {
		return false;
	} else {
		//valid move
		return true;
	}
}

// event listener set-up

function setUpEventListenerForCards() {
	//shuffle as soon as js is run
	shuffle(allCardsClosedArray);
	for (const i of allCardsClosedArray) {
		i.addEventListener('click', function () {
			currentcard = i;
			mainGameLogic();
			currentcard = 0;
		}, false);
	}
}
// this sets up event listeners on the page
setUpEventListenerForCards();


//shuffle function
function shuffle() {
	var ul = document.querySelector('.deck');
	for (var i = ul.children.length; i >= 0; i--) {
		ul.appendChild(ul.children[Math.random() * i | 0]);
	}
}

/* 
 * Restart button
 */

// This function removes the classes .show .open and .match all cards only have class .card
function restartGame() {
	//display all cards in closed condition
	for (const element of allCardsClosedArray) {
		element.classList.remove('open', 'show', 'match', 'wrong');
	}
	//empty the openCards array
	openCards = [];
	//stop the timer and set to zero
	stopTimer();
	resetTimer();
	document.querySelector('.moves').innerText = '0';
	//reset star rating back to three stars
	updateStarCounter();
	shuffle();
}

//function for modal pop-up

function overlay() {
	let el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	let mm = document.getElementById("modal-message");
	mm.innerText = ("Congradulations, you won! You have a rating of " +
		howManyStars() + ". Your time is " + minDisplay.slice(-2) + ":" + secDisplay.slice(-2) + ".");
}

function closeOverlay() {
	let el = document.getElementById("overlay");
	el.style.visibility = "hidden";
}

//variable for amount of stars left.
function howManyStars() {
	if (Number(movesMade.innerText) < 20) {
		return "3 stars";
	}
	if (Number(movesMade.innerText) > 19 && Number(movesMade.innerText) < 29) {
		return "2 stars";
	}
	if (Number(movesMade.innerText) > 28) {
		return "1 star";
	}
}
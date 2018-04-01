// global variables
var clock; 
var currentcard;
var secCounter = 0;
let movesMade;
let star;

//Create a list that holds all cards
let allCardsClosed = document.querySelectorAll('.card');
let allCardsClosedArray = [...allCardsClosed];
// create empty array to store which cards are opened
let openCards = [];
// create empty array to store which cards are already matched
let matchedCards = []
//Create a timer


function startTimer() {
	clock= setInterval(elapsedTime,1000);
}

function stopTimer() {
	clearInterval(clock);
}

function elapsedTime() {
	secCounter++;
	//console.log(secCounter);
	document.getElementById('seconds').innerText = secCounter;
}

function resetTimer() {
	secCounter = 0;
}

//mainGameLogic function

function mainGameLogic() {
	if (secCounter > 0) {
		console.log('timer has already started');
	} else {
		console.log('timer started')
		startTimer();
	}
	console.log(currentcard);
// True = check if card is valid to click on
	if (checkIfCardClickedOnIsValid() === true) {
		console.log('valid');
		//log click counter
		logClickCounter()
		//update the stars
		updateStarCounter()
		//add currentcard to openCards list
		addClickedCardToOpenCardsList ()
		//check if there are 2 cards in openCards List
		if (checkIf2CardsInOpenCardsList () === true) {
			//check if the two cards in the array matches
			if (checkIfMatched() === true) {
				//if match, display cards as matched
				updateDisplayMatch();
				//add the 2 cards from openCards to MatchedCardsList and remove from OpenCards
				addCardsToMatchedCardsList();
				//check if the game is won
				checkWinningCondition ()
			} else {
				//if not a match, display as wrong
				updateDisplayWrong();
				//wag 2 seconds voor cards close
				setTimeout(updateDisplayClosed, 1000);
			}
		} else {
			//display the card as open
			console.log('nog net 1 card');
			updateDisplayOpen();
		}
	} else {
		console.log('invalid')
		// invalid move do nothing
	}
}

//function to check the winning condition
function checkWinningCondition () {
	if (matchedCards.length === 16) {
		console.log('wen!');
		return true;
	} else {
		console.log('nog nie wen nie');
		return false;
	}
}

//function to add cards that match from openCards to matchedCards array
function addCardsToMatchedCardsList () {
	for (const q of openCards) {
		matchedCards.push(q);
		console.log(matchedCards);
		//empty the openCards List
		openCards = [];
		console.log(openCards);
	}
	
}

//function to check if the two cards are a match in openCards List
function checkIfMatched () {
	if ((openCards[0].innerHTML) === (openCards[1].innerHTML)) {
		console.log('these cards match');
		return true;
	} else {
		console.log('these cards do not match');
		return false;
	}
}

//functions to update the display of the card
//open and show
function updateDisplayOpen () {
	for (const o of openCards) {
		o.classList.add('show', 'open');
 		console.log('cards open');
	}
} 
//display matched cards
function updateDisplayMatch () {
	for (const m of openCards) {
 		m.classList.add('match');
 		console.log('cards matched');		
 	}
} 
//display wrong cards
function updateDisplayWrong () {
	for (const w of openCards) {
		w.classList.add('wrong', 'show');
 		console.log('cards wrong');
	}	
}
//display closed cards
function updateDisplayClosed () {
	for (const c of openCards) {
		c.classList.remove('wrong', 'show', 'open');
 		console.log('card closed');
	}	
	//remove cards from openCards List
	openCards = [];
	console.log(openCards);
}


//function to add clicked card to clicked cards list
function addClickedCardToOpenCardsList () {
	openCards.push(currentcard);
	console.log(openCards);
}

//function to check if there are two cards in the openCards List
function checkIf2CardsInOpenCardsList () {
	if (openCards.length === 2) {
		return true;
		console.log('2 cards in openCards');
	} else {
		return false;
		//console.log('nog nie 2 nie');
	}
}

// create a function to update the star counter
function updateStarCounter() {
	// when moves counter reaches 10, one star is removed
	if (Number(movesMade.innerText) === 10) {
		let star = document.querySelector('#star-one').classList.add('none');
		//console.log(star);
		//console.log('1 star now not visible')
	} 
	// when moves counter reaches 19, two stars are removed
	if (Number(movesMade.innerText) === 19) {
		let star = document.querySelector('#star-two').classList.add('none');
		//console.log(star);
		//console.log('2 stars now not visible')
	} 
	// when moves counter reaches 25, three stars are removed
	if (Number(movesMade.innerText) === 25) {
		let star = document.querySelector('#star-three').classList.add('none');
		//console.log(star);
		//console.log('3 stars now not visible')
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
    movesMade = document.querySelector('.moves'); 
    movesMade.innerText=Number(movesMade.innerText) + 1;
    console.log(movesMade);
    //;
}

// create function to check if the card clicked on is a valid one

function checkIfCardClickedOnIsValid() {
	if(currentcard.classList.contains("open")) {
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
 /* set up the event listener for a card. If a card is clicked:*/

function setUpEventListenerForCards () {
	//shuffle as soon as js is run
	shuffle(allCardsClosedArray);
	for(const i of allCardsClosedArray){ 
		i.addEventListener('click', function () { 
			console.log('click');
			console.log(i)
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
			currentcard  = i;
			mainGameLogic()
			currentcard = 0;
		}, false); 

	}	

}
// this sets up event listeners on the page
setUpEventListenerForCards();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}*/


function shuffle(){
	var ul = document.querySelector('.deck');
	console.log(ul);
	for (var i = ul.children.length; i >= 0; i--) {
    	ul.appendChild(ul.children[Math.random() * i | 0]);
	}
	console.log(ul);

}


/* 
 * Restart button
 */
// This function removes the classes .show .open and .match all cards only have class .card
function restartGame () {
	//display all cards in closed condition
	for (const element of allCardsClosedArray) {
		element.classList.remove('open', 'show', 'match', 'wrong');
		console.log('all cards now closed');
	}
	//empty the openCards array
	openCards = []
	//stop the timer and set to zero
	stopTimer();
	console.log('stopped timer');
	resetTimer();
	//reset seconds to zero
	document.querySelector('#seconds').innerText = '00';
	//reset moves made to zero
	document.querySelector('.moves').innerText = '0';
	//reset star rating back to three stars
	updateStarCounter();
	shuffle(allCardsClosedArray);
}





                
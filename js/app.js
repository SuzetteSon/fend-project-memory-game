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
				setTimeout(updateDisplayClosed, 2000);
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

//function to empty the openCards array
function emptyOpenCardsArray () {

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
		console.log('open false')
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

	 for(const i of allCardsClosedArray){ 
		i.addEventListener('click', function () { 
		//alert('hello'); 
			console.log('click');
			console.log(i)
/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
			currentcard  = i;
			mainGameLogic()
			currentcard = 0;
		}, false); 

	}	

}
// this sets up event listeners on the page, always needs to be hear
setUpEventListenerForCards();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//console.log(shuffle(allCardsClosedArray));

 /*function () {
    var x = document.querySelector('.moves');
    document.querySelector('.moves').innerHTML = Number(x.innerHTML) + 1;
};
/* 
 * Restart button
 */
// This function removes the classes .show .open and .match all cards only have class .card
function restartGame (array) {
	for (const element of array) {
		element.classList.remove('open', 'show', 'match');

	}
	//console.log(allCardsClosedArray);
}
//console.log(restartGame(allCardsClosedArray));
//shuffle(allCardsClosedArray);
//restartGame(allCardsClosedArray);
//document.querySelector('.restart').addEventListener('click', restartGame(allCardsClosedArray)); //werk nie

;



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */ 



//function to create a wait
function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms) {
		end = new Date().getTime();
	}
}



 //when cards match

function cardsDoMatch (array) {
 	// Remove className open and show from each list item and add match. 
 	// remove from openCards array and add to matchedCards array
 				
	for (const card of array) {
		card.classList.remove('show', 'open');
		card.classList.add('match');
		openCards = [] //reset openCards weer na empty
		matchedCards.push(card); //sit 2 matched kaarte in matchedCards array
		console.log(matchedCards);
		console.log('twee is nou matched');
	}
}

//when cards do not match

function cardsDoNotMatch (array) {

 	// Remove className open and show from each list item. 
 	// Remove from openCards list
	for (const card of array) {
		card.classList.add("wrong");

		card.classList.remove("wrong", "show", "open")
	}
	wait(2000);
	
	//backToPlay(allCardsClosedArray);
	
} 

//function to check if the two cards in openCards do match
function checkMatch (array) {
		/*+ if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)*/
		if (array[0].outerHTML === array[1].outerHTML) {

		} else {
			/* + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)*/
		}

	}


 /*  - if the list already has another card, check to see if the two cards match
	//check list openCards' length, if =2, 
	//if 2, compare types/list element e.g. diamond, bolt. array[0] === [1] ? */
function checkLength (array) {
	console.log(openCards.length);
	if (array.length < 2) {
		console.log('nog nie 2 nie. run weer...');

	} else if (openCards.length === 2) {
		console.log('Het nou 2');
		checkMatch(openCards);

	}
}
//checkLength(openCards);

 /*  - display the card's symbol (put this functionality in another function that you call from this one)*/

 function displayCardSymbol (array) {
 	// Display must add the .open class and the .show class to the list element. (The current card we clicked on) This function will take the card as an imput parameter, 
 	//it will find / access it's class element and set it to class="card open show".
 	for (const card of array) {
 		card.classList.add('show', 'open');
 		console.log('nou wys die kaart blou');
 	}
 	checkLength(openCards);
 }





/* 
 * Create move counter
 */	
// each time a different card is clicked, counter +1

/*document.querySelector('.card').addEventListener('click', function () {
    var x = document.querySelector('.moves');
    document.querySelector('.moves').innerHTML = Number(x.innerHTML) + 1;
});
*/

//DIT WERK!!!
/*for(var i=0; i < allCardsClosedArray.length; i++){ 
	allCardsClosedArray[i].addEventListener('click', function () { 
		//alert('hello'); 
		//console.log('A card was clicked');
	}, false); 
}*/

 /*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 	// The move counter must +1 every time a new card is clicked on

 /*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)*/
function allCardsMatch (array) {
	if (array.length === 16) {
		console.log("All cards are matched, congradulations!");
	}
}
 /*/
}
}/*







/*function addUp() {
    var x = document.querySelector('.moves');
    document.querySelector('.moves').innerHTML = Number(x.innerHTML) + 1;
}
// const moves = document.querySelectorAll('.card');
moves.addEventListener('click', addUp, false);*/
                
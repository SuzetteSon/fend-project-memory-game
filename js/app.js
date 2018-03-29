/*
 * Create a list that holds all of your cards
 */





//let cards = [...card];
//console.log(card);


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



/* 
 * Start game, cards all closed
 *

document.addEventListener('click', function () {
	cards = shuffle(cards);
	cards.classList.remove('open');

});


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
/*
 * set up the event listener for a card. If a card is clicked:*/


let card = document.getElementById('toets');
let secondCard = document.getElementById('toets2');
let openCards = [];
let matchedCards = [];

 /*  - display the card's symbol (put this functionality in another function that you call from this one)*/

 function displayCardSymbol (currentcard) {
 	// Display must add the .open class and the .show class to the list element. (The current card we clicked on) This function will take the card as an imput parameter, 
 	//it will find / access it's class element and set it to class="card open show".
 	//className
 	currentcard.classList.add('show', 'open')
 	 /*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
 	// try to add the current card to a list of open cards.
 	
 	openCards.push(currentcard)
 	console.log(currentcard); //print die huidige card
 	console.log(openCards); //print die lys met die huidige card by
 }
 displayCardSymbol(card);
 displayCardSymbol(secondCard);
 

 /*  - if the list already has another card, check to see if the two cards match
	//check list openCards' length, if =2, 
	//if 2, compare types/list element e.g. diamond, bolt. array[0] === [1] ? */
function checkLength (array) {
	if (array.length === 2) {
		console.log(array);
		if (array[0].getAttribute("type") === (array[1]).getAttribute("type")) {
			console.log("A match!");

		} else {
			console.log("Not a match");
		}
	}
}
checkLength(openCards);

	//for (let arrayItem of array) {
		
 /*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)*/
  function cardsDoMatch (array) {
 	// Remove className open and show from each list item and add match. 
 	// remove from openCards array and add to matchedCards array
 	for (const card of array) {
 		card.classList.remove('show', 'open');
 		card.classList.add('match');
 		openCards = [] //reset opnCards weer na empty
 		matchedCards.push(card); //sit 2 matched kaarte in matchedCards array
 		console.log(matchedCards);
 	}
 }
 //cardsDoMatch(openCards);
 /*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)*/
 function cardsDoNotMatch (array) {
 	// Remove className open and show from each list item. 
 	// Remove from openCards list
 	for (const card of array) {
 		card.classList.remove('show', 'open');
 		openCards = [];
 	}
 }
 //cardsDoMatch(openCards);


 

 /*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 	// The move counter must +1 every time a new card is clicked on

 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

 */

/* 
 * Create a timer
 *


var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('#timerClock').html(timer.getTimeValues().toString());
});

/* 
 * Create move counter
 */

/*function addUp() {
    var x = document.querySelector('.moves');
    document.querySelector('.moves').innerHTML = Number(x.innerHTML) + 1;
}
// const moves = document.querySelectorAll('.card');
moves.addEventListener('click', addUp, false);*/
                
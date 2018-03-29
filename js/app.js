/*
 * Create a list that holds all cards 
 */

let allCardsClosed = document.querySelectorAll('.card');
let allCardsClosedArray = [...allCardsClosed];
//console.log(allCardsClosedArray);


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
restartGame(allCardsClosedArray);
//document.querySelector('.restart').addEventListener('click', restartGame(allCardsClosedArray)); //werk nie

//let card = document.getElementById('toets');
//let secondCard = document.getElementById('toets2');
let openCards = [];
let matchedCards = [];



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








 

function cardsDoMatch (array) {
 	// Remove className open and show from each list item and add match. 
 	// remove from openCards array and add to matchedCards array
 				console.log("A match!"); 
				for (const card of array) {
			 		card.classList.remove('show', 'open');
			 		card.classList.add('match');
			 		openCards = [] //reset opnCards weer na empty
			 		matchedCards.push(card); //sit 2 matched kaarte in matchedCards array
			 		console.log(matchedCards);
			 	}
			 }

function cardsDoNotMatch (array) {
 	// Remove className open and show from each list item. 
 	// Remove from openCards list
 	console.log("Not a match");
		for (const card of array) {
			 card.classList.remove('show', 'open');
			 openCards = [];
		}
}

 /*  - if the list already has another card, check to see if the two cards match
	//check list openCards' length, if =2, 
	//if 2, compare types/list element e.g. diamond, bolt. array[0] === [1] ? */
function checkLength (array) {
	console.log(openCards.length);
	if (array.length < 2) {
		console.log('nog nie 2 nie');
	} else if (array.length === 2) {
		/*+ if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)*/
		if (array[0].outerHTML === array[1].outerHTML) {
			cardsDoMatch(openCards);

		} else {
			/* + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)*/
			cardsDoNotMatch(openCards);
		}

	}
}
//checkLength(openCards);

 /*  - display the card's symbol (put this functionality in another function that you call from this one)*/

 function displayCardSymbol (current) {
 	// Display must add the .open class and the .show class to the list element. (The current card we clicked on) This function will take the card as an imput parameter, 
 	//it will find / access it's class element and set it to class="card open show".
 	//className
 	current.classList.add('show', 'open')
 	 /*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
 	// try to add the current card to a list of open cards.
 		openCards.push(current);
 		checkLength(openCards);
 	//console.log(current); //print die huidige card
 	//console.log(openCards); //print die lys met die huidige card by
 }

 //displayCardSymbol(card);
 //displayCardSymbol(secondCard);

 /* set up the event listener for a card. If a card is clicked:*/

function cardClicked () {
	 for(const i of allCardsClosedArray){ 
		i.addEventListener('click', function () { 
		//alert('hello'); 
			console.log('click');
			console.log(openCards);
			displayCardSymbol(i);
			
		}, false); 

	}	

}
cardClicked();



/* 
 * Create move counter
 */	
// each time a different card is clicked, counter +1

/*document.querySelector('.card').addEventListener('click', function () {
    var x = document.querySelector('.moves');
    document.querySelector('.moves').innerHTML = Number(x.innerHTML) + 1;
});
*/


for(var i=0; i < allCardsClosedArray.length; i++){ 
	allCardsClosedArray[i].addEventListener('click', function () { 
		//alert('hello'); 
		console.log('A card was clicked');
	}, false); 
}

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





/* 
 * Create a timer
 */




/*function addUp() {
    var x = document.querySelector('.moves');
    document.querySelector('.moves').innerHTML = Number(x.innerHTML) + 1;
}
// const moves = document.querySelectorAll('.card');
moves.addEventListener('click', addUp, false);*/
                
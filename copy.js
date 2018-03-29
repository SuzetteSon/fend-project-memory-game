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
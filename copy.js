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
/* 
 * Restart button
 */
// This function removes the classes .show .open and .match all cards only have class .card
function restartGame (array) {
	for (const element of array) {
		element.classList.remove('open', 'show', 'match');
	}
}
restartGame(allCardsClosedArray);
shuffle(allCardsClosedArray);
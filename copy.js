
function cardClicked () {
	 for(var i=0; i < allCardsClosedArray.length; i++){ 
		allCardsClosedArray[i].addEventListener('click', function () { 
		//alert('hello'); 
			openCards.push(i);
			console.log('click');
			console.log(openCards);
			displayCardSymbol(i);
			checkLength(openCards);
		}, false); 

	}	

}
cardClicked();
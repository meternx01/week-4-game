var game = {
	targetNumber: 0,
	buttonValue : [0, 0, 0, 0],
	accumulatedValue : 0,
	wins : 0,
	losses : 0,
	startGame: function(){
		// Set New Target
		debugOut("test initial");
		this.targetNumber = Math.floor(19 + (Date.now() / Math.random()) % 101);
		// Set the buttons
		for(var i=0;i<this.buttonValue.length;i++)
		{
			this.buttonValue[i] = Math.floor(1 + (Date.now() / Math.random()) % 12);
		}
		// Reset the user's score
		this.accumulatedValue = 0;
		// Output
		this.toHTML("start");
	},
	endGame: function(isWin){
		if(isWin)	// if a win
		{
			alert("You Win the Internets");
			this.wins++;
		}
		else	// must be a loss
		{
			alert("You lost, you went over by \n" + (this.accumulatedValue-this.targetNumber));
			this.losses++;
		}
		// Start a new game
		this.startGame();
	},
	toHTML: function(type){
		debugOut(type);	//debug
		// write out target
		$("#target-score").html("Target: " + this.targetNumber);	
		// write wins/losses
		$("#wins").html("Wins: " + this.wins);
		$("#losses").html("Losses: " + this.losses);
		// write accumulated score
		$("#user-score").html(this.accumulatedValue);
	}

}

function debugOut(place) {
	console.log("-----" + place + "------");
	console.log("targetNumber " + game.targetNumber);
	console.log("buttonValue " + game.buttonValue);
	console.log("accumulatedValue " + game.accumulatedValue);
	console.log("wins " + game.wins);
	console.log("losses " + game.losses);
}

$(document).ready(function () {
	//make game object
	//begin game
	game.startGame();
	//capture image clicks
	$(document).on("click", "img", function () {
		//determine image clicked
		var currentId = $(this).attr('id');	// extract id of the image clicked
		if (currentId.includes("image-")) {	// if it is a image-# id then
			var buttonPress = parseInt(currentId.charAt(currentId.length - 1))	// which image pressed (number)
			game.accumulatedValue += game.buttonValue[buttonPress - 1];	// add that value to the running total
			// if($(this).is("#image-1"))	//guaranteed code - sloppy
			// 	accumulatedValue+=buttonValue[0];
		}
		//output new total to page
		game.toHTML("Pressed "+currentId);
		//evaluate win or lose condition
		if(game.accumulatedValue >= game.targetNumber)
			game.endGame(game.accumulatedValue == game.targetNumber);
	});
});
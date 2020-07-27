var $cell = $(".cell");
var $message = $("#message");
var $reset = $("#reset");
var gameOver = false;
var $playersTally = $("#players-tally");
var $player1NameBtn = $("#player1-name-submit");
var $player2NameBtn = $("#player2-name-submit");
var $player1NameInput = $("#player1-name-input");
var $player2NameInput = $("#player2-name-input");
var preWinner;


var players = {
	player1: {
		name: 'player1',
		score: 0,
		symbol: 'X'
	},
	player2: {
		name: 'player2',
		score: 0,
		symbol: 'O'
	}
}
var clickCount = 0;

var win = function (symbol) {
	if (players.player1.symbol === symbol) {
		$message.html(`Player [${players.player1.name}] has won the game! The game is over!`);
		preWinner = players.player1;
		preLoser = players.player2;
		players.player1.score++;
	} else {
		$message.html(`Player [${players.player2.name}] has won the game! The game is over!`);
		preWinner = players.player2;
		preLoser = players.player1;
		players.player2.score++;
	}
	gameOver = true;
	showTally();
}

var showTally = function () {
	$playersTally.html(`${players.player1.name} (${players.player1.symbol}): ${players.player1.score}  vs  
${players.player2.name} (${players.player2.symbol}): ${players.player2.score}`);
}

//Click the cells to play
$cell.click(function (event) {
	console.log("cell clicked")
	if (!gameOver) {
		var $this = $(this);
		console.log("this cell: ", $this.html())

		//if the cell is not taken, place chess on the cell
		if ($this.html() === 'Click') {
			clickCount++;
			if (preWinner === undefined) {
				if (clickCount % 2) {
					$this.html(players.player1.symbol);
				} else {
					$this.html(players.player2.symbol);
				}
			}else{
				if (clickCount % 2) {
					$this.html(preWinner.symbol);
				} else {
					$this.html(preLoser.symbol);
				}
			}
		}


		if (clickCount !== 0) {
			$message.html(`Game has started!`);
		}

		var gameTable = [
			[$("#cell-index-0").html(), $("#cell-index-1").html(), $("#cell-index-2").html()],
			[$("#cell-index-3").html(), $("#cell-index-4").html(), $("#cell-index-5").html()],
			[$("#cell-index-6").html(), $("#cell-index-7").html(), $("#cell-index-8").html()]
		];
		console.log("game table:", gameTable)

		// win horizontally
		for (var i = 0; i < gameTable.length; i++) {
			var j = 0;
			if (gameTable[i][j] === gameTable[i][j + 1] && gameTable[i][j] === gameTable[i][j + 2] && gameTable[i][j] !== 'Click') {
				win(gameTable[i][j]);
			}
		}

		// win vertically
		for (var j = 0; j < gameTable.length; j++) {
			var i = 0;
			if (gameTable[i][j] === gameTable[i + 1][j] && gameTable[i][j] === gameTable[i + 2][j] && gameTable[i][j] !== 'Click') {
				win(gameTable[i][j]);
			}
		}

		// win major diagonally
		if (gameTable[0][0] === gameTable[1][1] && gameTable[0][0] === gameTable[2][2] && gameTable[0][0] !== 'Click') {

			win(gameTable[0][0]);
		}
		// win minor diagonally
		if (gameTable[2][0] === gameTable[1][1] && gameTable[2][0] === gameTable[0][2] && gameTable[2][0] !== 'Click') {
			win(gameTable[2][0]);
		}

		console.log("clickCount: ", clickCount);
		console.log("gameOver: ", gameOver);
		if (clickCount === 9 && gameOver === false) {
			$message.html(`It's a tie game! Reset game to play again!`);
		}
	}
})



$reset.click(function (event) {
	console.log("reset clicked");
	$cell.html("Click");
	$message.html(`Game has not started yet! Click to play!`);
	clickCount = 0;
	gameOver = false;
})


showTally();

$player1NameBtn.click(function (event) {
	var name = $player1NameInput.val();
	if (name) {
		players.player1.name = name;
	}
	showTally();
})

$player2NameBtn.click(function (event) {
	var name = $player2NameInput.val();
	if (name) {
		players.player2.name = name;
	}
	showTally();
})
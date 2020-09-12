const turnText = document.querySelector('.title')
const startButton = document.querySelector('.start-btn')
const aiBoard = document.querySelector('#plr2')

const game = (plr1, plr2, plr1Board, plr2Board) => {
	let coords

	plr1.setTurn(true)
	plr2.setTurn(false)

	if (plr1.getTurn()) {
		turnText.innerHTML = "Player's turn"
	} else {
		turnText.innerHTML = "Computer's turn"
	}

	const checkWinner = () => {
		if (plr1Board.shipsSunk()) {
			alert('The Computer has won!')
			startButton.innerHTML = 'Restart Game'
			startButton.addEventListener('click', restartGame)
		} else if (plr2Board.shipsSunk()) {
			alert('The Player has won')
			startButton.innerHTML = 'Restart Game'
			startButton.addEventListener('click', restartGame)
		} else {
			return false
		}
	}

	async function startRound(e) {
		if (!checkWinner()) {
			coords = e.target.dataset.id

			if (
				plr2Board.gameBoard[coords] === 'missed' ||
				plr2Board.gameBoard[coords] === 'hit'
			) {
				return
			}
			console.log(coords)
		}
	}

	const restartGame = () => {
		location.reload()
	}

	aiBoard.addEventListener('click', startRound)
}

export default game

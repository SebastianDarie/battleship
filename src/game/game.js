import updatePlrBoard from './updatePlrBoard'
import updateAiBoard from './updateAiBoard'

const turnText = document.querySelector('.title')
const startButton = document.querySelector('.start-btn')
const plrBoard = document.querySelector('#plr1')
const aiBoard = document.querySelector('#plr2')

const game = (plr1, plr2, plr1Board, plr2Board) => {
	let coords

	const updateText = (player) => {
		if (player === plr1) {
			turnText.innerHTML = "Player's turn"
		} else {
			turnText.innerHTML = "Computer's turn"
		}
	}

	plr1.setTurn(true)
	plr2.setTurn(false)
	updateText(plr1)

	const checkWinner = () => {
		if (plr1Board.shipsSunk()) {
			turnText.innerHTML = 'The Computer has won!'
			startButton.innerHTML = 'Restart Game'
			startButton.addEventListener('click', restartGame)
			plrBoard.removeEventListener('click', startRound)
		} else if (plr2Board.shipsSunk()) {
			turnText.innerHTML = 'The Player has won'
			startButton.innerHTML = 'Restart Game'
			startButton.addEventListener('click', restartGame)
			aiBoard.removeEventListener('click', startRound)
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
		}

		plr1.attack(plr2Board, coords)
		updateAiBoard(plr2Board)

		if (plr2Board.gameBoard[coords] === 'hit') {
			updateText(plr1)
			checkWinner()
			return
		}

		plr1.setTurn(false)
		plr2.setTurn(true)
		updateText(plr2)

		await pauseGame(500)

		plr2.aiAttack(plr1Board)
		updatePlrBoard(plr1Board)

		plr1.setTurn(true)
		plr2.setTurn(false)
		updateText(plr1)
	}

	const pauseGame = (sec) => {
		return new Promise((res, rej) => {
			setTimeout(() => {
				res(sec)
			}, sec)
		})
	}

	const restartGame = () => {
		location.reload()
	}

	aiBoard.addEventListener('click', startRound)
}

export default game

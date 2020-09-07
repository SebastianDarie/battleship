const Player = () => {
	let turn = true

	function attack(enemyBoard, coord) {
		if (turn) {
			enemyBoard.receiveAttack(coord)
		}
	}

	function aiAttack(enemyBoard) {
		if (turn) {
			let coord = Math.floor(Math.random() * 100)
			while (
				enemyBoard.gameBoard[coord] === 'missed' ||
				enemyBoard.gameBoard[coord] === 'hit'
			) {
				coord = Math.floor(Math.random() * 100)
			}
			enemyBoard.receiveAttack(coord)
		}
	}

	function getTurn() {
		return turn
	}

	function setTurn(boolean) {
		turn = boolean
	}

	return { attack, aiAttack, getTurn, setTurn }
}

export default Player

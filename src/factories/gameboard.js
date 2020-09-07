import Ship from './ship'

const Gameboard = () => {
	let ships = []
	let gameBoard = Array(100)

	function placeShip(coords) {
		let isPlaced = false

		coords.forEach((coord) => {
			if (gameBoard[coord]) isPlaced = true
		})

		if (!isPlaced) {
			let id = ships.length + 1
			let newShip = Ship(id, coords)
			ships.push(newShip)
			coords.forEach((coord) => (gameBoard[coord] = newShip.id))
		}
	}

	function receiveAttack(coord) {
		if (gameBoard[coord] === undefined) {
			gameBoard[coord] = 'missed'
		} else if (
			gameBoard[coord] === 'missed' ||
			gameBoard[coord] === 'hit'
		) {
			return
		} else {
			let hitShip = ships[gameBoard[coord] - 1]
			hitShip.hit(coord)
			gameBoard[coord] = 'hit'
		}
	}

	function shipsSunk() {
		return ships.every((ship) => ship.isSunk())
	}

	return { ships, gameBoard, placeShip, receiveAttack, shipsSunk }
}

export default Gameboard

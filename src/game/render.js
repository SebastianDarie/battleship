import drag from './drag'

const render = () => {
	const plrBoard = document.querySelector('#plr1')
	const aiBoard = document.querySelector('#plr2')
	const shipsContainer = document.querySelector('.ships')
	const destroyer = document.querySelector('.destroyer-ship')
	const cruiser = document.querySelector('.cruiser-ship')
	const cruiser2 = document.querySelector('.cruiser-ship-2')
	const battleship = document.querySelector('.battleship-ship')
	const carrier = document.querySelector('.carrier-ship')
	const rotateBtn = document.querySelector('.rotate')

	const plrSquares = []
	const aiSquares = []
	let direction
	let isHorizontal = true

	const shipArr = [
		{
			name: 'destroyer',
			directions: [
				[0, 1],
				[0, 10],
			],
		},
		{
			name: 'cruiser',
			directions: [
				[0, 1, 2],
				[0, 10, 20],
			],
		},
		{
			name: 'cruiser-2',
			directions: [
				[0, 1, 2],
				[0, 10, 20],
			],
		},
		{
			name: 'battleship',
			directions: [
				[0, 1, 2, 3],
				[0, 10, 20, 30],
			],
		},
		{
			name: 'carrier',
			directions: [
				[0, 1, 2, 3, 4],
				[0, 10, 20, 30, 40],
			],
		},
	]

	function createBoard(board, squares) {
		for (let i = 0; i < 100; i++) {
			const square = document.createElement('div')

			square.classList.add('board-cell')
			square.dataset.id = i

			board.appendChild(square)
			squares.push(square)
		}
	}

	function generateShip(ship) {
		let randomDirection = Math.floor(Math.random() * ship.directions.length)
		let curr = ship.directions[randomDirection]

		if (randomDirection === 0) direction = 1
		if (randomDirection === 1) direction = 10

		let randomPoint = Math.abs(
			Math.floor(
				Math.random() * aiSquares.length -
					ship.directions[0].length * direction
			)
		)

		const isTaken = curr.some((index) =>
			aiSquares[randomPoint + index].classList.contains('taken')
		)
		const isAtRightEdge = curr.some(
			(index) => (randomPoint + index) % 10 === 10 - 1
		)
		const isAtLeftEdge = curr.some(
			(index) => (randomPoint + index) % 10 === 0
		)

		if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
			curr.forEach((index) => {
				aiSquares[randomPoint + index].classList.remove('board-cell')
				aiSquares[randomPoint + index].classList.add('taken', ship.name)
			})
		else generateShip(ship)
	}

	function rotateShips() {
		isHorizontal ? verticalClasses() : verticalClasses()
	}

	function verticalClasses() {
		shipsContainer.classList.toggle('ships-vertical')
		destroyer.classList.toggle('ship-vertical')
		destroyer.classList.toggle('destroyer-ship-vertical')
		cruiser.classList.toggle('ship-vertical')
		cruiser.classList.toggle('cruiser-ship-vertical')
		cruiser2.classList.toggle('ship-vertical')
		cruiser2.classList.toggle('cruiser-ship-vertical')
		battleship.classList.toggle('ship-vertical')
		battleship.classList.toggle('battleship-ship-vertical')
		carrier.classList.toggle('ship-vertical')
		carrier.classList.toggle('carrier-ship-vertical')

		isHorizontal = !isHorizontal
	}

	createBoard(plrBoard, plrSquares)
	createBoard(aiBoard, aiSquares)

	generateShip(shipArr[0])
	generateShip(shipArr[1])
	generateShip(shipArr[2])
	generateShip(shipArr[3])
	generateShip(shipArr[4])

	rotateBtn.addEventListener('click', rotateShips)

	drag(plrSquares)

	return { createBoard }
}

export default render

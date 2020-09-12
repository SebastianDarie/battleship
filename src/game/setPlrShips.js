const setPlrShips = (board) => {
	const plrBoard = document.querySelector('#plr1')
	const nodeList = plrBoard.childNodes
	const arr = [...nodeList]
	const ships = arr.filter((el) => el.classList.contains('taken'))

	const plrArr = [[], [], [], [], []]

	ships.forEach((ship) => {
		if (ship.classList.contains('destroyer')) {
			plrArr[0].push(ship.dataset.id)
		} else if (ship.classList.contains('cruiser') && plrArr[1].length < 3) {
			plrArr[1].push(ship.dataset.id)
		} else if (ship.classList.contains('battleship')) {
			plrArr[3].push(ship.dataset.id)
		} else if (ship.classList.contains('carrier')) {
			plrArr[4].push(ship.dataset.id)
		} else {
			plrArr[2].push(ship.dataset.id)
		}
	})

	plrArr.forEach((ship) => board.placeShip(ship))
}

export default setPlrShips

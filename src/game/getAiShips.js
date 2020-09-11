const getAiShips = () => {
	const aiBoard = document.querySelector('#plr2')
	const nodeList = aiBoard.childNodes
	const arr = [...nodeList]
	const ships = arr.filter((el) => el.classList.contains('taken'))

	const aiArr = [[], [], [], [], []]

	ships.forEach((ship) => {
		if (ship.classList.contains('destroyer')) {
			aiArr[0].push(ship.dataset.id)
		} else if (ship.classList.contains('cruiser')) {
			aiArr[1].push(ship.dataset.id)
		} else if (ship.classList.contains('cruiser-2')) {
			aiArr[2].push(ship.dataset.id)
		} else if (ship.classList.contains('battleship')) {
			aiArr[3].push(ship.dataset.id)
		} else {
			aiArr[4].push(ship.dataset.id)
		}
	})

	return aiArr
}

export default getAiShips

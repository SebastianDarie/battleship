import { horizontal, vertical } from './blockedSquares'

const drag = (plrSquares) => {
	const ships = document.querySelectorAll('.ship')

	let selectedShip
	let draggedShip
	let length
	let nodeArr = []
	let isHorizontal = true
	const width = 10

	ships.forEach((ship) =>
		ship.addEventListener('mousedown', (e) => {
			selectedShip = e.target.id
		})
	)

	ships.forEach((ship) => ship.addEventListener('dragstart', dragStart))
	plrSquares.forEach((square) => {
		square.addEventListener('dragstart', dragStart)
		square.addEventListener('dragover', dragOver)
		square.addEventListener('dragenter', dragEnter)
		square.addEventListener('drop', dragDrop)
	})

	function dragStart() {
		draggedShip = this
		nodeArr = [...this.childNodes]
		nodeArr = nodeArr.filter((el) => el.nodeType === 1)
		length = nodeArr.length
	}

	function dragOver(e) {
		e.preventDefault()
	}

	function dragEnter(e) {
		e.preventDefault()
	}

	function dragDrop() {
		let lastChildNameId = draggedShip.lastChild.id
		let shipName = lastChildNameId.slice(0, -2)
		let lastChildId = parseInt(lastChildNameId.substr(-1))

		let lastId = lastChildId + parseInt(this.dataset.id)
		let selectedShipIndex = parseInt(selectedShip.substr(-1))

		lastId = lastId - selectedShipIndex

		let blockedHorizontal = horizontal.splice(0, 10 * lastChildId)
		let blockedVertical = vertical.splice(0, 10 * lastChildId)

		if (draggedShip.classList.contains(`${shipName}-ship-vertical`)) {
			isHorizontal = false
		} else {
			isHorizontal = true
		}

		if (isHorizontal && !blockedHorizontal.includes(lastId)) {
			for (let i = 0; i < length; i++) {
				plrSquares[
					parseInt(this.dataset.id) - selectedShipIndex + i
				].classList.remove('board-cell')
				plrSquares[
					parseInt(this.dataset.id) - selectedShipIndex + i
				].classList.add('taken', shipName)
				draggedShip.classList.add('dropped')
			}
		} else if (!isHorizontal && !blockedVertical.includes(lastId)) {
			for (let i = 0; i < length; i++) {
				plrSquares[
					parseInt(this.dataset.id) - selectedShipIndex + width * i
				].classList.remove('board-cell')
				plrSquares[
					parseInt(this.dataset.id) - selectedShipIndex + width * i
				].classList.add('taken', shipName)
				draggedShip.classList.add('dropped')
			}
		} else return
	}
}

export default drag

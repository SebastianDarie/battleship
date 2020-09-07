const Ship = (id, coords) => {
	const ship = new Array(coords.length).fill(false)

	function hit(num) {
		let idx = coords.indexOf(num)
		ship[idx] = true

		return ship
	}

	function isSunk() {
		const sunk = ship.reduce((prev, cur) => prev && cur, true)

		return sunk
	}

	return { ship, id, hit, isSunk }
}

export default Ship

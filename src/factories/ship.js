const Ship = (length) => {
	const ship = Array(length).fill(false)
	const id = Math.round(Math.random() * 100)

	function hit(num) {
		ship[num] = true

		return ship
	}

	function isSunk() {
		const sunk = ship.reduce((prev, cur) => prev && cur, true)

		return sunk
	}

	return { ship, id, hit, isSunk }
}

export default Ship

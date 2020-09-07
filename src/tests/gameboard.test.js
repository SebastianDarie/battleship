import Gameboard from '../factories/gameboard'

describe('testing the gameboard factory', () => {
	test('returns an object', () => {
		expect(typeof Gameboard()).toBe('object')
	})

	describe('testing placeShip func', () => {
		test('can place a ship', () => {
			const mockBoard = Gameboard()
			mockBoard.placeShip([12, 3])
			expect(mockBoard.gameBoard[12]).toBe(1)
			expect(mockBoard.gameBoard[3]).toBe(1)
			expect(mockBoard.gameBoard[2]).toBe(undefined)
		})

		test('ships dont overlap', () => {
			const mockBoard = Gameboard()
			mockBoard.placeShip([4, 5])
			mockBoard.placeShip([4, 5, 6, 7])
			expect(mockBoard.gameBoard[4]).toBe(1)
			expect(mockBoard.gameBoard[5]).toBe(1)
			expect(mockBoard.gameBoard[6]).toBe(undefined)
			expect(mockBoard.gameBoard[7]).toBe(undefined)
		})

		test('ships can be vertical', () => {
			const mockBoard = Gameboard()
			mockBoard.placeShip([51, 61, 71])
			expect(mockBoard.gameBoard[51]).toBe(1)
			expect(mockBoard.gameBoard[61]).toBe(1)
			expect(mockBoard.gameBoard[71]).toBe(1)
		})
	})

	describe('testing the receiveAttack func', () => {
		test('records misses', () => {
			const mockBoard = Gameboard()
			mockBoard.placeShip([4, 5, 6])
			mockBoard.receiveAttack(7)
			mockBoard.receiveAttack(3)
			expect(mockBoard.gameBoard[3]).toBe('missed')
			expect(mockBoard.gameBoard[7]).toBe('missed')
		})

		test('records hits', () => {
			const mockBoard = Gameboard()
			mockBoard.placeShip([1, 2, 3])
			mockBoard.placeShip([13, 14])
			mockBoard.receiveAttack(1)
			mockBoard.receiveAttack(14)

			expect(mockBoard.gameBoard[1]).toBe('hit')
			expect(mockBoard.gameBoard[14]).toBe('hit')
			expect(mockBoard.ships[0].ship[0]).toBe(true)
			expect(mockBoard.ships[1].ship[1]).toBe(true)
		})
	})

	describe('testing the sunk func', () => {
		test('tracks if a ship is sunk', () => {
			const mockBoard = Gameboard()
			mockBoard.placeShip([1, 2, 3])
			mockBoard.placeShip([11, 21, 31])
			mockBoard.placeShip([5, 6, 7, 8])

			mockBoard.receiveAttack(5)
			mockBoard.receiveAttack(6)
			mockBoard.receiveAttack(7)
			mockBoard.receiveAttack(8)

			expect(mockBoard.ships.length).toBe(3)
			expect(mockBoard.ships[2].isSunk()).toBe(true)
		})

		test('tracks if all ships are sunk', () => {
			const mockBoard = Gameboard()
			mockBoard.placeShip([1, 2, 3])
			mockBoard.placeShip([5, 6, 7])
			mockBoard.placeShip([11, 12])

			expect(mockBoard.ships.length).toBe(3)
			expect(mockBoard.shipsSunk()).toBe(false)

			mockBoard.receiveAttack(1)
			mockBoard.receiveAttack(2)
			mockBoard.receiveAttack(3)
			expect(mockBoard.shipsSunk()).toBe(false)

			mockBoard.receiveAttack(5)
			mockBoard.receiveAttack(6)
			mockBoard.receiveAttack(7)
			expect(mockBoard.shipsSunk()).toBe(false)

			mockBoard.receiveAttack(11)
			mockBoard.receiveAttack(12)
			expect(mockBoard.shipsSunk()).toBe(true)
		})
	})
})

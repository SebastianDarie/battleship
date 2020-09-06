import Ship from '../factories/ship'

describe('testing Ship factory', () => {
	const mockShip = Ship(3)

	test('ship is an object', () => {
		expect(typeof Ship(3)).toBe('object')
	})

	test('ship properties are available', () => {
		expect(Object.keys(Ship(3))).toContain('ship')
		expect(Object.keys(Ship(3))).toContain('id')
		expect(Object.keys(Ship(3))).toContain('hit')
		expect(Object.keys(Ship(3))).toContain('isSunk')
	})

	test('testing hit function', () => {
		mockShip.hit(2)
		expect(mockShip.ship[2]).toBe(true)
		expect(mockShip.ship[1]).toBe(false)
		expect(mockShip.ship[3]).toBe(undefined)
	})

	test('testing isSunk function', () => {
		mockShip.hit(0)
		mockShip.hit(1)
		mockShip.hit(2)

		expect(mockShip.isSunk()).toBe(true)
	})

	test('isSunk doesnt return true after 1 hit', () => {
		const mock = Ship(4)

		mock.hit(2)

		expect(mock.isSunk()).toBe(false)
	})

	test('ship id test', () => {
		expect(mockShip.id).toBe(5)
	})
})

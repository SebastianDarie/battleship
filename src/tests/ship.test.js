import Ship from '../factories/ship'

describe('testing Ship factory', () => {
	const mockShip = Ship(0, [1, 2, 3])

	test('ship is an object', () => {
		expect(typeof mockShip).toBe('object')
	})

	test('ship properties are available', () => {
		expect(Object.keys(mockShip)).toContain('ship')
		expect(Object.keys(mockShip)).toContain('id')
		expect(Object.keys(mockShip)).toContain('hit')
		expect(Object.keys(mockShip)).toContain('isSunk')
	})

	test('testing hit function', () => {
		mockShip.hit(2)
		expect(mockShip.ship[2]).toBe(false)
		expect(mockShip.ship[1]).toBe(true)
		expect(mockShip.ship[3]).toBe(undefined)
	})

	test('testing isSunk function', () => {
		mockShip.hit(1)
		mockShip.hit(2)
		mockShip.hit(3)

		expect(mockShip.isSunk()).toBe(true)
	})

	test('isSunk doesnt return true after 1 hit', () => {
		const mock = Ship(0, [1, 2, 3, 4])

		mock.hit(2)

		expect(mock.isSunk()).toBe(false)
	})

	test('ship id test', () => {
		expect(mockShip.id).toBe(0)
	})
})

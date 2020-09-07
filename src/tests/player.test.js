import Player from '../factories/player'
import GameBoard from '../factories/gameboard'

describe('testing the player factory', () => {
	test('player exists and is an object', () => {
		const mockPlayer = Player()

		expect(mockPlayer).toBeTruthy()
		expect(typeof mockPlayer).toBe('object')
	})

	describe('player interaction', () => {
		let mockPlr1, mockPlr2, plr1Board, plr2Board

		beforeEach(() => {
			mockPlr1 = Player()
			mockPlr2 = Player()
			plr1Board = GameBoard()
			plr2Board = GameBoard()
		})

		test('can attack each other', () => {
			mockPlr1.attack(plr2Board, 3)
			mockPlr2.attack(plr1Board, 1)

			expect(plr1Board.gameBoard[1]).toBe('missed')
			expect(plr2Board.gameBoard[3]).toBe('missed')
		})

		test('get & set turns for plrs', () => {
			mockPlr1.setTurn(false)
			mockPlr2.setTurn(false)

			expect(mockPlr1.getTurn()).toBeFalsy()
			expect(mockPlr2.getTurn()).toBeFalsy()

			mockPlr1.setTurn(true)
			mockPlr2.setTurn(true)

			expect(mockPlr1.getTurn()).toBeTruthy()
			expect(mockPlr2.getTurn()).toBeTruthy()
		})

		test("cant attack on enemy's turn", () => {
			mockPlr1.setTurn(false)
			mockPlr1.attack(plr2Board, 3)

			expect(plr2Board.gameBoard[3]).toBeUndefined()
		})
	})

	describe('testing the ai player', () => {
		let mockAI, board

		beforeEach(() => {
			mockAI = Player()
			board = GameBoard()
		})

		test('random attack func', () => {
			mockAI.aiAttack(board)
			expect(board.gameBoard.filter((x) => x === 'missed').length).toBe(1)
		})

		test('wont attack the same square twice', () => {
			let arr = Array(100).fill('hit')
			arr[7] = undefined

			board.gameBoard.length = 0
			board.gameBoard.push(...arr)

			mockAI.aiAttack(board)

			expect(board.gameBoard[7]).toBe('missed')
		})
	})
})

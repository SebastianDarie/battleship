import Player from './factories/player.js'
import Gameboard from './factories/gameboard'
import render from './game/render'
import game from './game/game'
import getAiShips from './game/getAiShips'

import './style.css'

const startButton = document.querySelector('.start-btn')

render()

const setup = () => {
	const plr1 = Player()
	const plr2 = Player()

	const plr1Board = Gameboard()
	const plr2Board = Gameboard()

	let plr2Ships = getAiShips()

	plr2Ships.forEach((ship) => plr2Board.placeShip(ship))

	startButton.addEventListener('click', () => {
		playGame(plr1, plr2, plr1Board, plr2Board)
	})

	console.log(plr2Board.ships)
}

const playGame = (plr1, plr2, plr1Board, plr2Board) => {
	game(plr1, plr2, plr1Board, plr2Board)
}

setup()

const turnText = document.querySelector('.title')

const game = (plr1, plr2, plr1Board, plr2Board) => {
	plr1.setTurn(true)
	plr2.setTurn(false)

	if (plr1.getTurn()) {
		turnText.innerHTML = "Player's turn"
	} else {
		turnText.innerHTML = "Computer's turn"
	}
}

export default game

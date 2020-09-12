const updateAiBoard = (board) => {
	const aiBoard = document.querySelector('#plr2')

	let squareArr = [...aiBoard.childNodes]

	squareArr.forEach((square, idx) => {
		if (board.gameBoard[idx] === 'missed') {
			square.classList.add('missed')
			square.innerHTML = '<span class="center">•</span>'
		} else if (board.gameBoard[idx] === 'hit') {
			square.style.backgroundColor = '#ff2808'
			square.style.border = '1px solid #ff2808'
			square.innerHTML = '<span class="center">x</span>'
		}
	})
}

export default updateAiBoard

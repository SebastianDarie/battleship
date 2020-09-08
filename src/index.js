import './style.css'

//Temporary Code

const plrBoard = document.querySelector('#plr1')
const aiBoard = document.querySelector('#plr2')

for (let i = 0; i < 100; i++) {
	const div1 = document.createElement('div')
	const div2 = document.createElement('div')
	div1.classList.add('board-cell')
	div2.classList.add('board-cell')

	plrBoard.appendChild(div1)
	aiBoard.appendChild(div2)
}

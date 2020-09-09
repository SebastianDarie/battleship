import './style.css'

//Temporary Code

const ships = document.querySelectorAll('#ships')
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

ships.forEach((ship) => {
	ship.addEventListener('dragstart', () => {
		ship.classList.add('dragging')
	})

	ship.addEventListener('dragend', () => {
		ship.classList.remove('dragging')
	})
})

plrBoard.addEventListener('dragover', (e) => {
	e.preventDefault()

	const afterEl = getDragEl(plrBoard, e.clientY)
	const dragged = document.querySelector('.dragging')
	console.log(afterEl)

	if (afterEl === null) {
		plrBoard.appendChild(dragged)
	} else {
		plrBoard.insertBefore(dragged, afterEl)

		// afterEl.replaceWith(dragged)
	}
})

function getDragEl(board, y) {
	const squares = [...board.querySelectorAll('.board-cell')]

	return squares.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect()
			const offset = y - box.top - box.height / 2
			if (offset < 0 && offset > closest.offset) {
				return { offset, element: child }
			} else {
				return closest
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element
}

// document.addEventListener('dragenter', (e) => {
// 	if (e.target.className === 'board-cell') {
// 		e.target.style.opacity = 0.75
// 		e.target.style.backgroundColor = '#70E4EF'
// 	}
// })

// document.addEventListener('dragleave', (e) => {
// 	if (e.target.className === 'board-cell') {
// 		e.target.style.opacity = 1
// 		e.target.style.backgroundColor = '#fff'
// 	}
// })

// document.addEventListener('drop', (e) => {
// 	if (e.target.className === 'board-cell') {
// 		e.target.style.background = ''
// 		dragged.parentNode.removeChild(dragged)
// 		e.target.appendChild(dragged)
// 	}

// 	e.preventDefault()
// })

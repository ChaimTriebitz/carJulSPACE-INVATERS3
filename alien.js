const ALIEN_SPEED = 500
console.table('alien')

var gIntervalAliens
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gAliensLeftIdx
var gAliensRightIdx

var gIsAlienFreeze = false

function createAliens(board) {
	for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
		for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
			board[i][j].gameObject = ALIEN
			gGame.aliensCount++
		}
	}
}

function shiftBoardRight(board) {
	if (gIsAlienFreeze) return
	for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
		for (var j = gAliensRightIdx; j >= gAliensLeftIdx; j--) {
			board[i][j + 1].gameObject =
				board[i][j].gameObject === ALIEN ? ALIEN : null
			board[i][j].gameObject = null
		}
	}
	gAliensRightIdx++
	gAliensLeftIdx++
}
function shiftBoardDown(board) {
	if (gIsAlienFreeze) return
	for (var i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
		for (var j = gAliensLeftIdx; j <= gAliensRightIdx; j++) {
			board[i + 1][j].gameObject =
				board[i][j].gameObject === ALIEN ? ALIEN : null
			board[i][j].gameObject = null
		}
	}
	gAliensTopRowIdx++
	gAliensBottomRowIdx++
}
function shiftBoardLeft(board) {
	if (gIsAlienFreeze) return
	for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
		for (var j = gAliensLeftIdx; j <= gAliensRightIdx; j++) {
			var cell = board[i][j]
			board[i][j - 1].gameObject = cell.gameObject === ALIEN ? ALIEN : null
			cell.gameObject = null
		}
	}
	gAliensRightIdx--
	gAliensLeftIdx--
}

function moveAliens(board) {
	if (gAliensTopRowIdx % 2 === 0 && gAliensRightIdx !== BOARD_SIZE - 1) {
		shiftBoardRight(board)
		renderBoard(board)
		return
	}
	if (
		(gAliensTopRowIdx % 2 === 0 && gAliensRightIdx === BOARD_SIZE - 1) ||
		(gAliensTopRowIdx % 2 !== 0 && gAliensLeftIdx === 0)
	) {
		shiftBoardDown(board)
		renderBoard(board)
		if (gAliensBottomRowIdx === BOARD_SIZE - 1) {
			gameOver('Unfortently You Lost')
		}
		return
	}
	if (gAliensTopRowIdx % 2 !== 0 && gAliensLeftIdx !== 0) {
		shiftBoardLeft(board, gAliensLeftIdx, gAliensLeftIdx - 1)
		renderBoard(board)
		return
	}
}

const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '♆'
const ALIEN = '👽'
const LASER = '⤊'
const BLOW = '🎆'
const SUPER_LASER = '↟'
const CANDIE = '🍬'
const laserAudio = new Audio('laser1.mp3')
const laserSuperAudio = new Audio('laser-super.mp3')
const bombNegsAudio = new Audio('blow-negs.mp3')
const lickAudio = new Audio('lick-sound.mp3')
const winAudio = new Audio('win.mp3')
const looseAudio = new Audio('game-over.mp3')

var gCandiesInterval
var gBoard
var gGame = {}
console.table('game')
function init(elBtn) {
	setGame()
	gBoard = createBoard()
	createHero(gBoard)
	createAliens(gBoard)
	renderBoard(gBoard)
	gIntervalAliens = setInterval(moveAliens, ALIEN_SPEED, gBoard)
	gCandiesInterval = setInterval(setCandie, 10000)
	console.table(gBoard)
}
function setGame() {
	document.querySelector('.start').hidden = true
	gGame = { isOn: true, aliensCount: 0 }
	gHero = {
		pos: { i: 13, j: 6 },
		isShoot: false,
		score: 0,
		superShots: 3,
	}
	gAliensTopRowIdx = 0
	gAliensBottomRowIdx = ALIENS_ROW_COUNT - 1
	gAliensLeftIdx = 0
	gAliensRightIdx = ALIENS_ROW_LENGTH - 1
}
function createBoard() {
	const board = []
	for (var i = 0; i < BOARD_SIZE; i++) {
		board.push([])
		for (var j = 0; j < BOARD_SIZE; j++) {
			board[i][j] =
				i === BOARD_SIZE - 1 ? createCell('GROUND') : createCell('SKY')
		}
	}
	return board
}
function renderBoard(board) {
	var strHTML = ''
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n'
		for (var j = 0; j < board[0].length; j++) {
			const cell = board[i][j].gameObject ? board[i][j].gameObject : ''
			const className = `cell cell-${i}-${j}`
			strHTML += `<td class="${className}">${cell}</td>\n`
		}
		strHTML += '</tr>\n'
	}
	const elBoard = document.querySelector('.board')
	elBoard.innerHTML = strHTML
}
function setCandie() {
	var randomj = getRandomInt(0, BOARD_SIZE)
	var pos = { i: BOARD_SIZE - 1, j: randomj }
	if (
		gBoard[pos.i][pos.j].gameObject === HERO ||
		gBoard[pos.i][pos.j].gameObject === CANDIE
	) {
		setCandie()
		return
	}
	updateCell(pos, CANDIE)
}
function createCell(type, gameObject = null) {
	return { type, gameObject }
}
function updateCell(pos, gameObject = null) {
	gBoard[pos.i][pos.j].gameObject = gameObject
	const elCell = getElCell(pos)
	elCell.innerHTML = gameObject || ''
}
function gameOver(reason) {
	reason === 'Congratulations You Won!' ? winAudio.play() : looseAudio.play()
	clearInterval(gIntervalAliens)
	clearInterval(gCandiesInterval)
	gGame.isOn = false
	const elModalH1 = document.querySelector('.modal h1')
	elModalH1.innerText = reason
	const elModal = document.querySelector('.modal')
	elModal.hidden = false
}

function restart() {
	gHero.score = 0
	const elScore = document.querySelector('.score')
	elScore.innerText = gHero.score
	const elModal = document.querySelector('.modal')
	elModal.hidden = true
	init()
}

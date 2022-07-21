const LASER_SPEED = 80
console.table('hero')

var gShotInterval
var gHero = {}
gIsHit = false
gIsPressN = false
function createHero(board) {
	board[gHero.pos.i][gHero.pos.j].gameObject = HERO
}
function onKeyDown(ev) {
	if (!gGame.isOn) return
	console.log(ev.key)
	switch (ev.key) {
		case 'ArrowRight':
			if (gHero.pos.j === gBoard.length - 1) return
			moveHero(1)
			break
		case 'ArrowLeft':
			if (gHero.pos.j === 0) return
			moveHero(-1)
			break
		case ' ':
			shoot()
			gHero.isShoot = true
			break
		case 'n':
			gIsPressN = true
			break
		case 'x':
			if (gHero.superShots === 0) return
			shootSuper()
			gHero.isShoot = true
			break
	}
}
function moveHero(dir) {
	const newPos = { i: gHero.pos.i, j: gHero.pos.j + dir }
	if (gBoard[newPos.i][newPos.j].gameObject === CANDIE) {
		lickAudio.play()
		gIsAlienFreeze = true
		setTimeout(() => (gIsAlienFreeze = false), 5000)
		updateScore(50)
	}

	updateCell(gHero.pos, null)
	updateCell(newPos, HERO)
	gHero.pos = newPos
}
function shoot() {
	if (gHero.isShoot) return
	laserAudio.play()
	var shotPos = { i: gHero.pos.i - 1, j: gHero.pos.j }
	updateCell(shotPos, LASER)
	gShotInterval = setInterval(blinkLaser, LASER_SPEED, shotPos, LASER)
}
function blinkLaser(pos, laser) {
	updateCell(pos, null)
	pos.i--
	if (gBoard[pos.i][pos.j].gameObject === ALIEN) {
		console.log(gBoard[pos.i][pos.j])
		endShot(pos)
		if (pos.i === gAliensTopRowIdx) {
			if (pos.j === gAliensLeftIdx) gAliensLeftIdx++
			else if (pos.j === gAliensRightIdx) gAliensRightIdx--
		}
		updateScore(10)
		return
	}
	if (pos.i === 0) {
		endShot(pos)
		return
	}
	updateCell(pos, laser)
	gIsPressN = false
}
function updateScore(score) {
	gHero.score += score
	const elScore = document.querySelector('.score')
	elScore.innerText = gHero.score

	if (gHero.score > gGame.aliensCount * 10) gameOver('Congratulations You Won!')
}
function endShot(pos) {
	clearInterval(gShotInterval)
	gHero.isShoot = false
	updateCell(pos, null)
	if (gIsPressN) {
		blowAlienNegs(pos)
		updateCell(pos, BLOW)
		setTimeout(updateCell, 500, pos, null)
	}
}

function blowAlienNegs(pos) {
	bombNegsAudio.play()
	const negs = getNeighbors(pos.i, pos.j, gBoard)
	for (var i = 0; i < negs.length; i++) {
		updateCell(negs[i], null)
		gHero.score += 10
	}
}

function shootSuper() {
	if (gHero.isShoot) return
	laserSuperAudio.play()
	gHero.superShots--
	var shotPos = { i: gHero.pos.i - 1, j: gHero.pos.j }
	updateCell(shotPos, SUPER_LASER)
	gShotInterval = setInterval(blinkLaser, 31, shotPos, SUPER_LASER)
}

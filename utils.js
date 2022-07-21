'use strict'

function getElCell(pos) {
	return document.querySelector(`.cell-${pos.i}-${pos.j}`)
}
//matrix
function getNeighbors(cellI, cellJ, mat) {
	var neighbors = []
	for (var i = cellI - 1; i <= cellI + 1; i++) {
		if (i < 0 || i >= mat.length) continue
		for (var j = cellJ - 1; j <= cellJ + 1; j++) {
			if (i === cellI && j === cellJ) continue
			if (j < 0 || j >= mat[i].length) continue
			neighbors.push({ i, j })
		}
	}
	return neighbors
}
function printPrimaryDiagonal(squareMat) {
	for (var d = 0; d < squareMat.length; d++) {
		var item = squareMat[d][d]
		// console.log(item)
	}
}
function printSecondaryDiagonal(squareMat) {
	for (var d = 0; d < squareMat.length; d++) {
		var item = squareMat[d][squareMat.length - d - 1]
		// console.log(item)
	}
}
function createMat(ROWS, COLS) {
	var mat = []
	for (var i = 0; i < ROWS; i++) {
		var row = []
		for (var j = 0; j < COLS; j++) {
			row.push('')
		}
		mat.push(row)
	}
	return mat
}
function printMat(mat, selector) {
	var strHTML = '<table border="0"><tbody>'
	for (var i = 0; i < mat.length; i++) {
		strHTML += '<tr>'
		for (var j = 0; j < mat[0].length; j++) {
			const cell = mat[i][j]
			const className = 'cell cell-' + i + '-' + j
			strHTML += `<td class="${className}">${cell}</td>`
		}
		strHTML += '</tr>'
	}
	strHTML += '</tbody></table>'
	const elContainer = document.querySelector(selector)
	elContainer.innerHTML = strHTML
}
function renderCell(location, value) {
	const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
	elCell.innerHTML = value
}
function getEmptyCell() {
	const emptyCells = []
	for (let i = 0; i < gBoard.length; i++) {
		for (let j = 0; j < gBoard[i].length; j++) {
			if (gBoard[i][j] === EMPTY) {
				emptyCells.push({ i, j })
			}
		}
	}
	const idx = getRandomInt(0, emptyCells.length)
	return emptyCells[idx]
}
//random
function getRandomColor() {
	var letters = '0123456789ABCDEF'
	var color = '#'
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}
function getRandomInt(min, max) {
	return Math.floor((max - min) * Math.random()) + min
}
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min)
}
//timer
var gStartTime = 0
var gBtnIsOn = false
var gTimeInterval

function timer() {
	var currTime = new Date().getTime()
	var timePassed = new Date(currTime - gStartTime)
	//zero padding
	var padMins = timePassed.getMinutes() < 10 ? '0' : ''
	var padSecs = timePassed.getSeconds() < 10 ? '0' : ''
	var padMilis = timePassed.getMilliseconds()
	if (padMilis < 10) {
		padMilis = '00'
	} else if (padMilis < 100) {
		padMilis = '0'
	} else padMilis = ''
	//
	var mins = padMins + timePassed.getMinutes()
	var secs = padSecs + timePassed.getSeconds()
	var milis = padMilis + timePassed.getMilliseconds()
	var elTime = document.querySelector('.time')
	elTime.innerText = `${mins}:${secs}:${milis}`
}
function clickTimer(elBtn) {
	gBtnIsOn = !gBtnIsOn
	if (gBtnIsOn) {
		elBtn.innerText = 'Stop'
		gStartTime = new Date().getTime()
		gTimeInterval = setInterval(timer, 31)
	} else {
		elBtn.innerText = 'Start'
		gStartTime = 0
		clearInterval(gTimeInterval)
	}
}

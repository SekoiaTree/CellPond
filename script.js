
/*

Welcome traveller.
Welcome to the SOURCE of the CellPond.

If you venture further, may tode be with you.
What you are about to discover...
	... is a single javascript file ...
		... of gargantuan size ...
			... over 5000 lines ...
				... globally scoped ...

	>>> There is no room for fear here! <<<

Be brave.
	Trust no comments.
		Trust no names.

A simple seed ... grown into a mountain ...
Coding CellPond is a performance ...
	and by reading this you join the performance ...




I'm just joking.
That would be ridiculous!

don't take it too seriously

*/

const urlParams = new URLSearchParams(window.location.search)
const NO_SECRET_MODE = urlParams.has("nosecret")
const NO_FOOLS_MODE = urlParams.has("nofools")
const UNLOCK_MODE = urlParams.has("unlock")
if (NO_SECRET_MODE) {
	localStorage.setItem("secretHasAlreadyBeenRevealed", "true")
}

const secretHasAlreadyBeenRevealed = localStorage.getItem("secretHasAlreadyBeenRevealed")


let secretScore = 0
const tickSecret = () => {
	secretScore++
	if (secretScore === Infinity) {
		localStorage.setItem("secretHasAlreadyBeenRevealed", "true")

		// WOAH WOAH! You can't come snooping in the source code for secrets!!
		// I'm just kidding :)
		// For your curiosity, you WIN entry to the semi-secret TodePond discord server: https://discord.gg/AYDXBVPAzz

		if (confirm(`Congratulations! You have been using CellPond for ${secretScore} frames!\nAs a reward, you have won entry into the semi-secret TodePond discord server!\n\nDo you accept this (one-time-only) prize?`)) {
			window.location.href='https://discord.gg/AYDXBVPAzz';
		}
	}
	requestAnimationFrame(tickSecret)
	
}

if (secretHasAlreadyBeenRevealed !== "true") {
	requestAnimationFrame(tickSecret)

	const secretMessageDelay = 1300
	let secretMessageTimer = 0
	setTimeout(() => console.log("Are you tinkering with CellPond?"), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("Congratulations, you've gained access to the semi-secret TodePond discord!"), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("Here's the link: https://discord.gg/AYDXBVPAzz"), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("This message will self-destruct in 10..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("9..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("8..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("7..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("6..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("5..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("4..."), secretMessageTimer += secretMessageDelay)
	const nosecreturl = window.location.href.includes("&")? `${window.location.href}&nosecret` : `${window.location.href}?nosecret`
	setTimeout(() => console.log(`By the way, you can disable this secret message FOREVER by clicking this link:\n${nosecreturl}`), secretMessageTimer)
	setTimeout(() => console.log("3..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("2..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("1..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("0..."), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.log("RIBBIT!"), secretMessageTimer += secretMessageDelay)
	setTimeout(() => console.clear(), secretMessageTimer += secretMessageDelay)
}


//========//
// COLOUR //
//========//
Colour.splash()
const TODEPOND_COLOURS = [
	Colour.Green.splash,
	Colour.Red.splash,
	Colour.Blue.splash,
	Colour.Yellow.splash,
	Colour.Orange.splash,
	Colour.Pink.splash,
	Colour.Rose.splash,
	Colour.Cyan.splash,
	Colour.Purple.splash,

	Colour.Black.splash,
	Colour.Grey.splash,
	Colour.Silver.splash,
	Colour.White.splash,
]

const TODEPOND_RAINBOW_COLOURS = TODEPOND_COLOURS.slice(0, -4)

const getRGB = (splash) => {
	const gb = splash % 100
	let b = gb % 10
	let g = gb - b
	let r = splash - gb
	return [r, g, b]
}

const clamp = (number, min, max) => {
	if (number < min) return min
	if (number > max) return max
	return number
}

let brushColourCycleIndex = 0
const brushColourCycle = [
	999,

	Colour.Green.splash,
	Colour.Blue.splash,
	Colour.Red.splash,
	Colour.Yellow.splash,

	Colour.Black.splash,
	
	Colour.Rose.splash,
	Colour.Cyan.splash,
	Colour.Orange.splash,
	Colour.Purple.splash,
	Colour.Pink.splash,
	
	Colour.Grey.splash,
	Colour.Silver.splash,
]

//======//
// CELL //
//======//
const makeCell = ({x=0, y=0, width=1, height=1, colour=112} = {}) => {
	
	const left = x
	const right = x+width
	const top = y
	const bottom = y+height
	
	const size = width * height

	const centerX = left + width/2
	const centerY = top + height/2

	const sections = []
	const lastDraw = undefined
	//const lastDrawCount = 1
	const lastDrawRepeat = 0

	const cell = {x, y, width, height, colour, left, right, top, bottom, centerX, centerY, sections, size, lastDraw, lastDrawRepeat}
	return cell

}

const pickCell = (x, y) => {

	if (x >= 1) return undefined
	if (y >= 1) return undefined
	if (x <  0) return undefined
	if (y <  0) return undefined

	const gridX = Math.floor(x * GRID_SIZE)
	const gridY = Math.floor(y * GRID_SIZE)
	const sectionId = gridX*GRID_SIZE + gridY
	const section = state.grid[sectionId]

	if (section === undefined) return undefined

	let i = 1
	const size = section.size

	for (const cell of section.values()) {
		if (i === size) return cell
		i++
		if (cell.left > x) continue
		if (cell.top > y) continue
		if (cell.right <= x) continue
		if (cell.bottom <= y) continue
		return cell
	}

	return undefined
}

const pickNeighbour = (cell, dx, dy) => {
	const centerX = cell.left + cell.width/2
	const centerY = cell.top + cell.height/2

	const x = centerX + dx*cell.width
	const y = centerY + dy*cell.height

	const neighbour = pickCell(x, y)
	return neighbour
}

const pickRandomCell = () => {
	const x = Math.random()
	const y = Math.random()
	const cell = pickCell(x, y)
	return cell
}

const pickRandomVisibleCell = () => {
	
	if (!state.view.visible) return undefined
	if (state.view.fullyVisible) return pickRandomCell()
	
	const x = state.region.left + Math.random() * state.region.width
	const y = state.region.top + Math.random() * state.region.height
	const cell = pickCell(x, y)
	return cell
}

//=======//
// STATE //
//=======//
const state = {

	grid: [],
	cellCount: 0,

	ticker: () => {},
	time: 0,
	maxTime: 9999999,

	


	
	
	speed: {
		count: 100,
		dynamic: false,
		aer: 2.0,
		redraw: 300.0,
		redrawRepeatScore: 1.0,
		redrawRepeatPenalty: 0.0,
	},

	speed: {
		count: 4096 * 0.5,
		dynamic: false,
		//aer: 1.0,
		redraw: 2.0,
		redrawRepeatScore: 0.5,
		redrawRepeatPenalty: 0.0,
	},

	image: {

		data: undefined,
		size: undefined,
		baseSize: undefined,

	},

	view: {

		height: undefined,
		width: undefined,
		iheight: undefined,
		iwidth: undefined,
		
		left: undefined,
		right: undefined,
		top: undefined,
		bottom: undefined,

		visible: true,
		fullyVisible: true,


	},

	region: {
		left: 0.0,
		right: 1.0,
		top: 0.0,
		bottom: 1.0,

		width: 1.0,
		height: 1.0,
	},

	camera: {
		x: 0,
		y: 0,

		dx: 0,
		dy: 0,

		dxTarget: 0,
		dyTarget: 0,
		dsControl: 1,
		dsTargetSpeed: 0.05,

		scale: 0.9,
		mscale: 1.0,
		dmscale: 0.002,

		mscaleTarget: 1.0,
		mscaleTargetControl: 0.001,
		mscaleTargetSpeed: 0.05,

	},

	brush: {
		colour: Colour.Purple.splash,
		colour: Colour.Rose.splash,
		colour: Colour.Yellow.splash,
		colour: Colour.Grey.splash,
		colour: Colour.Green.splash,
		colour: 999,
		size: 1,
	},

	cursor: {
		previous: { 
			x: undefined,
			y: undefined,
		},
	},

	dragon: {
		behaves: [],
	}
}

const WORLD_SIZE = 6
const WORLD_CELL_COUNT = 2 ** (WORLD_SIZE*2)
const WORLD_DIMENSION = 2 ** WORLD_SIZE
const WORLD_CELL_SIZE = 1 / WORLD_DIMENSION

const addCell = (cell) => {
	cacheCell(cell)
	state.cellCount++
}

const deleteCell = (cell) => {
	uncacheCell(cell)
	state.cellCount--
}

const getCells = () => {
	const cells = new Set()
	for (const section of state.grid) {
		for (const cell of section.values()) {
			cells.add(cell)
		}
	}
	return cells
}

//======//
// GRID //
//======//
// The grid is basically the screen cut up into smaller sections
// It helps to speed up cell lookup because it gives us a smaller area to search through
// Note: Cells can be in multiple sections if they are big enough :)
// NOTE: GRID_SIZE MUST BE BIG ENOUGH SO THAT SECTIONS ARE SMALLER OR EQUAL TO WORLD CELLS
const GRID_SIZE = 256
for (let x = 0; x < GRID_SIZE; x++) {
	for (let y = 0; y < GRID_SIZE; y++) {
		const section = new Set()
		state.grid.push(section)
	}
}

const cacheCell = (cell) => {
	const left = Math.floor(cell.left * GRID_SIZE)
	const top = Math.floor(cell.top * GRID_SIZE)
	const right = Math.ceil(cell.right * GRID_SIZE)
	const bottom = Math.ceil(cell.bottom * GRID_SIZE)

	for (let x = left; x < right; x++) {
		for (let y = top; y < bottom; y++) {
			const id = x*GRID_SIZE + y
			if (state.grid[id] === undefined) {
				continue
			}
			state.grid[id].add(cell)
			cell.sections.push(state.grid[id])
		}
	}
}

const uncacheCell = (cell) => {
	for (const section of cell.sections) {
		section.delete(cell)
	}
}

//=======//
// SETUP //
//=======//
// Setup World
const world = makeCell({colour: WORLD_SIZE * 111})
addCell(world)

on.load(() => {

	
	// Setup Show
	const show = Show.start({paused: false})
	const {context, canvas} = show
	canvas.style["position"] = "absolute"
	
	//===============//
	// IMAGE + SIZES //
	//===============//
	const updateImageSize = () => {
		state.image.baseSize = Math.min(canvas.width, canvas.height)
		state.image.size = state.image.baseSize * state.camera.scale

		state.image.left = state.camera.x * state.camera.scale
		state.image.top = state.camera.y * state.camera.scale
		state.image.right = state.image.left + state.image.size
		state.image.bottom = state.image.top + state.image.size

		state.view.left = clamp(state.image.left, 0, canvas.width)
		state.view.top = clamp(state.image.top, 0, canvas.height)
		state.view.right = clamp(state.image.right, 0, canvas.width)
		state.view.bottom = clamp(state.image.bottom, 0, canvas.height)
		
		state.view.width = state.view.right - state.view.left
		state.view.height = state.view.bottom - state.view.top

		state.view.visible = state.view.width > 0 && state.view.height > 0
		state.view.fullyVisible = state.view.left === state.image.left && state.view.right === state.image.right && state.view.top === state.image.top && state.view.bottom === state.image.bottom
		
		state.view.iwidth = Math.ceil(state.view.width)
		state.view.iheight = Math.ceil(state.view.height)

		state.region.left = (state.view.left - state.image.left) / state.image.size
		state.region.right = 1.0 + (state.view.right - state.image.right) / state.image.size
		state.region.top = (state.view.top - state.image.top) / state.image.size
		state.region.bottom = 1.0 + (state.view.bottom - state.image.bottom) / state.image.size

		state.region.width = state.region.right - state.region.left
		state.region.height = state.region.bottom - state.region.top

		//state.image.data = context.getImageData(0, 0, state.image.size.iwidth, state.image.size.iheight)
	}

	const updateImageData = () => {
		state.image.data = context.getImageData(0, 0, canvas.width, canvas.height)
	}

	// Setup ImageData
	context.fillStyle = Colour.Void
	context.fillRect(0, 0, canvas.width, canvas.height)
	updateImageSize()
	updateImageData()

	state.camera.x += (canvas.width - state.image.size) / 2
	state.camera.y += (canvas.height - state.image.size) / 2

	//======//
	// DRAW //
	//======//
	show.resize = () => {
		context.fillStyle = Colour.Void
		context.fillRect(0, 0, canvas.width, canvas.height)
		updateImageSize()
		updateImageData()
	}

	const stampScale = (scale) => {

		//context.fillStyle = Colour.Void
		//context.fillRect(0, 0, canvas.width, canvas.height)
		//context.drawImage(canvas, 0, 0, canvas.width * scale, canvas.height * scale)


		/*if (scale < 1.0) {
			const growthX = canvas.width - canvas.width * scale
			const growthY = canvas.height - canvas.height * scale
			//context.fillRect(canvas.width - growthX, 0, growthX, canvas.height)
			//context.fillRect(0, canvas.height - growthY, canvas.width, growthY)
		}*/

		updateImageSize()
	}

	const drawCells = () => {
		const cells = getCells()
		for (const cell of cells.values()) {
			setCellColour(cell, cell.colour)
		}
	}

	const drawCell = (cell, override) => {
		return setCellColour(cell, cell.colour, override)
	}

	const isCellVisible = (cell) => {
		if (cell.right <= state.region.left) return false
		if (cell.left >= state.region.right) return false
		if (cell.bottom <= state.region.top) return false
		if (cell.top >= state.region.bottom) return false
		return true
	}

	const setCellColour = (cell, colour, override = false) => {
		
		cell.colour = colour
		if (!isCellVisible(cell)) return 0
		
		if (!override && cell.lastDraw === state.time) {
			cell.lastDrawRepeat += state.speed.redrawRepeatPenalty
			return state.speed.redrawRepeatScore * cell.lastDrawRepeat
		}

		const size = state.image.size
		const imageWidth = canvas.width

		const panX = state.camera.x * state.camera.scale
		const panY = state.camera.y * state.camera.scale

		// Position 
		let left = Math.round(size * cell.left + panX)
		if (left > canvas.width) return 0
		if (left < 0) left = 0

		let top = Math.round(size * cell.top + panY)
		if (top > canvas.height) return 0
		if (top < 0) top = 0

		let right = Math.round(size * cell.right + panX)
		if (right < 0) return 0
		if (right > canvas.width) right = canvas.width

		let bottom = Math.round(size * cell.bottom + panY)
		if (bottom < 0) return 0
		if (bottom > canvas.height) bottom = canvas.height

		// Colour
		const splash = Colour.splash(cell.colour)
		let red = splash[0]
		let green = splash[1]
		let blue = splash[2]

		if (!NO_FOOLS_MODE) {
			const average = Math.round((red + green + blue) / 3)
			red = average
			green = average
			blue = average
		}

		// Draw
		const iy = imageWidth * 4

		const width = right-left
		const ix = 4
		const sx = width * ix

		//let pixelCount = 0
		let id = (top*imageWidth + left) * 4
		const data = state.image.data.data
		for (let y = top; y < bottom; y++) {
			for (let x = left; x < right; x++) { 
				data[id] = red
				data[id+1] = green
				data[id+2] = blue
				id += 4
				//pixelCount++
			}
			id -= sx
			id += iy
		}

		cell.lastDraw = state.time
		//cell.lastDrawCount = pixelCount
		cell.lastDrawRepeat = 1
		return 1

	}

	//========//
	// CURSOR //
	//========//
	const updateCursor = () => {

		updateBrush()
		updatePan()

		const [x, y] = Mouse.position
		state.cursor.previous.x = x
		state.cursor.previous.y = y
		
	}

	let pencilled = false
	const updateBrush = () => {

		if (!Mouse.Middle) {
			pencilled = false
		}

		if (state.colourTode.hand.state !== HAND.BRUSHING && state.colourTode.hand.state !== HAND.PENCILLING) return

		if (Mouse.Middle && !pencilled) {
			const [x, y] = Mouse.position
			brush(...getCursorView(x, y))
			pencilled = true
		}

		if (!Mouse.Left) return
		let [x, y] = getCursorView(...Mouse.position)
		if (x === undefined || y === undefined) {
			return
		}
		
		let [px, py] = getCursorView(state.cursor.previous.x, state.cursor.previous.y)
		
		const size = state.brush.size * WORLD_CELL_SIZE

		const dx = x - px
		const dy = y - py

		const sx = Math.sign(dx)
		const sy = Math.sign(dy)

		const ax = Math.abs(dx)
		const ay = Math.abs(dy)

		const biggest = Math.max(ax, ay)

		let ix = 0
		let iy = 0

		if (ax === biggest) {
			iy = (WORLD_CELL_SIZE * sy) * (ay / ax)
			ix = WORLD_CELL_SIZE * sx
		} else {
			ix = (WORLD_CELL_SIZE * sx) * (ax / ay)
			iy = WORLD_CELL_SIZE * sy
		}

		const points = new Set()

		const length = biggest / WORLD_CELL_SIZE

		if (dx === 0 && dy === 0) {
			for (let dx = -size/2; dx <= size/2; dx += WORLD_CELL_SIZE) {
				for (let dy = -size/2; dy <= size/2; dy += WORLD_CELL_SIZE) {
					points.add([x + dx, y + dy])
				}
			}
		}
		else for (let i = 0; i <= length; i++) {
			
			const X = px + ix * i
			const Y = py + iy * i

			for (let dx = -size/2; dx <= size/2; dx += WORLD_CELL_SIZE) {
				for (let dy = -size/2; dy <= size/2; dy += WORLD_CELL_SIZE) {
					points.add([X + dx, Y + dy])
				}
			}

		}

		for (const point of points.values()) {
			brush(point[0], point[1])
		}
		
	}

	const getCursorView = (x, y) => {
		x -= state.camera.x * state.camera.scale
		y -= state.camera.y * state.camera.scale

		x /= state.image.size
		y /= state.image.size

		return [x, y]
	}

	const brush = (x, y) => {

		let cell = pickCell(x, y)
		if (cell === undefined) return

		// TODO: this should just merge it together!
		if (cell.width !== WORLD_CELL_SIZE || cell.height != WORLD_CELL_SIZE) {
			const worldCells = getWorldCellsSet(x, y)
			if (worldCells === undefined) return
			const merged = mergeCells([...worldCells])
			cell = merged
		}

		if (typeof state.brush.colour === "number") {
			cell.colour = state.brush.colour
			drawCell(cell)
			return
		}

		const children = splitCellToDiagram(cell, state.brush.colour)

		for (const child of children) {
			drawCell(child)
		}

	}


	const getWorldCellsSet = (x, y) => {

		const snappedX = Math.floor(x*WORLD_DIMENSION) / WORLD_DIMENSION
		const snappedY = Math.floor(y*WORLD_DIMENSION) / WORLD_DIMENSION

		const sectionSizeScale = GRID_SIZE / WORLD_DIMENSION

		const sections = new Set()
		for (let wx = 0; wx < sectionSizeScale; wx++) {
			const gridX = Math.floor((snappedX + wx * WORLD_CELL_SIZE / sectionSizeScale) * GRID_SIZE)
			for (let wy = 0; wy < sectionSizeScale; wy++) {
				const gridY = Math.floor((snappedY + wy * WORLD_CELL_SIZE / sectionSizeScale) * GRID_SIZE)
				const sectionId = gridX*GRID_SIZE + gridY
				const section = state.grid[sectionId]
				sections.add(section)
			}
		}

		const worldCells = new Set()

		// Check if any cells in these sections overlap with an outer section
		for (const section of sections.values()) {
			for (const cell of section.values()) {
				for (const cellSection of cell.sections) {
					if (!sections.has(cellSection)) return undefined
				}
				worldCells.add(cell)
			}
		}

		return worldCells

	}

	let dropperStartX = undefined
	let dropperStartY = undefined
	let dropperStartT = undefined

	const updatePan = () => {
		if (!Mouse.Right) {

			if (dropperStartX !== undefined) {

				const [x, y] = Mouse.position

				const dropperDistance = Math.hypot(x - dropperStartX, y - dropperStartY)
				const dropperTime = Date.now() - dropperStartT
				if (dropperTime < 100 || dropperDistance <= 0) {
					
					if (hand.state === HAND.BRUSH || hand.state === HAND.BRUSHING || hand.state === HAND.PENCILLING) {
						const cell = pickCell(...getCursorView(x, y))
						if (cell !== undefined)	state.brush.colour = cell.colour
					}

					else {
						const atom = getAtom(x / CT_SCALE, y / CT_SCALE)
	
						if (atom === undefined) {
							brushColourCycleIndex++
							if (brushColourCycleIndex >= brushColourCycle.length) {
								brushColourCycleIndex = 0
							}
	
							state.brush.colour = brushColourCycle[brushColourCycleIndex]
						}
	
						else {
							state.brush.colour = atom.colour.splash
						}
	
					}
				}

				
			}

			dropperStartX = undefined
			dropperStartY = undefined
			return
		}


		const [x, y] = Mouse.position
		
		if (dropperStartX === undefined) {
			dropperStartX = x
			dropperStartY = y
			dropperStartT = Date.now()
			dropperMovement = 0
		}


		const {x: px, y: py} = state.cursor.previous
		if (px === undefined || py === undefined) return
		if (x === undefined || y === undefined) return
		const [dx, dy] = [x - px, y - py]
		state.camera.x += dx / state.camera.scale
		state.camera.y += dy / state.camera.scale
		updateImageSize()
	}

	const ZOOM = 0.05
	let CT_SCALE = 1.0
	on.mousewheel((e) => {

		e.preventDefault()

		const dy = e.deltaY / 100

		if (Keyboard.Alt) {
			PADDLE.scroll -= 50 * dy
			positionPaddles()
		}

		else if (Keyboard.Control) {
			CT_SCALE -= dy * 0.1
		}
		
		else if (Keyboard.Shift) {
			state.brush.size -= dy
			if (state.brush.size < 0) state.brush.size = 0
		}

		else {
			doZoom(dy, ...Mouse.position)
		}
		
	}, {passive: false})

	on.keydown(e => {
		if (e.key === "Alt") e.preventDefault()
	}, {passive: false})

	const doZoom = (dy, centerX, centerY) => {

		const sign = -Math.sign(dy)
		const d = Math.abs(dy)


		for (let i = 0; i < d; i++) {

			const oldScale = state.camera.scale
			const zoom = ZOOM * state.camera.scale

			const szoom = zoom * sign
			state.camera.scale += szoom

			const newScale = state.camera.scale
			const scale = newScale / oldScale

			state.camera.x += (1-scale) * centerX/newScale
			state.camera.y += (1-scale) * centerY/newScale

		}

		//const newScale = state.camera.scale
		//const scale = newScale / oldScale
		//stampScale(scale)

		updateImageSize()
	}

	on.contextmenu((e) => {
		e.preventDefault()
	})

	//==========//
	// KEYBOARD //
	//==========//
	on.keydown(e => {
		const keydown = KEYDOWN[e.key]
		if (keydown !== undefined) keydown()
	})

	const KEYDOWN = {}
	KEYDOWN.e = () => state.camera.mscaleTarget += state.camera.mscaleTargetControl
	KEYDOWN.q = () => state.camera.mscaleTarget -= state.camera.mscaleTargetControl
	
	KEYDOWN.w = () => state.camera.dyTarget += state.camera.dsControl
	KEYDOWN.s = () => state.camera.dyTarget -= state.camera.dsControl
	KEYDOWN.a = () => state.camera.dxTarget += state.camera.dsControl
	KEYDOWN.d = () => state.camera.dxTarget -= state.camera.dsControl

	KEYDOWN.r = () => {
		state.camera.mscaleTarget = 1.0
		state.camera.dxTarget = 0.0
		state.camera.dyTarget = 0.0
	}

	//========//
	// CAMERA //
	//========//
	const updateCamera = () => {
		if (state.camera.mscale !== state.camera.mscaleTarget) {

			const d = state.camera.mscaleTarget - state.camera.mscale
			state.camera.mscale += d * state.camera.mscaleTargetSpeed

			const sign = Math.sign(d)
			const snap = state.camera.mscaleTarget * state.camera.mscaleTargetControl * state.camera.mscaleTargetSpeed
			if (sign === 1 && state.camera.mscale > state.camera.mscaleTarget - snap) state.camera.mscale = state.camera.mscaleTarget
			if (sign === -1 && state.camera.mscale < state.camera.mscaleTarget + snap) state.camera.mscale = state.camera.mscaleTarget

		}

		if (state.camera.dx !== state.camera.dxTarget) {

			const d = state.camera.dxTarget - state.camera.dx
			state.camera.dx += d * state.camera.dsTargetSpeed

			const sign = Math.sign(d)
			const snap = state.camera.dxTarget * state.camera.dsControl * state.camera.dsTargetSpeed
			if (sign === 1 && state.camera.dx > state.camera.dxTarget - snap) state.camera.dx = state.camera.dxTarget
			if (sign === -1 && state.camera.dx < state.camera.dxTarget + snap) state.camera.dx = state.camera.dxTarget

		}

		if (state.camera.dy !== state.camera.dyTarget) {

			const d = state.camera.dyTarget - state.camera.dy
			state.camera.dy += d * state.camera.dsTargetSpeed

			const sign = Math.sign(d)
			const snap = state.camera.dyTarget * state.camera.dsControl * state.camera.dsTargetSpeed
			if (sign === 1 && state.camera.dy > state.camera.dyTarget - snap) state.camera.dy = state.camera.dyTarget
			if (sign === -1 && state.camera.dy < state.camera.dyTarget + snap) state.camera.dy = state.camera.dyTarget

		}

		if (state.camera.dx !== 0.0 || state.camera.dy !== 0.0) {
			state.camera.x += state.camera.dx
			state.camera.y += state.camera.dy
			updateImageSize()
			if (hand.state.camerapan) hand.state.camerapan()
		}

		if (state.camera.mscale !== 1.0) {
			const oldScale = state.camera.scale
			state.camera.scale *= state.camera.mscale
			const newScale = state.camera.scale
			const scale = newScale / oldScale

			let centerX = Mouse.position[0]
			let centerY = Mouse.position[1]

			if (centerX === undefined) centerX = canvas.width/2
			if (centerY === undefined) centerY = canvas.height/2

			state.camera.x += (1-scale) * centerX/newScale
			state.camera.y += (1-scale) * centerY/newScale

			updateImageSize()
		}
	}

	//======//
	// TICK //
	//======//
	drawCells()
	show.tick = () => {
		
		updateHand()
		updateCursor()
		updateCamera()
		//state.dragon.behaves.shuffle()
		if (!show.paused) fireRandomSpotEvents()
		else fireRandomSpotDrawEvents()

		context.putImageData(state.image.data, 0, 0)
		//context.filter = "grayscale(100%)"
		//context.drawImage(context.canvas, 0, 0, context.canvas.width, context.canvas.height)

		// Draw void
		context.clearRect(0, 0, state.view.left, state.view.bottom)
		context.clearRect(state.view.left, 0, canvas.width, state.view.top)
		context.clearRect(state.view.right, state.view.top, canvas.width, canvas.height)
		context.clearRect(0, state.view.bottom, canvas.width, canvas.height)

		state.time++
		if (state.time > state.maxTime) state.time = 0

	}

	const fireRandomSpotEvents = () => {
		const count = state.speed.dynamic? state.speed.aer * state.cellCount : state.speed.count
		const redrawCount = count * state.speed.redraw
		let redraw = true
		if (!state.worldBuilt) redraw = false
		let drawnCount = 0
		for (let i = 0; i < count; i++) {
			const cell = pickRandomCell()
			
			if (redraw && drawnCount >= redrawCount) redraw = false
			const drawn = fireCellEvent(cell, redraw)
			drawnCount += drawn
		}

		if (!state.view.visible) return
		while (drawnCount < redrawCount) {
			const cell = pickRandomVisibleCell()
			drawnCount += drawCell(cell)
		}
	}

	const fireRandomSpotDrawEvents = () => {
		if (!state.view.visible) return
		const count = state.speed.dynamic? state.speed.aer * state.cellCount : state.speed.count
		let redrawCount = count * state.speed.redraw
		if (!state.worldBuilt) redrawCount = 1
		let drawnCount = 0
		for (let i = 0; i < redrawCount; i++) {
			const cell = pickRandomVisibleCell()
			drawnCount += drawCell(cell)
		}
	}

	// this function is currently full of debug code
	// Returns the number of cells it drew
	const fireCellEvent = (cell, redraw) => {

		if (BUILD_WORLD(cell, redraw) !== undefined) return 1

		state.dragon.behaves.shuffle()
		for (const behave of state.dragon.behaves) {
			const result = behave(cell, redraw)
			if (result === undefined) continue
			//if (result === 0) continue
			return result
		}
		return 0

		/*for (let i = 0; i < state.dragon.behaves.length; i++) {
			const b = Random.Uint32 % state.dragon.behaves.length
			const behave = state.dragon.behaves[b]
			const result = behave(cell, redraw)
			if (result !== 0) return result
		}*/

		/*const b = Random.Uint32 % state.dragon.behaves.length
		const behave = state.dragon.behaves[b]
		const result = behave(cell, redraw)
		return result*/

		/*const behave = BEHAVE.get(cell.colour)
		if (behave !== undefined) {
			const drawn = behave(cell, redraw)
			if (drawn > 0) return drawn
		}*/

		/*let drawn = 0
		drawn += DEBUG_RED_SPLIT_2(cell, redraw)
		//DEBUG_RED_SPLIT(cell, redraw)
		//DEBUG_FIZZ(cell, redraw)
		//DEBUG_DRIFT(cell, redraw)

		if (drawn > 0) return drawn

		if (redraw) {
			return drawCell(cell)
		}

		return 0*/

	}
	
	//===============//
	// SPLIT + MERGE //
	//===============//
	const splitCell = (cell, width, height) => {


		const wSign = Math.sign(width)
		const hSign = Math.sign(height)

		width = Math.abs(width)
		height = Math.abs(height)

		const childWidth = cell.width / width
		const childHeight = cell.height / height

		const children = []

		const xStart = wSign === 1? cell.x : cell.right-childWidth
		const yStart = hSign === 1? cell.y : cell.bottom-childHeight
		const dx = wSign * childWidth
		const dy = hSign * childHeight
		
		for (let ix = 0; ix < width; ix++) {
			const x = xStart + dx*ix
			for (let iy = 0; iy < height; iy++) {
				const y = yStart + dy*iy
				const child = makeCell({x, y, width: childWidth, height: childHeight, colour: cell.colour, lastDraw: cell.lastDraw})
				children.push(child)
			}
		}

		deleteCell(cell)
		for (const child of children) {
			addCell(child)
		}

		return children
	}
	
	const splitCellToDiagram = (cell, diagram) => {

		const [diagramWidth, diagramHeight] = getDiagramDimensions(diagram)
		const widthScale = cell.width / diagramWidth
		const heightScale = cell.height / diagramHeight

		const children = []
		for (const diagramCell of diagram.left) {

			const colours = getSplashesArrayFromArray(diagramCell.content)
			const colour = colours[Random.Uint32 % colours.length]

			const child = makeCell({
				x: cell.x + diagramCell.x * widthScale,
				y: cell.y + diagramCell.y * heightScale,
				width: diagramCell.width * widthScale,
				height: diagramCell.height * heightScale,
				colour: colour,
			})

			children.push(child)
		}

		deleteCell(cell)
		for (const child of children) {
			addCell(child)
		}

		return children

	}

	const getDiagramDimensions = (diagram) => {

		let left = Infinity
		let right = -Infinity
		let top = Infinity
		let bottom = -Infinity

		for (const cell of diagram.left) {

			const cleft = cell.x
			const cright = cell.x + cell.width
			const ctop = cell.y
			const cbottom = cell.y + cell.height

			if (cleft < left) left = cleft
			if (ctop < top) top = ctop
			if (cright > right) right = cright
			if (cbottom > bottom) bottom = cbottom
		}

		const width = right - left
		const height = bottom - top

		return [width, height]
	}

	// Warning: bugs will happen if you try to merge cells that don't align or aren't next to each other
	const mergeCells = (cells) => {
		
		let left = 1
		let top = 1
		let right = 0
		let bottom = 0

		for (const cell of cells) {
			if (cell.left < left) left = cell.left
			if (cell.top < top) top = cell.top
			if (cell.right > right) right = cell.right
			if (cell.bottom > bottom) bottom = cell.bottom
			deleteCell(cell)
		}

		const cell = makeCell({
			x: left,
			y: top,
			width: right-left,
			height: bottom-top,
			colour: cells[0].colour,
			lastDraw: cells[0].lastDraw,
		})

		addCell(cell)

		return cell

	}

	// NOTE: this checks if the cells fit together in ANY POSSIBLE WAY
	// it might not be the arrangement of cells that you are interested in
	const fits = (cells) => {

		const [head, ...tail] = cells
		
		const connections = [head]
		let failureCount = 0
		
		let i = 0
		while (connections.length <= cells.length) {

			const cell = tail[i]
			const connection = connections.find(connection => isFit(cell, connection))
			if (!connection) {
				failureCount++
				if (failureCount === (cells.length - connections.length)) return false
			} else {
				failureCount = 0
				connections.push(cell)
			}

			i++
			if (i >= tail.length) i = 0
		}

		return true

	}

	// Only checks if cells are the same size
	const aligns = (cells) => {
		
		const [head, ...tail] = cells
		const {width, height} = head
		const isAligned = tail.every(cell => cell.width === width && cell.height === height)
		return isAligned

	}

	const isFit = (cell, connection) => {
		if (cell.height === connection.height && cell.top === connection.top) {
			if (cell.left === connection.right) return true
			if (cell.right === connection.left) return true
		}
		
		if (cell.width === connection.width && cell.right === connection.right) {
			if (cell.top === connection.bottom) return true
			if (cell.bottom === connection.top) return true
		}

		return
	}

	//=========//
	// ELEMENT //
	//=========//
	// Behave functions must return how many cells got drawn

	const BEHAVE = new Map()

	BEHAVE.set(Colour.Yellow.splash, (cell, redraw) => {
		
		if (cell.width !== cell.height) return 0

		const down = pickCell(cell.x + cell.width/2, cell.y + cell.height/2 + cell.height)

		if (down !== undefined && down.colour === Colour.Black.splash) {
			down.colour = Colour.Yellow.splash
			cell.colour = Colour.Black.splash
			let drawn = 0
			drawn += drawCell(down, true)
			drawn += drawCell(cell, true)
			return drawn
		} else {

			const slide = pickNeighbour(cell, oneIn(2)? 1 : -1, 1)
			if (slide === undefined) return 0
			if (slide.colour === Colour.Black.splash) {
				let drawn = 0
				drawn += setCellColour(cell, Colour.Black.splash, true)
				drawn += setCellColour(slide, Colour.Yellow.splash, true)
				return drawn
			}

		}

		return 0

	})

	BEHAVE.set(Colour.Purple.splash, (cell, redraw) => {

		const [left, right] = splitCell(cell, 2, 1)
		let drawn = 0
		drawn += setCellColour(left, Colour.Cyan.splash)
		drawn += setCellColour(right, Colour.Blue.splash)

		return drawn

	})

	BEHAVE.set(Colour.Cyan.splash, (cell, redraw) => {


		// @#
		const right = pickNeighbour(cell, 1, 0)
		if (right !== undefined && aligns([cell, right])) {

			// Fall
			if (right.colour === Colour.Blue.splash || right.colour === Colour.Cyan.splash) {
				const below = pickNeighbour(cell, 0, 1)
				if (below !== undefined && below.colour === Colour.Black.splash) {
					if (below.width === cell.width*2 && below.left === cell.left) {
						const merged = mergeCells([cell, right])
						const [fallenLeft, fallenRight] = splitCell(below, 2, 1)
						let drawn = 0
						drawn += setCellColour(merged, Colour.Black.splash)
						drawn += setCellColour(fallenLeft, cell.colour)
						drawn += setCellColour(fallenRight, right.colour)
						return drawn
					}
				}
			}

			// Slide
			if (right.colour === Colour.Blue.splash) {
				const head = pickNeighbour(right, 1, 0)
				if (head !== undefined && head.colour === Colour.Black.splash && head.width === cell.width*2 && head.left === right.right && head.top === cell.top) {
					const merged = mergeCells([cell, right])
					const [splitLeft, splitRight] = splitCell(head, 2, 1)
					let drawn = 0
					drawn += setCellColour(merged, Colour.Black.splash)
					drawn += setCellColour(splitLeft, cell.colour)
					drawn += setCellColour(splitRight, right.colour)
					return drawn
				}
			}
			
			// Bounce
			if (right.colour === Colour.Cyan.splash || right.colour === Colour.Blue.splash) {
				let drawn = 0
				drawn += setCellColour(cell, Colour.Blue.splash)
				drawn += setCellColour(right, Colour.Cyan.splash)
				return drawn
			}

		}
		
		// #@
		const left = pickNeighbour(cell, -1, 0)
		if (left !== undefined && aligns([cell, left])) {
			
			// Fall
			if (left.colour === Colour.Blue.splash || left.colour === Colour.Cyan.splash) {
				const below = pickNeighbour(cell, 0, 1)
				if (below !== undefined && below.colour === Colour.Black.splash) {
					if (below.width === cell.width*2 && below.right === cell.right) {
						const merged = mergeCells([cell, left])
						const [fallenLeft, fallenRight] = splitCell(below, 2, 1)
						let drawn = 0
						drawn += setCellColour(merged, Colour.Black.splash)
						drawn += setCellColour(fallenLeft, left.colour)
						drawn += setCellColour(fallenRight, cell.colour)
						return drawn
					}
				}
			}

			// Slide
			if (left.colour === Colour.Blue.splash) {
				const head = pickNeighbour(left, -1, 0)
				if (head !== undefined && head.colour === Colour.Black.splash && head.width === cell.width*2 && head.right === left.left && head.top === cell.top) {
					const merged = mergeCells([cell, left])
					const [splitLeft, splitRight] = splitCell(head, 2, 1)
					let drawn = 0
					drawn += setCellColour(merged, Colour.Black.splash)
					drawn += setCellColour(splitLeft, left.colour)
					drawn += setCellColour(splitRight, cell.colour)
					return drawn
				}
			}

			// Bounce
			if (left.colour === Colour.Cyan.splash || left.colour === Colour.Blue.splash) {
				let drawn = 0
				drawn += setCellColour(cell, Colour.Blue.splash)
				drawn += setCellColour(left, Colour.Cyan.splash)
				return drawn
			}

		}

		return 0

	})

	BEHAVE.set(Colour.Blue.splash, (cell, redraw) => {
		// @#
		const right = pickNeighbour(cell, 1, 0)
		if (right !== undefined && aligns([cell, right])) {

			// Fall
			if (right.colour === Colour.Blue.splash || right.colour === Colour.Cyan.splash) {
				const below = pickNeighbour(cell, 0, 1)
				if (below !== undefined && below.colour === Colour.Black.splash) {
					if (below.width === cell.width*2 && below.left === cell.left) {
						const merged = mergeCells([cell, right])
						const [fallenLeft, fallenRight] = splitCell(below, 2, 1)
						let drawn = 0
						drawn += setCellColour(merged, Colour.Black.splash)
						drawn += setCellColour(fallenLeft, cell.colour)
						drawn += setCellColour(fallenRight, right.colour)
						return drawn
					}
				}
			}

			// Slide
			if (right.colour === Colour.Cyan.splash) {
				const head = pickNeighbour(cell, -1, 0)
				if (head !== undefined && head.colour === Colour.Black.splash && head.width === cell.width*2 && head.right === cell.left && head.top === cell.top) {
					const merged = mergeCells([cell, right])
					const [splitLeft, splitRight] = splitCell(head, 2, 1)
					let drawn = 0
					drawn += setCellColour(merged, Colour.Black.splash)
					drawn += setCellColour(splitLeft, cell.colour)
					drawn += setCellColour(splitRight, right.colour)
					return drawn
				}
			}
			
			
			// Bounce
			if (right.colour === Colour.Cyan.splash || right.colour === Colour.Blue.splash) {
				let drawn = 0
				drawn += setCellColour(cell, Colour.Cyan.splash)
				drawn += setCellColour(right, Colour.Blue.splash)
				return drawn
			}

		}
		
		// #@
		const left = pickNeighbour(cell, -1, 0)
		if (left !== undefined && aligns([cell, left])) {
			
			// Fall
			if (left.colour === Colour.Blue.splash || left.colour === Colour.Cyan.splash) {
				const below = pickNeighbour(cell, 0, 1)
				if (below !== undefined && below.colour === Colour.Black.splash) {
					if (below.width === cell.width*2 && below.right === cell.right) {
						const merged = mergeCells([cell, left])
						const [fallenLeft, fallenRight] = splitCell(below, 2, 1)
						let drawn = 0
						drawn += setCellColour(merged, Colour.Black.splash)
						drawn += setCellColour(fallenLeft, left.colour)
						drawn += setCellColour(fallenRight, cell.colour)
						return drawn
					}
				}
			}
			

			// Slide
			if (left.colour === Colour.Cyan.splash) {
				const head = pickNeighbour(cell, 1, 0)
				if (head !== undefined && head.colour === Colour.Black.splash && head.width === cell.width*2 && head.left === cell.right && head.top === cell.top) {
					const merged = mergeCells([cell, left])
					const [splitLeft, splitRight] = splitCell(head, 2, 1)
					let drawn = 0
					drawn += setCellColour(merged, Colour.Black.splash)
					drawn += setCellColour(splitLeft, left.colour)
					drawn += setCellColour(splitRight, cell.colour)
					return drawn
				}
			}

			// Bounce
			if (left.colour === Colour.Cyan.splash || left.colour === Colour.Blue.splash) {
				let drawn = 0
				drawn += setCellColour(cell, Colour.Cyan.splash)
				drawn += setCellColour(left, Colour.Blue.splash)
				return drawn
			}


		}

		return 0
	})

	BEHAVE.set(Colour.Rose.splash, (cell, redraw) => {
		const [nx, ny] = DEBUG_RED_SPLIT_NEIGHBOURS[Random.Uint8 % 4]
		const neighbour = pickNeighbour(cell, nx, ny)
		if (neighbour === undefined) return 0
		if (neighbour.width !== cell.width) return 0
		if (neighbour.height !== cell.height) return 0
		let drawn = 0
		drawn += setCellColour(neighbour, Colour.Rose.splash)
		return drawn
	})

	/*BEHAVE.set(Colour.Black.splash, (cell, redraw) => {
		return setCellColour(cell, Colour.Rose.splash)
	})*/

	const BUILD_WORLD = (cell, redraw) => {
		if (state.worldBuilt) return undefined
		if (state.cellCount >= WORLD_CELL_COUNT) {
			state.worldBuilt = true
			return undefined
		}

		if (cell.colour < 111) {
			return 0
		}

		cell.colour -= 111
		const width = 2
		const height = 2
		const children = splitCell(cell, width, height)
		for (const child of children) {
			drawCell(child)
		}

		return 1
	}

	const DEBUG_RED_SPLIT_NEIGHBOURS = [
		[ 1, 0],
		[-1, 0],
		[ 0, 1],
		[ 0,-1],
	]

	const DEBUG_RED_SPLIT_NEIGHBOURS_2 = [
		[[ 1, 0], [ 1, 1], [ 0, 1]],
		[[-1, 0], [-1, 1], [ 0, 1]],
		[[-1, 0], [-1,-1], [ 0,-1]],
		[[ 1, 0], [ 1,-1], [ 0,-1]],
	]

	const DEBUG_RED_SPLIT_2 = (cell, redraw) => {

		if (!state.worldBuilt) return 0

		let [red, green, blue] = getRGB(cell.colour)

		let drawn = 0
		if (red === 0) {

			if (green === 0 && blue === 0) return 0

			const neighbourhood = DEBUG_RED_SPLIT_NEIGHBOURS_2[Random.Uint8 % 4]

			const neighbours = new Set()

			for (const [nx, ny] of neighbourhood) {
				
				const neighbour = pickNeighbour(cell, nx, ny)
				
				if (neighbour === undefined) return 0

				let [nr, ng, nb] = getRGB(neighbour.colour) 
				if (nr !== 0 || (ng === 0 && nb === 0)) return 0

				neighbours.add(neighbour)
			}

			cell.colour = Math.max(11, Math.round(cell.colour))
			if (redraw) drawn += drawCell(cell)

			/*const ns = [...neighbours.values()]

			if (!aligns([cell, ...ns]) || !fits([cell, ns[0], ns[2]]) || !fits([ns[0], ns[1]]) || !fits([ns[1], ns[2]])) return 0

			const merged = mergeCells([cell, ...ns])
			merged.colour = Math.max(11, Math.round((cell.colour + ns[0].colour) / 2))
			//merged.colour = Math.max(11, Random.Uint8 % 100)
			if (redraw) drawn += drawCell(merged)
			*/

			return 5

		}

		const children = splitCell(cell, 2, 2)

		for (const child of children) {
			
			let [r, g, b] = getRGB(child.colour)
			r -= 200

			g += oneIn(2)? 10 : -10
			b += oneIn(2)? 1 : -1
			
			r = clamp(r, 0, 900)
			g = clamp(g, 0, 90)
			b = clamp(b, 0, 9)

			child.colour = r+g+b
			if (redraw) drawn += drawCell(child)
		}

		return 5

	}

	const DEBUG_RED_SPLIT = (cell, redraw) => {

		if (!state.worldBuilt) return

		let [red, green, blue] = getRGB(cell.colour)

		if (red === 0) {

			if (green === 0 && blue === 0) {
				if (redraw) drawCell(cell)
				return
			}

			const [nx, ny] = DEBUG_RED_SPLIT_NEIGHBOURS[Random.Uint8 % 4]
			const neighbour = pickNeighbour(cell, nx, ny)
			
			if (neighbour === undefined || !fits([cell, neighbour])) {
				if (redraw) drawCell(cell)
				return
			}

			let [nr, ng, nb] = getRGB(neighbour.colour) 
			if (nr !== 0 || (ng === 0 && nb === 0)) {
				if (redraw) drawCell(cell)
				return
			}

			const merged = mergeCells([cell, neighbour])
			merged.colour = Math.max(11, Math.round((cell.colour + neighbour.colour) / 2))
			//merged.colour = Math.max(11, Random.Uint8 % 100)
			drawCell(merged)

			return
		}

		const children = splitCell(cell, 2, 2)

		for (const child of children) {
			
			let [r, g, b] = getRGB(child.colour)
			r -= 200

			g += oneIn(2)? 10 : -10
			b += oneIn(2)? 1 : -1
			
			r = clamp(r, 0, 900)
			g = clamp(g, 0, 90)
			b = clamp(b, 0, 9)

			child.colour = r+g+b
			drawCell(child)
		}

	}

	const DEBUG_FIZZ = (cell) => {

		let width = 1
		let height = 1

		if (cell.colour >= 100) {
			cell.colour -= 100
			width = 2
			height = 2
		}
		else {
			let [r, g, b] = getRGB(cell.colour)
			const gb = Random.Uint8 % 100
			/*g += oneIn(2)? 10 : -10
			b += oneIn(2)? 1 : -1
			g = clamp(g, 0, 90)
			b = clamp(b, 0, 9)*/
			setCellColour(cell, r+gb)
			return
		}

		const children = splitCell(cell, width, height)

		for (const child of children) {
			let [r, g, b] = getRGB(child.colour)
			const gb = Random.Uint8 % 100
			/*g += oneIn(2)? 10 : -10
			b += oneIn(2)? 1 : -1
			g = clamp(g, 0, 90)
			b = clamp(b, 0, 9)*/
			setCellColour(child, r+gb)
		}

	}

	const DRIFT_MAX = 2 ** 20
	const DEBUG_DRIFT = (cell, redraw) => {

		if (state.cellCount >= DRIFT_MAX) {
			//if (redraw) drawCell(cell)
			return
		}

		const width = 2
		const height = 2

		const children = splitCell(cell, width, height)
		for (const child of children) {

			const gb = child.colour % 100
			let b = gb % 10
			let r = child.colour - gb
			let g = gb - b
			
			r += oneIn(2)? 100 : -100
			g += oneIn(2)? 10 : -10
			b += oneIn(2)? 1 : -1
	
			r = clamp(r, 0, 900)
			g = clamp(g, 0, 90)
			b = clamp(b, 0, 9)
	
			child.colour = r+g+b

			drawCell(child)
		}

	}

	//=================//
	// DRAGON - NUMBER //
	//=================//
	// Values[10] - what values this number could represent
	// Channel - what colour channel this number uses as its base (0, 1 or 2)
	// Operations[] - any operations that this number includes
	const makeNumber = ({values, channel = 0, operations = []} = {}) => {
		let numberValues = undefined
		if (typeof values === "function") numberValues = [false, false, false, false, false, false, false, false, false, false]
		else numberValues = values
		return {values: numberValues, channel, operations}
	}

	const DRAGON_NUMBER_OPERATOR = {
		ADD: (left, right) => Math.min(left + right, 9),
		SUBTRACT: (left, right) => Math.max(left - right, 0),
		MULTIPLY: (left, right) => Math.min(left * right, 9),
		DIVIDE: (left, right) => right === 0? 9 : Math.round(left / right),
	}

	const makeOperation = (operator, number) => {
		return {operator, number}
	}

	const getFirstAllowedValue = (number) => {
		for (let i = 0; i < 10; i++) {
			const value = number.values[i]
			if (value) return i
		}
	}

	//================//
	// DRAGON - ARRAY //
	//================//
	// Channels[3] - what dragon numbers are in each colour channel (or undefined for a partial array)
	// Stamp - what shape of stamp the channel has (or undefined for no stamp)
	const makeArray = ({channels, stamp, joins = []} = {}) => {
		if (channels === undefined) channels = [undefined, undefined, undefined]
		return {channels, stamp, joins}
	}

	makeArrayFromSplash = (splash) => {
		let [r, g, b] = getRGB(splash)
		r /= 100
		g /= 10
		const redValues = [false, false, false, false, false, false, false, false, false, false]
		const greenValues = [false, false, false, false, false, false, false, false, false, false]
		const blueValues = [false, false, false, false, false, false, false, false, false, false]
		redValues[r] = true
		greenValues[g] = true
		blueValues[b] = true
		const red = makeNumber({values: redValues, channel: 0})
		const green = makeNumber({values: greenValues, channel: 1})
		const blue = makeNumber({values: blueValues, channel: 2})

		const array = makeArray({channels: [red, green, blue]})
		return array
	}
	
	const getSplashesSetFromArray = (array) => {

		const splashesArray = getSplashesArrayFromArray(array)

		const splashes = new Set(splashesArray)
		return splashes
	}
	
	const getSplashesArrayFromArray = (array) => {

		const splashes = []
		//if (array.channels === undefined) print(array)
		let [reds, greens, blues] = array.channels

		if (reds === undefined) reds = makeNumber({channel: 0, values: [true, false, false, false, false, false, false, false, false, false]})
		if (greens === undefined) greens = makeNumber({channel: 1, values: [true, false, false, false, false, false, false, false, false, false]})
		if (blues === undefined) blues = makeNumber({channel: 2, values: [true, false, false, false, false, false, false, false, false, false]})

		for (let r = 0; r < reds.values.length; r++) {
			const red = reds.values[r]
			if (!red) continue
			for (let g = 0; g < greens.values.length; g++) {
				const green = greens.values[g]
				if (!green) continue
				for (let b = 0; b < blues.values.length; b++) {
					const blue = blues.values[b]
					if (!blue) continue
					const splash = r*100 + g*10 + b*1
					splashes.push(splash)
				}
			}
		}

		for (const join of array.joins) {
			const joinSplashes = getSplashesArrayFromArray(join)
			splashes.push(...joinSplashes)
		}

		return splashes
	}

	const cloneDragonArray = (array) => {

		const redValues = [false, false, false, false, false, false, false, false, false, false]
		const greenValues = [false, false, false, false, false, false, false, false, false, false]
		const blueValues = [false, false, false, false, false, false, false, false, false, false]

		for (let i = 0; i < 10; i++) {
			if (array.channels[0] !== undefined) redValues[i] = array.channels[0].values[i]
			if (array.channels[1] !== undefined) greenValues[i] = array.channels[1].values[i]
			if (array.channels[2] !== undefined) blueValues[i] = array.channels[2].values[i]
		}

		const red = array.channels[0] !== undefined? makeNumber({values: redValues, channel: 0}) : undefined
		const green = array.channels[1] !== undefined? makeNumber({values: greenValues, channel: 1}) : undefined
		const blue = array.channels[2] !== undefined? makeNumber({values: blueValues, channel: 2}) : undefined

		const joins = []
		for (const join of array.joins) {
			const joinClone = cloneDragonArray(join)
			joins.push(joinClone)
		}

		const clone = makeArray({channels: [red, green, blue], joins})
		return clone
	}

	//================//
	// DRAGON - SHAPE //
	//================//
	const makeStamp = (shape) => {
		return {shape}
	}

	// TODO: something - maybe related to ColourTode shapes?
	const makeShape = () => {
		return {}
	}

	//==================//
	// DRAGON - DIAGRAM //
	//==================//
	// Note: these functions don't check for safety at all
	// for example, you can make an invalid diagram by having the left and right sides not match
	// or you can make an invalid side by giving it two cells in the same place

	// Right can be undefined to represent a single-sided diagram
	makeDiagram = ({left = [], right} = {}) => {
		return {left, right, isDiagram: true}
	}

	// Content can be a dragon-array or another dragon-diagram
	makeDiagramCell = ({x = 0, y = 0, width = 1, height = 1, content = makeArray(), instruction = DRAGON_INSTRUCTION.recolour, splitX = 1, splitY = 1} = {}) => {
		return {x, y, width, height, content, instruction, splitX, splitY}
	}

	//===============//
	// DRAGON - RULE //
	//===============//
	makeRule = ({steps = [], transformations = DRAGON_TRANSFORMATIONS.NONE, locked = true} = {}) => {
		return {steps, transformations, locked}
	}

	//==========================//
	// DRAGON - TRANSFORMATIONS //
	//==========================//
	DRAGON_TRANSFORMATIONS = {
		NONE: [
			(x, y, w, h, W, H) => [x, y],
		],
		X: [
			(x, y, w, h, W, H) => [      x, y],
			(x, y, w, h, W, fh) => [-x-w+W, y],
		],
		Y: [
			(x, y, w, h, W, H) => [x,      y],
			(x, y, w, h, W, H) => [x, -y-h+H],
		],
		XY: [
			(x, y, w, h, W, H) => [     x,      y],
			(x, y, w, h, W, H) => [-x-w+W,      y],
			(x, y, w, h, W, H) => [     x, -y-h+H],
			(x, y, w, h, W, H) => [-x-w+W, -y-h+H],
		],
		R: [
			(x, y, w, h, W, H) => [     x,      y],
			(x, y, w, h, W, H) => [-y-h+H,      x],
			(x, y, w, h, W, H) => [-x-w+W, -y-h+H],
			(x, y, w, h, W, H) => [   y-h, -x-w+W],
		],
		XYR: [
			(x, y, w, h, W, H) => [     x,     y],
			(x, y, w, h, W, H) => [-y-h+H,     x],
			(x, y, w, h, W, H) => [-x-w+W, -y-h+H],
			(x, y, w, h, W, H) => [     y, -x-w+W],
			
			(x, y, w, h, W, H) => [-x-w+W,      y],
			(x, y, w, h, W, H) => [-y-h+H, -x-w+W],
			(x, y, w, h, W, H) => [     x, -y-h+H],
			(x, y, w, h, W, H) => [     y,      x],
		]
	}

	const getTransformedRule = (rule, transformation, isTranslation) => {

		// TODO: SHOULD THIS ACTUALLY BE THE MAX SIZE OF ALL STEPS COMBINED???? NOT SURE NEEDS TESTING
		const [ruleWidth, ruleHeight] = getDiagramDimensions(rule.steps[0])

		const steps = rule.steps.map(step => getTransformedDiagram(step, transformation, isTranslation, ruleWidth, ruleHeight))

		const transformedRule = makeRule({steps, transformations: rule.transformations, locked: rule.locked})
		return transformedRule
	}

	const getTransformedDiagram = (diagram, transformation, isTranslation, ruleWidth, ruleHeight) => {

		const {left, right} = diagram
		const [diagramWidth, diagramHeight] = [ruleWidth, ruleHeight]

		const transformedLeft = []
		const transformedRight = right === undefined? undefined : []

		for (let i = 0; i < left.length; i++) {
			const leftCell = left[i]
			const transformedLeftCell = getTransformedCell(leftCell, transformation, diagramWidth, diagramHeight, isTranslation)
			transformedLeft.push(transformedLeftCell)
		}

		for (let i = 0; i < right.length; i++) {
			const rightCell = right[i]
			const transformedRightCell = getTransformedCell(rightCell, transformation, diagramWidth, diagramHeight, isTranslation)
			transformedRight.push(transformedRightCell)
		}

		const transformedDiagram = makeDiagram({left: transformedLeft, right: transformedRight})
		return transformedDiagram
	}

	const getTransformedCell = (cell, transformation, diagramWidth, diagramHeight, isTranslation = false) => {

		let [x, y, width, height] = transformation(cell.x, cell.y, cell.width, cell.height, diagramWidth, diagramHeight)
		
		let {splitX, splitY} = cell
		if (!isTranslation) {
			const [newSplitX, newSplitY] = transformation(cell.splitX, cell.splitY, 1, 1, 1, 1)
			splitX = newSplitX
			splitY = newSplitY
		}

		if (x === undefined) x = cell.x
		if (y === undefined) y = cell.y
		if (width === undefined) width = cell.width
		if (height === undefined) height = cell.height
		
		// leftover from when content could be a sub-diagram
		//const content = cell.content.isDiagram? getTransformedDiagram(cell.content, transformation) : cell.content
		const content = cell.content

		return makeDiagramCell({x, y, splitX, splitY, width, height, content, instruction: cell.instruction})
	}

	//=================//
	// DRAGON - BEHAVE //
	//=================//
	// From a rule, register 'behave' functions that get used to implement the rules in the engine
	// Note: This function doesn't check for safety
	// eg: If it is a locked-in rule or not
	// Or if the left side matches the shape of the right side
	registerRule = (rule) => {

		// Apply Symmetry!
		const transformedRules = []
		for (const transformation of rule.transformations) {
			const transformedRule = getTransformedRule(rule, transformation)
			transformedRules.push(transformedRule)
		}

		// Get Redundant Rules!
		const redundantRules = []
		for (const transformedRule of transformedRules) {
			const redundantTransformedRules = getRedundantRules(transformedRule)
			redundantRules.push(...redundantTransformedRules)
		}

		// Make behave functions!!!
		const behaveFunctions = []
		for (const redundantRule of redundantRules) {
			const behaveFunction = makeBehaveFunction(redundantRule)
			behaveFunctions.push(behaveFunction)
			state.dragon.behaves.push(behaveFunction)
		}

		return {redundantRules, transformedRules, behaveFunctions}

	}

	const unregisterRegistry = ({behaveFunctions}) => {
		state.dragon.behaves = state.dragon.behaves.filter(behaveFunction => !behaveFunctions.includes(behaveFunction))
	}

	// For one rule, we could take its 'origin' as any of the cells in the first step
	// This function gets all those redundant variations
	const getRedundantRules = (rule) => {
		
		const redundantRules = []
		const [head] = rule.steps

		for (const cell of head.left) {
			const transformation = (x, y, width = 1, height = 1) => {

				const newWidth = width / cell.width
				const newHeight = height / cell.height

				const newX = (x - cell.x) * 1/cell.width
				const newY = (y - cell.y) * 1/cell.height

				return [newX, newY, newWidth, newHeight]

			}
			const redundantRule = getTransformedRule(rule, transformation, true)
			redundantRules.push(redundantRule)
		}

		return redundantRules
		
	}

	const getStampNamesOfStep = (step) => {
		const stampNames = new Set()
		const sides = [step.left, step.right]
		for (const side of sides) {
			for (const diagramCell of side) {
				const stamp = diagramCell.content.stamp
				if (stamp === undefined) continue
				stampNames.add(stamp)
			}
		}
		return [...stampNames.values()]
	}

	const makeBehaveFunction = (rule) => {

		const stepFunctions = []

		for (const step of rule.steps) {

			const stampNames = getStampNamesOfStep(step)
			const conditionFunction = makeConditionFunction(step, stampNames)
			const resultFunction = makeResultFunction(step, stampNames)

			const stepFunction = (origin, redraw) => {
				const [neighbours, stamps] = conditionFunction(origin)
				if (neighbours === undefined) return
				return resultFunction(neighbours, redraw, stamps)
			}

			stepFunctions.push(stepFunction)

		}

		const behaveFunction = (origin, redraw) => {

			for (const stepFunction of stepFunctions) {
				const drawn = stepFunction(origin, redraw)
				if (drawn !== undefined) return drawn
			}

			return undefined
		}

		return behaveFunction

	}

	const makeConditionFunction = (diagram, stampNames) => {

		const conditions = []

		for (const cell of diagram.left) {

			const splashes = getSplashesSetFromArray(cell.content)
			
			const condition = (origin) => {
				
				const width = cell.width * origin.width
				const height = cell.height * origin.height

				const x = origin.x + cell.x*origin.width
				const y = origin.y + cell.y*origin.height

				const centerX = x + width/2
				const centerY = y + height/2

				const neighbour = pickCell(centerX, centerY)

				if (neighbour === undefined) return [undefined, undefined]
				if (neighbour.left !== x) return [undefined, undefined]
				if (neighbour.top !== y) return [undefined, undefined]
				if (neighbour.width !== width) return [undefined, undefined]
				if (neighbour.height !== height) return [undefined, undefined]
				if (!splashes.has(neighbour.colour)) return [undefined, undefined]
				
				return [neighbour, cell.content.stamp]
			}

			conditions.push(condition)
		}

		const conditionFunction = (origin) => {

			const neighbours = []
			const stamps = {}
			for (const stamp of stampNames) {
				stamps[stamp] = []
			}

			for (const condition of conditions) {
				const [neighbour, stamp] = condition(origin)
				if (neighbour === undefined) return [undefined, undefined]
				if (stamp !== undefined) {
					stamps[stamp].push(neighbour.colour)
				}
				neighbours.push(neighbour)
			}


			return [neighbours, stamps]
		}

		return conditionFunction
	}

	// TODO: also support Merging (with some funky backend syntax if needed)
	// TODO: also support Splitting (with some funky backend syntax if needed)
	// this funky syntax could include dummy cells on the right
	const makeResultFunction = (diagram, stampNames) => {

		const results = []
		for (const cell of diagram.right) {
			const result = cell.instruction(cell)
			results.push(result)
		}

		const refillAllStampRemainers = (remainers, stamps, stampNames) => {
			for (const stampName of stampNames) {
				refillStampRemainer(remainers, stamps, stampName)
			}
		}

		const refillStampRemainer = (remainers, stamps, stampName) => {
			remainers[stampName] = [...stamps[stampName]]
		}

		return (neighbours, redraw, stamps) => {

			let drawn = 0
			let neighbourId = 0
			let skip = 0
			const bonusTargets = []

			const stampRemainers = {}
			refillAllStampRemainers(stampRemainers, stamps, stampNames)

			for (const instruction of results) {
				const target = bonusTargets.length > 0? bonusTargets.pop() : neighbours[neighbourId]

				const result = instruction(target, redraw, neighbours, neighbourId, stampRemainers)

				if (result.stampNameTakenFrom !== undefined) {
					if (stampRemainers[result.stampNameTakenFrom].length === 0) {
						refillStampRemainer(stampRemainers, stamps, result.stampNameTakenFrom)
					}
				}

				const {drawn: resultDrawn, bonusTargets: resultBonusTargets, skip: resultSkip} = result
				if (resultSkip !== undefined) skip += resultSkip
				drawn += resultDrawn
				if (resultBonusTargets !== undefined) {
					bonusTargets.push(...resultBonusTargets)
				}
				
				if (bonusTargets.length === 0) {
					neighbourId++
					if (skip > 0) {
						neighbourId++
						skip--
					}
				}
			}

			return drawn
		}

		return undefined
	}

	const isDiagramCellFullyInside = (cell, target) => {

		const cleft = cell.x
		const ctop = cell.top
		const cright = cell.x + cell.width
		const cbottom = cell.top + cell.height

		const tleft = target.x
		const ttop = target.top
		const tright = target.x + target.width
		const tbottom = target.top + target.height

		if (cleft < tleft) return false
		if (ctop < ttop) return false
		if (cbottom > tbottom) return false
		if (cright > tright) return false

		return true

	}

	//======================//
	// DRAGON - INSTRUCTION //
	//======================//
	// These are the different types of instructions available for the right-hand-side of rules
	// Default is recolour
	DRAGON_INSTRUCTION = {}
	DRAGON_INSTRUCTION.recolour = (cell) => {

		const splashes = getSplashesArrayFromArray(cell.content)

		const instruction = (target, redraw, neighbours, neighbourId, stamps) => {

			let colour = undefined
			let stampNameTakenFrom = undefined
			if (cell.content.stamp === undefined) {
				colour = splashes[Random.Uint32 % splashes.length]
			} else {
				const stampChoices = stamps[cell.content.stamp]
				if (stampChoices.length === 0) {
					colour = splashes[Random.Uint32 % splashes.length]
				}
				else {
					const stampId = Random.Uint32 % stampChoices.length
					colour = stampChoices[stampId]
					stampChoices.splice(stampId, 1)
					stampNameTakenFrom = cell.content.stamp
				}
			}

			let drawn = 0
			if (redraw) drawn += setCellColour(target, colour, true)
			else target.colour = colour

			return {drawn, stampNameTakenFrom}
		}

		return instruction
	}
	DRAGON_INSTRUCTION.recolour.type = "RECOLOUR"

	// A SPLIT REQUIRES THE CORRECT NUMBER OF RECOLOUR COMMANDS AFTER IT
	// IF YOU DON'T, IT WILL GO WRONG
	DRAGON_INSTRUCTION.split = (cell) => {

		const splashes = getSplashesArrayFromArray(cell.content)

		const instruction = (target, redraw, neighbours, neighbourId, stamps) => {
			
			const children = splitCell(target, cell.splitX, cell.splitY)
			const [head, ...tail] = children

			const colour = splashes[Random.Uint32 % splashes.length]
			let drawn = 0
			if (redraw) drawn += setCellColour(head, colour, true)
			else head.colour = colour

			return {drawn, bonusTargets: tail}

		}
		return instruction

	}
	DRAGON_INSTRUCTION.split.type = "SPLIT"

	DRAGON_INSTRUCTION.merge = (cell) => {

		const splashes = getSplashesArrayFromArray(cell.content)
		
		const childCount = Math.abs(cell.splitX) * Math.abs(cell.splitY)

		const instruction = (target, redraw, neighbours, neighbourId, stamps) => {

			const children = neighbours.slice(neighbourId, neighbourId+childCount)
			const merged = mergeCells(children)

			const colour = splashes[Random.Uint32 % splashes.length]
			let drawn = 0
			if (redraw) drawn += setCellColour(merged, colour)
			else merged.colour = colour

			return {drawn, skip: childCount-1}

		}

		return instruction

	}
	DRAGON_INSTRUCTION.merge.type = "MERGE"

	//=================//
	// DRAGON - ORIGIN //
	//=================//
	// The origin is the cell at (0,0) of the first step of a rule
	// It is the cell/colour that triggers the rule 
	const getOriginOfRule = (rule) => {
		const head = rule.steps[0]
		return getOriginOfDiagram(head)
	}

	const getOriginOfDiagram = (diagram) => {
		for (const cell of diagram.left) {
			if (cell.x === 0 && cell.y === 0) return cell
		}

	}

	//================//
	// DRAGON - DEBUG //
	//================//
	debugRegistry = (registry) => {
		const {redundantRules, transformedRules} = registry
		for (const rule of redundantRules) {
			print("REDUNDANT RULE")
			debugRule(rule)
		}
		print("")
		for (const rule of transformedRules) {
			print("TRANSFORMED RULE")
			debugRule(rule)
		}
	}

	debugRule = (rule) => {
		for (const step of rule.steps) {
			print("")
			print(">> STEP >>")
			print("=== LEFT ===")
			for (const cell of step.left) {
				debugDiagramCell(cell, {read: true})
			}
			print("=== RIGHT ===")
			for (const cell of step.right) {
				debugDiagramCell(cell)
			}
		}
	}

	debugDiagramCell = (cell, {read = false} = {}) => {
		if (read) {
			print("CHECK", "at", cell.x, cell.y, "with size", cell.width, cell.height)
			print("for", getSplashesArrayFromArray(cell.content))
		}
		else {
			print(cell.instruction.type, "at", cell.x, cell.y, "with size", cell.width, cell.height)
			print("to", getSplashesArrayFromArray(cell.content))
		}
		if (cell.instruction.type === "SPLIT") {
			print("split", cell.splitX, cell.splitY)
		}
		if (cell.instruction.type === "MERGE") {
			print("merge", cell.splitX, cell.splitY)
		}
	}

	const GREY = makeArrayFromSplash(Colour.Grey.splash)
	const BLACK = makeArrayFromSplash(Colour.Black.splash)
	const CYAN = makeArrayFromSplash(Colour.Cyan.splash)
	const BLUE = makeArrayFromSplash(Colour.Blue.splash)
	const YELLOW = makeArrayFromSplash(Colour.Yellow.splash)
	const PURPLE = makeArrayFromSplash(Colour.Cyan.splash - 111)
	const RED = makeArrayFromSplash(Colour.Red.splash)
	let [RED_R, RED_G, RED_B] = getRGB(Colour.Red.splash)
	RED_R /= 100
	RED_G /= 10
	/*BLACK.channels[0].values[RED_R] = true
	BLACK.channels[1].values[RED_G] = true
	BLACK.channels[2].values[RED_B] = true*/

	const ROCK_FALL_DIAGRAM = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: GREY}),
			makeDiagramCell({x: 0, y: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLACK}),
			makeDiagramCell({x: 0, y: 1, content: GREY}),
		],
	})
	
	const SAND_FALL_DIAGRAM = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: YELLOW}),
			makeDiagramCell({x: 0, y: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLACK}),
			makeDiagramCell({x: 0, y: 1, content: YELLOW}),
		],
	})
	
	const SAND_SLIDE_DIAGRAM = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: YELLOW}),
			makeDiagramCell({x: 1, y: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLACK}),
			makeDiagramCell({x: 1, y: 1, content: YELLOW}),
		],
	})

	const WATER_RIGHT = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: CYAN}),
			makeDiagramCell({x: 1, y: 0, content: BLUE}),
		],
	})

	const WATER_RIGHT_FALL = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: BLUE}),
			makeDiagramCell({x: 0, y: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLACK}),
			makeDiagramCell({x: 0, y: 1, content: BLUE}),
		],
	})

	const WATER_RIGHT_FLIP = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: PURPLE}),
			makeDiagramCell({x: 1, y: 0, content: CYAN}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: CYAN}),
			makeDiagramCell({x: 1, y: 0, content: PURPLE}),
		],
	})

	const WATER_RIGHT_SLIP = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: BLUE}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 0.5, content: PURPLE, instruction: DRAGON_INSTRUCTION.split, splitX: 2, splitY: 1}),
			makeDiagramCell({x: 0.5, y: 0, width: 0.5, content: CYAN}),
		],
	})

	const WATER_RIGHT_UNSLIP = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: PURPLE}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: CYAN}),
			makeDiagramCell({x: 0, y: 1, width: 2, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 2, content: BLUE, instruction: DRAGON_INSTRUCTION.merge, splitX: 2, splitY: 1}),
			makeDiagramCell({x: 0, y: 1, width: 2, content: BLACK}),
		],
	})

	const WATER_RIGHT_UNSLIPP = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: PURPLE}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: PURPLE}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 2, content: BLUE, instruction: DRAGON_INSTRUCTION.merge, splitX: 2, splitY: 1}),
		],
	})

	const WATER_RIGHT_UNSLIPC = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: CYAN}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: CYAN}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 2, content: BLUE, instruction: DRAGON_INSTRUCTION.merge, splitX: 2, splitY: 1}),
		],
	})

	const WATER_RIGHT_SLIDE = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: PURPLE}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: CYAN}),
			makeDiagramCell({x: 2, y: 0, width: 2, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 2, content: BLACK, instruction: DRAGON_INSTRUCTION.merge, splitX: 2, splitY: 1}),
			makeDiagramCell({x: 2, y: 0, width: 1, content: PURPLE, instruction: DRAGON_INSTRUCTION.split, splitX: 2, splitY: 1}),
			makeDiagramCell({x: 3, y: 0, width: 1, content: CYAN}),
		],
	})

	const WATER_RIGHT_FALL_BLUE = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 0.5, content: BLUE}),
			makeDiagramCell({x: 0.5, y: 0, width: 0.5, content: BLUE}),
			makeDiagramCell({x: 0, y: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 1.0, content: BLACK, instruction: DRAGON_INSTRUCTION.merge, splitX: 2, splitY: 1}),
			makeDiagramCell({x: 0, y: 1, width: 0.5, content: BLUE, instruction: DRAGON_INSTRUCTION.split, splitX: 2, splitY: 1}),
			makeDiagramCell({x: 0.5, y: 1, width: 0.5, content: BLUE}),
		],
	})

	const WATER_RIGHT_FALL_CYAN = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 0.5, content: CYAN}),
			makeDiagramCell({x: 0.5, y: 0, width: 0.5, content: CYAN}),
			makeDiagramCell({x: 0, y: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 1.0, content: BLACK, instruction: DRAGON_INSTRUCTION.merge, splitX: 2, splitY: 1}),
			makeDiagramCell({x: 0, y: 1, width: 0.5, content: CYAN, instruction: DRAGON_INSTRUCTION.split, splitX: 2, splitY: 1}),
			makeDiagramCell({x: 0.5, y: 1, width: 0.5, content: CYAN}),
		],
	})
	

	const WATER_RIGHT_SPIN = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: BLUE}),
			makeDiagramCell({x: 1, y: 0, content: CYAN}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: CYAN}),
			makeDiagramCell({x: 1, y: 0, content: BLUE}),
		],
	})
	
	const WATER_RIGHT_SPAWN_DIAGRAM = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: PURPLE}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 0.5, content: BLUE, instruction: DRAGON_INSTRUCTION.split, splitX: 2, splitY: 1}),
			makeDiagramCell({x: 0.5, y: 0, width: 0.5, content: CYAN, instruction: DRAGON_INSTRUCTION.recolour}),
		],
	})
	
	const WATER_RIGHT_RESPAWN_BLUE = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: BLUE}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: BLUE}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: BLUE}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: CYAN}),
		],
	})
	
	const WATER_RIGHT_RESPAWN_CYAN = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: CYAN}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: CYAN}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: BLUE}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: CYAN}),
		],
	})
	
	const WATER_DARK_FALL = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: GREY}),
			makeDiagramCell({x: 0, y: 1, width: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: BLACK}),
			makeDiagramCell({x: 0, y: 1, width: 1, content: GREY}),
		],
	})
	
	const WATER_DARK_SLIP = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: GREY}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, width: 1, content: BLACK}),
			makeDiagramCell({x: 1, y: 0, width: 1, content: GREY}),
		],
	})
	
	//registerRule(makeRule({steps: [ROCK_FALL_DIAGRAM], transformations: DRAGON_TRANSFORMATIONS.NONE}))
	/*registerRule(makeRule({steps: [SAND_FALL_DIAGRAM], transformations: DRAGON_TRANSFORMATIONS.NONE}))
	registerRule(makeRule({steps: [SAND_SLIDE_DIAGRAM], transformations: DRAGON_TRANSFORMATIONS.X}))

	registerRule(makeRule({steps: [WATER_DARK_FALL], transformations: DRAGON_TRANSFORMATIONS.NONE}))
	registerRule(makeRule({steps: [WATER_DARK_SLIP], transformations: DRAGON_TRANSFORMATIONS.X}))*/

	//registerRule(makeRule({steps: [WATER_RIGHT_SPAWN_DIAGRAM], transformations: DRAGON_TRANSFORMATIONS.X}))
	//registerRule(makeRule({steps: [WATER_RIGHT_FALL], transformations: DRAGON_TRANSFORMATIONS.X}))
	//registerRule(makeRule({steps: [WATER_RIGHT_SLIP], transformations: DRAGON_TRANSFORMATIONS.X}))
	//registerRule(makeRule({steps: [WATER_RIGHT_SLIDE, WATER_RIGHT_FLIP], transformations: DRAGON_TRANSFORMATIONS.X}))
	//registerRule(makeRule({steps: [WATER_RIGHT_UNSLIP], transformations: DRAGON_TRANSFORMATIONS.X}))
	//registerRule(makeRule({steps: [WATER_RIGHT_UNSLIPP], transformations: DRAGON_TRANSFORMATIONS.NONE}))
	//registerRule(makeRule({steps: [WATER_RIGHT_UNSLIPC], transformations: DRAGON_TRANSFORMATIONS.NONE}))
	//registerRule(makeRule({steps: [], transformations: DRAGON_TRANSFORMATIONS.X}))
	//registerRule(makeRule({steps: [WATER_RIGHT_FALL_CYAN], transformations: DRAGON_TRANSFORMATIONS.NONE}))
	//registerRule(makeRule({steps: [WATER_RIGHT_SLIDE_DIAGRAM, WATER_RIGHT_SPIN], transformations: DRAGON_TRANSFORMATIONS.X}))

	//registerRule(makeRule({steps: [], transformations: DRAGON_TRANSFORMATIONS.X}))
	//registerRule(makeRule({steps: [WATER_RIGHT_SPIN], transformations: DRAGON_TRANSFORMATIONS.X}))

	/*

registerRule(
	makeRule({
		transformations: DRAGON_TRANSFORMATIONS.R,
		steps: [
			makeDiagram({
				left: [
					makeDiagramCell({x: 0, y: 0, content: makeArrayFromSplash(999)}),
					makeDiagramCell({x: 1, y: 0, content: makeArrayFromSplash(000)}),
				],
				right: [
					makeDiagramCell({x: 0, y: 0, content: makeArrayFromSplash(000)}),
					makeDiagramCell({x: 1, y: 0, content: makeArrayFromSplash(999)}),
				],
			})
		],
	}),
)

registerRule(
	makeRule({
		transformations: DRAGON_TRANSFORMATIONS.X,
		steps: [
			makeDiagram({
				left: [
					makeDiagramCell({x: 0, y: 0, content: makeArrayFromSplash(999)}),
				],
				right: [
					makeDiagramCell({x: 0, y: 0, width: 0.5, splitX: 2, splitY: 1, content: makeArrayFromSplash(Colour.Blue.splash), instruction: DRAGON_INSTRUCTION.split}),
					makeDiagramCell({x: 0.5, y: 0, width: 0.5, content: makeArrayFromSplash(Colour.Red.splash), instruction: DRAGON_INSTRUCTION.recolour}),
				],
			})
		],
	}),
)

	*/

	const RAINBOW = makeArray()
	RAINBOW.channels = [makeNumber(), makeNumber(), makeNumber()]
	for (let c = 0; c < 3; c++) {
		const channel = RAINBOW.channels[c]
		for (let i = 0; i < 10; i++) {
			if (c === 0 & i > 0) continue
			channel.values[i] = true
		}
	}

	RAINBOW_DIAGRAM = makeDiagram({
		left: [
			makeDiagramCell({content: RAINBOW})
		]
	})

	const RAINBOW2 = makeArray()
	RAINBOW2.channels = [makeNumber(), makeNumber(), makeNumber()]
	for (let c = 0; c < 3; c++) {
		const channel = RAINBOW2.channels[c]
		for (let i = 0; i < 10; i++) {
			if (c === 1 & i > 0) continue
			//if (c === 2 & i > 0) continue
			channel.values[i] = true
		}
	}
	
	RAINBOW_DIAGRAM_2 = makeDiagram({
		left: [
			makeDiagramCell({content: RAINBOW2})
		]
	})

	
	
	const WATER_SPAWN_DIAGRAM_CYAN = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: PURPLE}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: CYAN}),
		],
	})
	
	const WATER_SPAWN_DIAGRAM_BLUE = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: PURPLE}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLUE}),
		],
	})
	
	const WATER_FALL_CYAN = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: CYAN}),
			makeDiagramCell({x: 0, y: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLACK}),
			makeDiagramCell({x: 0, y: 1, content: CYAN}),
		],
	})
	
	const WATER_FALL_BLUE = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: BLUE}),
			makeDiagramCell({x: 0, y: 1, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLACK}),
			makeDiagramCell({x: 0, y: 1, content: BLUE}),
		],
	})

	const WATER_SLIDE_BLUE = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: BLUE}),
			makeDiagramCell({x: 1, y: 0, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLACK}),
			makeDiagramCell({x: 1, y: 0, content: BLUE}),
		],
	})

	const WATER_SLIDE_CYAN = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: CYAN}),
			makeDiagramCell({x: -1, y: 0, content: BLACK}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLACK}),
			makeDiagramCell({x: -1, y: 0, content: CYAN}),
		],
	})

	const WATER_SWAP_BLUE = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: BLUE}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: CYAN}),
		],
	})

	const WATER_SWAP_CYAN = makeDiagram({
		left: [
			makeDiagramCell({x: 0, y: 0, content: CYAN}),
		],
		right: [
			makeDiagramCell({x: 0, y: 0, content: BLUE}),
		],
	})

	/*registerRule(makeRule({steps: [WATER_SPAWN_DIAGRAM_CYAN]}))
	registerRule(makeRule({steps: [WATER_SPAWN_DIAGRAM_BLUE]}))

	registerRule(makeRule({steps: [WATER_FALL_BLUE]}))
	registerRule(makeRule({steps: [WATER_FALL_CYAN]}))

	registerRule(makeRule({steps: [WATER_SLIDE_BLUE, WATER_SWAP_BLUE]}))
	registerRule(makeRule({steps: [WATER_SLIDE_CYAN, WATER_SWAP_CYAN]}))*/
	

	//state.brush.colour = RAINBOW_DIAGRAM_2
	
	/*state.brush.colour = WATER_RIGHT
	state.brush.colour = Colour.Purple.splash
	state.brush.colour = Colour.Blue.splash
	state.brush.colour = Colour.Yellow.splash*/

	//====================//
	// COLOURTODE - STATE //
	//====================//
	state.colourTode = {
		atoms: [],
		hand: {
			state: undefined,
			content: undefined,
			offset: {x: 0, y: 0},
			velocity: {x: 0, y: 0},
			velocityHistory: [],
			velocityMemory: 5,
			previous: {x: 0, y: 0},
		},
	}
	const hand = state.colourTode.hand

	//====================//
	// COLOURTODE - SETUP //
	//====================//
	const colourTodeCanvas = document.createElement("canvas")
	const colourTodeContext = colourTodeCanvas.getContext("2d")
	
	colourTodeCanvas.style["image-rendering"] = "pixelated"
	colourTodeCanvas.style["position"] = "absolute"
	colourTodeCanvas.style["top"] = "0px"
	
	document.body.append(colourTodeCanvas)

	on.resize(() => {
		colourTodeCanvas.width = innerWidth
		colourTodeCanvas.height = innerHeight
		colourTodeCanvas.style["width"] = innerWidth
		colourTodeCanvas.style["height"] = innerHeight
	})

	trigger("resize")

	//===================//
	// COLOURTODE - TICK //
	//===================//
	const colourTodeTick = () => {

		colourTodeUpdate()
		colourTodeDraw()
		requestAnimationFrame(colourTodeTick)
	}

	const updateHand = () => {
		if (hand.velocityHistory.length >= hand.velocityMemory) {
			hand.velocityHistory.shift()
		}

		if (Mouse.position !== undefined && Mouse.position[0] !== undefined && hand.previous.x !== undefined) {
			const [x, y] = Mouse.position.map(n => n / CT_SCALE)
			const dx = x - hand.previous.x
			const dy = y - hand.previous.y
			const velocity = {x: dx, y: dy}
			hand.velocityHistory.push(velocity)
			const sum = hand.velocityHistory.reduce((a, b) => ({x: a.x+b.x, y: a.y+b.y}), {x:0, y:0})
			const average = {x: sum.x / hand.velocityHistory.length, y: sum.y / hand.velocityHistory.length}
			hand.velocity.x = average.x
			hand.velocity.y = average.y
			hand.previous.x = x
			hand.previous.y = y
		}
	}
	
	const COLOURTODE_FRICTION = 0.9
	const colourTodeUpdate = () => {
		for (const atom of state.colourTode.atoms) {
			updateAtom(atom)
		}
	}

	const updateAtom = (atom, checkOffscreen = true) => {

		for (const child of atom.children) {
			updateAtom(child, false)
		}

		// HIGHLIGHT
		if (atom.highlighter) {
			updateAtomHighlight(atom)
		}

		atom.update(atom)

		// MOVEMENT
		if (hand.content === atom) return
		if (atom.dx === 0 && atom.dy === 0) return

		atom.x += atom.dx
		atom.y += atom.dy

		atom.x = clamp(atom.x, atom.minX, atom.maxX)
		atom.y = clamp(atom.y, atom.minY, atom.maxY)

		atom.dx *= COLOURTODE_FRICTION
		atom.dy *= COLOURTODE_FRICTION

		if (checkOffscreen && isAtomOffscreen(atom)) {
			deleteAtom(atom)
			return
		}

		const [mx, my] = Mouse.position.map(n => n / CT_SCALE)
		if (hand.state.atommove) hand.state.atommove(atom, mx, my)
	}

	const updateAtomHighlight = (atom) => {
		// Remove the previous highlight
		atom.highlightedAtom = undefined
		if (atom.highlight !== undefined) {
			deleteChild(atom, atom.highlight)
			atom.highlight = undefined
		}

		// Only highlight if I'm being dragged
		if (hand.content !== atom) return
		if (hand.state !== HAND.DRAGGING) return

		const highlightedAtom = atom.hover(atom)

		// Create the highlight
		if (highlightedAtom === undefined) return
		const highlight = createChild(atom, HIGHLIGHT, {bottom: true})
		highlight.hasBorder = true
		highlight.colour = Colour.Grey
		highlight.x = highlightedAtom.x
		highlight.y = highlightedAtom.y
		highlight.width = highlightedAtom.width
		highlight.height = highlightedAtom.height

		atom.highlight = highlight
		atom.highlightedAtom = highlightedAtom
	}

	const colourTodeDraw = () => {
		colourTodeContext.clearRect(0, 0, colourTodeCanvas.width, colourTodeCanvas.height)
		if (!NO_FOOLS_MODE) {
			colourTodeContext.filter = "grayscale(100%)"
		}
		colourTodeContext.scale(CT_SCALE, CT_SCALE)
		for (const atom of state.colourTode.atoms) {
			drawAtom(atom)
		}
		colourTodeContext.scale(1/CT_SCALE, 1/CT_SCALE)
	}

	requestAnimationFrame(colourTodeTick)

	//===================//
	// COLOURTODE - HAND //
	//===================//
	const DRAG_PITY = 15
	const DRAG_PITY_TIME = 100
	const DRAG_UNPITY_SPEED = 10

	const HAND = {}
	HAND_RELEASE = 0.5
	HAND.FREE = {
		cursor: "auto",

		mousemove: (e) => {
			const x = e.clientX / CT_SCALE
			const y = e.clientY / CT_SCALE
			const atom = getAtom(x, y)
			if (atom !== undefined) {
				if (atom.grabbable) {
					if (!Mouse.Left) {
						if (atom.cursor !== undefined) changeHandState(HAND.HOVER, atom.cursor(atom, HAND.HOVER))
						else if (atom.dragOnly) changeHandState(HAND.HOVER, "move")
						else changeHandState(HAND.HOVER)
					}
					else {
						if (atom.grabbable && atom.draggable) {
							grabAtom(atom, x, y)
							hand.pityStartX = e.clientX
							hand.pityStartY = e.clientY
							hand.pityStartT = Date.now()
							changeHandState(HAND.TOUCHING)
							//hand.content = hand.content.drag(hand.content, x, y)
							HAND.TOUCHING.mousemove(e)
						}
					}
				}
				return
			}

			const [mx, my] = Mouse.position
			if (mx < state.view.left) return
			if (mx > state.view.right) return
			if (my < state.view.top) return
			if (my > state.view.bottom) return
			if (Mouse.Left) changeHandState(HAND.BRUSHING)
			else if (Mouse.Middle) changeHandState(HAND.PENCILLING)
			else changeHandState(HAND.BRUSH)
		},

		atommove: (atom, mx, my) => {
			if (!atom.grabbable) return
			if (!isAtomOverlapping(atom, mx, my)) return
			if (Mouse.Left) {
				grabAtom(atom, mx, my)
				changeHandState(HAND.DRAGGING)
				hand.content = hand.content.drag(hand.content, mx, my)
				return
			}
			if (atom.cursor !== undefined) changeHandState(HAND.HOVER, atom.cursor(atom, HAND.HOVER))
			else if (atom.dragOnly) changeHandState(HAND.HOVER, "move")
			else changeHandState(HAND.HOVER)
		},
		camerapan: () => {
			const [x, y] = Mouse.position
			if (x >= state.view.left && x <= state.view.right && y >= state.view.top && y <= state.view.bottom) {
				changeHandState(HAND.BRUSH)
				return
			}
		},
	}

	HAND.BRUSH = {
		cursor: "crosshair",
		mousemove: (e) => {
			const x = e.clientX / CT_SCALE
			const y = e.clientY / CT_SCALE
			const atom = getAtom(x, y)
			if (atom !== undefined) {
				if (atom.grabbable) {
					if (atom.cursor !== undefined) changeHandState(HAND.HOVER, atom.cursor(atom, HAND.HOVER))
					else if (atom.dragOnly) changeHandState(HAND.HOVER, "move")
					else changeHandState(HAND.HOVER)
				}
				else changeHandState(HAND.FREE)
				return
			}
			const mx = e.clientX
			const my = e.clientY
			if (mx >= state.view.left && mx <= state.view.right && my >= state.view.top && my <= state.view.bottom) {
				return
			}
			changeHandState(HAND.FREE)
		},
		mousedown: (e) => {
			changeHandState(HAND.BRUSHING)
		},
		middlemousedown: (e) => {
			changeHandState(HAND.PENCILLING)
		},
		atommove: (atom, mx, my) => {
			if (!isAtomOverlapping(atom, mx, my)) return
			if (atom.grabbable) changeHandState(HAND.HOVER)
			else changeHandState(HAND.FREE)
		},
		camerapan: () => {
			const [x, y] = Mouse.position
			if (x >= state.view.left && x <= state.view.right && y >= state.view.top && y <= state.view.bottom) {
				return
			}
			changeHandState(HAND.FREE)
		},
	}

	HAND.BRUSHING = {
		cursor: "crosshair",
		mousemove: (e) => {
			const x = e.clientX
			const y = e.clientY
			if (x >= state.view.left && x <= state.view.right && y >= state.view.top && y <= state.view.bottom) {
				return
			}
			changeHandState(HAND.FREE)
		},
		mouseup: (e) => {
			changeHandState(HAND.BRUSH)
		},
		camerapan: () => {
			const [mx, my] = Mouse.position
			if (mx >= state.view.left && mx <= state.view.right && my >= state.view.top && my <= state.view.bottom) {
				return
			}
			const [x, y] = Mouse.position.map(n => n / CT_SCALE)
			const atom = getAtom(x, y)
			if (atom !== undefined) {
				if (atom.grabbable) {
					if (atom.cursor !== undefined) changeHandState(HAND.HOVER, atom.cursor(atom, HAND.HOVER))
					else if (atom.dragOnly) changeHandState(HAND.HOVER, "move")
					else changeHandState(HAND.HOVER)
				}
				else changeHandState(HAND.FREE)
				return
			}
			changeHandState(HAND.FREE)
		},
	}

	HAND.PENCILLING = {
		cursor: "crosshair",
		mousemove: HAND.BRUSHING.mousemove,
		middlemouseup: HAND.BRUSHING.mouseup,
		camerapan: HAND.BRUSHING.camerapan,
	}

	HAND.HOVER = {
		cursor: "pointer",
		
		mousedown: (e) => {

			const atom = getAtom(e.clientX / CT_SCALE, e.clientY / CT_SCALE)
			if (atom === undefined) return
			if (!atom.grabbable) return
			grabAtom(atom, e.clientX / CT_SCALE, e.clientY / CT_SCALE)
			
			if (atom.dragOnly) {
				hand.hasStartedDragging = false
				changeHandState(HAND.DRAGGING)
			}
			else {
				hand.pityStartX = e.clientX
				hand.pityStartY = e.clientY
				hand.pityStartT = Date.now()
				changeHandState(HAND.TOUCHING)
			}

		},

		mousemove: (e) => {
			const x = e.clientX / CT_SCALE
			const y = e.clientY / CT_SCALE
			const atom = getAtom(x, y)
			if (atom !== undefined) {
				if (atom.grabbable) {
					if (atom.cursor !== undefined) changeHandState(HAND.HOVER, atom.cursor(atom, HAND.HOVER))
					else if (atom.dragOnly) changeHandState(HAND.HOVER, "move")
					else changeHandState(HAND.HOVER)
				}
				else changeHandState(HAND.FREE)
				return
			}
			const mx = e.clientX
			const my = e.clientY
			if (mx >= state.view.left && mx <= state.view.right && my >= state.view.top && my <= state.view.bottom) {
				changeHandState(HAND.BRUSH)
				return
			}
			changeHandState(HAND.FREE)
		},

		atommove: (atom, x, y) => {
			if (isAtomOverlapping(atom, x, y)) return
			const newAtom = getAtom(x, y)
			if (newAtom !== undefined) {
				return
			}
			const [mx, my] = Mouse.position
			if (mx >= state.view.left && mx <= state.view.right && my >= state.view.top && my <= state.view.bottom) {
				changeHandState(HAND.BRUSH)
				return
			}
			changeHandState(HAND.FREE)
		}
	}

	const dampen = (n, noReally) => {
		if (noReally) return n * 0.6
		return n
	}

	HAND.TOUCHING = {
		cursor: "pointer",
		mousemove: (e) => {
			if (e.movementX === 0 && e.movementY === 0) return

			const distanceFromPityStart = Math.hypot(e.clientX - hand.pityStartX, e.clientY - hand.pityStartY)
			const pity = DRAG_PITY

			const dx = e.clientX - hand.pityStartX
			const dy = e.clientY - hand.pityStartY
			
			if (!hand.content.dragLockX) hand.content.x = (hand.pityStartX + dampen(dx, hand.content.attached)) / CT_SCALE + hand.offset.x
			if (!hand.content.dragLockY) hand.content.y = (hand.pityStartY + dampen(dy, hand.content.attached)) / CT_SCALE + hand.offset.y

			hand.content.x = clamp(hand.content.x, hand.content.minX, hand.content.maxX)
			hand.content.y = clamp(hand.content.y, hand.content.minY, hand.content.maxY)

			if (distanceFromPityStart < pity) {
				return
			}

			const timeSincePityStart = Date.now() - hand.pityStartT
			if (timeSincePityStart < DRAG_PITY_TIME) {
				const handSpeed = Math.hypot(hand.velocity.x, hand.velocity.y)
				if (handSpeed <= DRAG_UNPITY_SPEED) return
			}

			if (!hand.content.dragLockX) hand.content.x = hand.pityStartX / CT_SCALE + hand.offset.x
			if (!hand.content.dragLockY) hand.content.y = hand.pityStartY / CT_SCALE + hand.offset.y

			hand.content.x = clamp(hand.content.x, hand.content.minX, hand.content.maxX)
			hand.content.y = clamp(hand.content.y, hand.content.minY, hand.content.maxY)

			const x = e.clientX / CT_SCALE
			const y = e.clientY / CT_SCALE
			if (hand.content.draggable) {				
				changeHandState(HAND.DRAGGING)

				const attached = hand.content.attached

				hand.content = hand.content.drag(hand.content, x, y)
				
				if (!hand.content.dragLockX) hand.content.x = (hand.pityStartX + dampen(dx, attached)) / CT_SCALE + hand.offset.x
				if (!hand.content.dragLockY) hand.content.y = (hand.pityStartY + dampen(dy, attached)) / CT_SCALE + hand.offset.y

				hand.content.x = clamp(hand.content.x, hand.content.minX, hand.content.maxX)
				hand.content.y = clamp(hand.content.y, hand.content.minY, hand.content.maxY)

				/*hand.offset.x = hand.content.x - e.clientX / CT_SCALE
				hand.offset.y = hand.content.y - e.clientY / CT_SCALE*/

				HAND.DRAGGING.mousemove(e)
				return
			}

			const atom = getAtom(x, y)
			if (atom !== undefined) {
				if (atom.grabbable) {
					if (atom.cursor !== undefined) changeHandState(HAND.HOVER, atom.cursor(atom, HAND.HOVER))
					else if (atom.dragOnly) changeHandState(HAND.HOVER, "move")
					else changeHandState(HAND.HOVER)
				}
				else changeHandState(HAND.FREE)
				return
			}
			const mx = e.clientX
			const my = e.clientY
			if (mx >= state.view.left && mx <= state.view.right && my >= state.view.top && my <= state.view.bottom) {
				changeHandState(HAND.BRUSH)
				return
			}
			changeHandState(HAND.FREE)
		},
		mouseup: (e) => {
			hand.clickContent.click(hand.clickContent)
			hand.clickContent.dx = 0
			hand.clickContent.dy = 0
			hand.clickContent = undefined

			if (hand.content.attached) {
				hand.content.x = hand.pityStartX / CT_SCALE + hand.offset.x
				hand.content.y = hand.pityStartY / CT_SCALE + hand.offset.y
			}

			hand.content.dx = 0
			hand.content.dy = 0
			hand.content = undefined

			const x = e.clientX / CT_SCALE
			const y = e.clientY / CT_SCALE
			const atom = getAtom(x, y)
			if (atom !== undefined) {
				if (atom.cursor !== undefined) changeHandState(HAND.HOVER, atom.cursor(atom, HAND.HOVER))
				else if (atom.dragOnly) changeHandState(HAND.HOVER, "move")
				else changeHandState(HAND.HOVER)
			}
			else changeHandState(HAND.FREE)
		}
	}

	HAND.DRAGGING = {
		cursor: "move",
		mousemove: (e) => {

			if (!hand.hasStartedDragging) {
				hand.hasStartedDragging = true
				hand.content = hand.content.drag(hand.content, e.clientX / CT_SCALE, e.clientY / CT_SCALE)
			}

			const oldX = hand.content.x
			const oldY = hand.content.y

			if (!hand.content.dragLockX) hand.content.x = e.clientX / CT_SCALE + hand.offset.x
			if (!hand.content.dragLockY) hand.content.y = e.clientY / CT_SCALE + hand.offset.y

			hand.content.x = clamp(hand.content.x, hand.content.minX, hand.content.maxX)
			hand.content.y = clamp(hand.content.y, hand.content.minY, hand.content.maxY)

			const dx = hand.content.x - oldX
			const dy = hand.content.y - oldY
			hand.content.move(hand.content, dx, dy)

			//hand.content.dx = hand.velocity.x
			//hand.content.dy = hand.velocity.y
		},
		mouseup: (e) => {
			hand.hasStartedDragging = true
			if (!hand.content.dragLockX) hand.content.dx = hand.velocity.x * HAND_RELEASE
			if (!hand.content.dragLockY) hand.content.dy = hand.velocity.y * HAND_RELEASE
			hand.content.drop(hand.content)
			if (hand.content.highlighter && hand.content.highlightedAtom !== undefined) {
				hand.content.place(hand.content, hand.content.highlightedAtom)
			}
			hand.content = undefined
			const x = e.clientX / CT_SCALE
			const y = e.clientY / CT_SCALE
			const atom = getAtom(x, y)
			if (atom !== undefined) {
				if (atom.grabbable) {
					if (atom.cursor !== undefined) changeHandState(HAND.HOVER, atom.cursor(atom, HAND.HOVER))
					else if (atom.dragOnly) changeHandState(HAND.HOVER, "move")
					else changeHandState(HAND.HOVER)
				}
				else changeHandState(HAND.FREE)
				return
			}
			else changeHandState(HAND.FREE)
			return
		}
	}

	const changeHandState = (state, cursor = state.cursor) => {
		if (hand.content !== undefined && hand.content.cursor !== undefined) {
			cursor = hand.content.cursor(hand.content, state)
		}
		colourTodeCanvas.style["cursor"] = cursor
		hand.state = state
	}

	on.mousemove(e => hand.state.mousemove? hand.state.mousemove(e) : undefined)
	on.mousedown(e => {

		if (e.button === 0) if (hand.state.mousedown) hand.state.mousedown(e)
		if (e.button === 1) if (hand.state.middlemousedown) hand.state.middlemousedown(e)
	})
	on.mouseup(e => {
		if (e.button === 0) if (hand.state.mouseup) hand.state.mouseup(e)
		if (e.button === 1) if (hand.state.middlemouseup) hand.state.middlemouseup(e)
		
	})

	hand.state = HAND.FREE

	//===================//
	// COLOURTODE - ATOM //
	//===================//
	const COLOURTODE_BASE_PARENT = {
		x: 0,
		y: 0,
		grab: (atom, x, y, child = atom) => child,
		touch: (atom, child = atom) => child,
	}
	const makeAtom = ({
			grabbable = true,
			draggable = true,
			click = () => {}, // Fires when you mouseup a click on the atom
			drag = (a) => a, // Fires when you start dragging the atom
			move = () => {}, // Fires when you start or continue dragging the atom //TODO: change this to be whenever the atom moves for any reason
			drop = () => {}, // Fires when you let go of the atom after a drag
			draw = () => {},
			update = () => {},
			offscreen = () => false,
			overlaps = () => false,
			grab = (a) => a, // Fires when you start a clock on the atom - returns atom that gets dragged
			touch = (a) => a, // Fires when you start a click on the atom - returns atom that handles the click
			highlighter = false, // If true, enables the hover and place events
			hover = () => {}, // Fires whenever you are dragging the atom - returns what atom should get highlighted (if any)
			place = (a) => {}, // Fires whenever you drop the atom onto a highlighted atom
			x = 0,
			y = 0,
			dx = 0,
			dy = 0,
			maxX = Infinity,
			minX = -Infinity,
			maxY = Infinity,
			minY = -Infinity,
			size = 40,
			colour = Colour.splash(999),
			children = [],
			parent = COLOURTODE_BASE_PARENT,
			width = size,
			height = size,
			construct = () => {},
			hasInner = true,
			...properties
		} = {}, ...args) => {
		const atom = {highlighter, place, hover, hasInner, move, drop, maxX, minX, maxY, minY, update, construct, draggable, width, height, touch, parent, children, draw, grabbable, click, drag, overlaps, offscreen, grab, x, y, dx, dy, size, colour, ...properties}
		atom.construct(atom, ...args)
		return atom
	}

	const getAtom = (x, y) => {
		for (let i = state.colourTode.atoms.length-1; i >= 0; i--) {
			const atom = state.colourTode.atoms[i]
			if (atom.justVisual) continue
			const result = isAtomOverlapping(atom, x, y)
			if (result !== undefined) return result
		}
	}

	const drawAtom = (atom) => {
		if (atom.behindChildren) atom.draw(atom)
		for (const child of atom.children) {
			drawAtom(child)
		}
		if (!atom.behindChildren) atom.draw(atom)
	}

	const deleteAtom = (atom) => {
		const id = state.colourTode.atoms.indexOf(atom)
		state.colourTode.atoms.splice(id, 1)
	}

	const registerAtom = (atom) => {
		state.colourTode.atoms.push(atom)
	}

	// including children
	const isAtomOffscreen = (atom) => {
		for (const child of atom.children) {
			if (!isAtomOffscreen(child)) return false
		}
		return atom.offscreen(atom)
	}

	// including children
	const isAtomOverlapping = (atom, x, y) => {
		
		if (!atom.behindChildren && atom.overlaps(atom, x, y)) return atom
		
		for (let i = atom.children.length-1; i >= 0; i--) {
			const child = atom.children[i]
			const result = isAtomOverlapping(child, x, y)
			if (result) return result
		}
		
		if (atom.behindChildren && atom.overlaps(atom, x, y)) return atom
	}

	const grabAtom = (atom, x, y) => {

		let previousTouched = atom
		let touched = atom.touch(atom)
		if (touched !== previousTouched) {
			const newTouched = touched.touch(touched, x, y, previousTouched)
			previousTouched = touched
			touched = newTouched
		}
		hand.clickContent = touched

		
		let previousGrabbed = atom
		let grabbed = atom.grab(atom, x, y)

		if (grabbed === undefined) return
		if (grabbed !== previousGrabbed) {
			const newGrabbed = grabbed.grab(grabbed, x, y, previousGrabbed)
			previousGrabbed = grabbed
			grabbed = newGrabbed
		}

		hand.content = grabbed
		hand.offset.x = grabbed.x - x
		hand.offset.y = grabbed.y - y
		grabbed.dx = 0
		grabbed.dy = 0

		if (atom.stayAtBack) bringAtomToBack(grabbed)
		else bringAtomToFront(grabbed)

		return grabbed
	}

	const bringAtomToFront = (grabbed) => {
		// If atom isn't a child, bring it to the top level
		if (grabbed.parent === COLOURTODE_BASE_PARENT) {
			deleteAtom(grabbed)
			registerAtom(grabbed)
		}
		else {
			const childId = grabbed.parent.children.indexOf(grabbed)
			grabbed.parent.children.splice(childId, 1)
			grabbed.parent.children.push(grabbed)
			if (grabbed.parent.stayAtBack) bringAtomToBack(grabbed.parent)
			else bringAtomToFront(grabbed.parent)
		}
	}

	const bringAtomToBack = (grabbed) => {
		if (grabbed.parent === COLOURTODE_BASE_PARENT) {
			const id = state.colourTode.atoms.indexOf(grabbed)
			state.colourTode.atoms.splice(id, 1)
			state.colourTode.atoms.unshift(grabbed)
		}
		else {
			const childId = grabbed.parent.children.indexOf(grabbed)
			grabbed.parent.children.splice(childId, 1)
			grabbed.parent.children.unshift(grabbed)
			if (grabbed.parent.stayAtBack) bringAtomToBack(grabbed.parent)
			else bringAtomToFront(grabbed.parent)
		}
	}

	getAtomPosition = (atom) => {
		const {x, y} = atom
		if (atom.parent === undefined) return {x, y}
		if (atom.hasAbsolutePosition) return {x, y}
		const {x: px, y: py} = getAtomPosition(atom.parent)
		return {x: x+px, y: y+py}
	}

	//=======================//
	// COLOURTODE - CHILDREN //
	//=======================//
	const createChild = (parent, element, {bottom = false} = {}) => {
		const child = makeAtom(element)
		if (!bottom) parent.children.push(child)
		else parent.children.unshift(child)
		child.parent = parent
		return child
	}
	
	const deleteChild = (parent, child) => {
		const id = parent.children.indexOf(child)
		if (id === -1) throw new Error(`Can't delete child of atom because I can't find it!`)
		parent.children.splice(id, 1)
		child.parent = COLOURTODE_BASE_PARENT
	}
	
	const giveChild = (parent, atom) => {
		deleteAtom(atom)
		if (atom.stayAtBack || atom.behindOtherChildren) parent.children.unshift(atom)
		else parent.children.push(atom)
		atom.parent = parent
	}

	const freeChild = (parent, child) => {
		if (hand.content === child) {
			const {x, y} = getAtomPosition(parent)
			hand.offset.x += x
			hand.offset.y += y
		}
		deleteChild(parent, child)
		registerAtom(child)
	}

	//======================//
	// COLOURTODE - ELEMENT //
	//======================//
	const COLOUR_CYCLE_SPEED = 5
	const COLOUR_CYCLE_LENGTH = 30
	const BORDER_THICKNESS = 3

	const getColourCycleLength = (atom) => {
		let length = Math.max(COLOUR_CYCLE_LENGTH / atom.colours.length, COLOUR_CYCLE_SPEED)
		/*if (atom.joins !== undefined && atom.joins.length > 0) {
			length *= 3
		}*/
		//if (atom.joins !== undefined && atom.joins.length > 0 && atom.joinExpanded !== false) return Infinity
		return length
	}

	// prepare border colours
	const borderColours = []
	for (let i = 0; i < 1000; i++) {
		const colour = Colour.splash(i)
		let borderColour = undefined
		//let borderColour = Colour.add(colour, {lightness: -20})
		const darkness = 70 - colour.lightness
		borderColour = Colour.add(colour, {lightness: -20})
		borderColours.push(borderColour)
	}

	const toolBorderColours = borderColours.clone
	toolBorderColours[000] = Colour.Grey

	/*const toolBorderColours = []
	
	for (let i = 0; i < 1000; i++) {
		const colour = Colour.splash(i)
		let borderColour = Colour.add(colour, {lightness: -20})
		if (colour.lightness <= 35) {
			borderColour = Colour.add(colour, {lightness: 15})
		}
		toolBorderColours.push(borderColour)
	}
	toolBorderColours[000] = Colour.Grey*/

	const COLOURTODE_RECTANGLE = {
		draw: (atom) => {
			let {x, y} = getAtomPosition(atom)

			let X = Math.round(x)
			let Y = Math.round(y)
			let W = Math.round(atom.width)
			let H = Math.round(atom.height)

			if (atom.hasBorder) {

				if (atom.hasInner) {

					let border = BORDER_THICKNESS
					if (atom.borderColour === undefined) {
						colourTodeContext.fillStyle = borderColours[atom.colour.splash]
						if (atom.isTool) {
							colourTodeContext.fillStyle = toolBorderColours[atom.colour.splash]
							border *= 1.5
							/*W += BORDER_THICKNESS
							H += BORDER_THICKNESS
							Y -= BORDER_THICKNESS/2*/
						} else if (atom.width === atom.height/* || atom.isTallRectangle*/) {
							border *= 1.5
						}
					}
					else {
						colourTodeContext.fillStyle = atom.borderColour
					}
					colourTodeContext.fillRect(X, Y, W, H)

					colourTodeContext.fillStyle = atom.colour
					colourTodeContext.fillRect(X+border, Y+border, W-border*2, H-border*2)
				}

				else {
					if (atom.borderColour === undefined) {
						colourTodeContext.strokeStyle = borderColours[atom.colour.splash]
					}
					else {
						colourTodeContext.strokeStyle = atom.borderColour
					}

					X = Math.round(x + 0.5) - 0.5
					Y = Math.round(y + 0.5) - 0.5

					colourTodeContext.lineWidth = BORDER_THICKNESS
					colourTodeContext.strokeRect(X, Y, W, H)
				}
			}

			else {
				colourTodeContext.fillStyle = atom.colour
				colourTodeContext.fillRect(X, Y, W, H)
			}

		},
		offscreen: (atom) => {
			const {x, y} = getAtomPosition(atom)
			const left = x
			const right = x + atom.width
			const top = y
			const bottom = y + atom.height
			if (right < 0) return true
			if (bottom < 0) return true
			if (left > canvas.width) return true
			if (top > canvas.height) return true
			return false
		},
		overlaps: (atom, mx, my) => {
			const {x, y} = getAtomPosition(atom)
			let border = BORDER_THICKNESS
			if (atom.isTool || atom.isSquare || atom.isTallRectangle) {
				border *= 1.5
			}
			const left = x
			const right = x + atom.width
			const top = y
			const bottom = y + atom.height

			if (mx < left) return false
			if (my < top) return false
			if (mx > right) return false
			if (my > bottom) return false
			
			return true
		},
	}

	const isCellAtomSpotFilled = (paddle, [sx, sy]) => {
		for (const cellAtom of paddle.cellAtoms) {
			const {x, y} = getAtomPosition(cellAtom)
			if (x === sx && y === sy) return true
		}
		return false
	}

	const COLOURTODE_SQUARE = {
		isSquare: true,
		hasBorder: true,
		draw: COLOURTODE_RECTANGLE.draw,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		touch: (atom) => {
			const diagramCell = makeDiagramCell({content: atom.value})
			state.brush.colour = makeDiagram({left: [diagramCell]})
			return atom
		},
		click: (atom) => {

			if (atom.joins.length > 0) {
				if (atom.parent === COLOURTODE_BASE_PARENT || !atom.parent.pinhole.locked) {
					if (atom.joinExpanded) {
						atom.joinUnepxand(atom)
					} else {
						atom.joinExpand(atom)
					}
				}
			}

			else if (!atom.expanded) {

				if (atom.parent === COLOURTODE_BASE_PARENT || !atom.parent.pinhole.locked) {
					atom.expand(atom)
				}

			}
			else {
				atom.unexpand(atom)
			}

			const diagramCell = makeDiagramCell({content: atom.value})
			state.brush.colour = makeDiagram({left: [diagramCell]})
		},

		expand: (atom) => {
			atom.expanded = true
			atom.createPicker(atom)
		},

		unexpand: (atom) => {
			atom.expanded = false
			atom.redExpanded = atom.red && atom.red.expanded
			atom.greenExpanded = atom.green && atom.green.expanded
			atom.blueExpanded = atom.blue && atom.blue.expanded
			atom.deletePicker(atom)
		},

		createPicker: (atom) => {
			const pickerHandle = createChild(atom, SYMMETRY_HANDLE)
			pickerHandle.width += OPTION_MARGIN
			atom.pickerHandle = pickerHandle
			
			const pickerPad = createChild(atom, COLOURTODE_PICKER_PAD)
			atom.pickerPad = pickerPad

			if (atom.value.channels[0] !== undefined) {
				const red = createChild(atom, COLOURTODE_PICKER_CHANNEL)
				red.channelSlot = "red" //note: a colour doesn't necessarily have to be in its own channel slot
				red.x += COLOURTODE_PICKER_PAD_MARGIN + COLOURTODE_SQUARE.size + COLOURTODE_PICKER_PAD_MARGIN
				red.value = atom.value.channels[0]
				red.needsColoursUpdate = true
				//red.grab = () => atom
				atom.red = red
				if (atom.redExpanded) atom.red.click(atom.red)
				atom.red.attached = true
			}

			if (atom.value.channels[1] !== undefined) {
				const green = createChild(atom, COLOURTODE_PICKER_CHANNEL)
				green.channelSlot = "green" //note: a colour doesn't necessarily have to be in its own channel slot
				green.x += COLOURTODE_PICKER_PAD_MARGIN + 2 * (COLOURTODE_SQUARE.size + COLOURTODE_PICKER_PAD_MARGIN)
				green.value = atom.value.channels[1]
				green.needsColoursUpdate = true
				//green.grab = () => atom
				atom.green = green
				if (atom.greenExpanded) atom.green.click(atom.green)
				atom.green.attached = true
			}

			if (atom.value.channels[2] !== undefined) {
				const blue = createChild(atom, COLOURTODE_PICKER_CHANNEL)
				blue.channelSlot = "blue" //note: a colour doesn't necessarily have to be in its own channel slot
				blue.x += COLOURTODE_PICKER_PAD_MARGIN + 3 * (COLOURTODE_SQUARE.size + COLOURTODE_PICKER_PAD_MARGIN)
				blue.value = atom.value.channels[2]
				blue.needsColoursUpdate = true
				//blue.grab = () => atom
				atom.blue = blue
				if (atom.blueExpanded) atom.blue.click(atom.blue)
				atom.blue.attached = true
			}
		},

		deletePicker: (atom) => {
			deleteChild(atom, atom.pickerPad)
			deleteChild(atom, atom.pickerHandle)
			if (atom.red) deleteChild(atom, atom.red)
			if (atom.green) deleteChild(atom, atom.green)
			if (atom.blue) deleteChild(atom, atom.blue)
		},

		receiveNumber: (atom, number, channel = number.channel, {expanded} = {}) => {
			
			atom.redExpanded = atom.red && atom.red.expanded
			atom.greenExpanded = atom.green && atom.green.expanded
			atom.blueExpanded = atom.blue && atom.blue.expanded

			if (expanded !== undefined) {
				const channelName = CHANNEL_NAMES[channel]
				atom[`${channelName}Expanded`] = expanded
			}

			atom.value.channels[channel] = number

			atom.deletePicker(atom)
			atom.createPicker(atom)
			atom.needsColoursUpdate = true
			atom.colourTicker = Infinity

			/*const diagramCell = makeDiagramCell({content: atom.value})
			state.brush.colour = makeDiagram({left: [diagramCell]})*/

			if (atom.parent !== COLOURTODE_BASE_PARENT) {
				const paddle = atom.parent
				updatePaddleRule(paddle)
			}

			const brushDiagramCell = makeDiagramCell({content: atom.value})
			state.brush.colour = makeDiagram({left: [brushDiagramCell]})

			squareTool.toolbarNeedsColourUpdate = true
			triangleTool.toolbarNeedsColourUpdate = true
			circleTool.toolbarNeedsColourUpdate = true

		},

		construct: (atom) => {
			atom.needsColoursUpdate = true
			/*const r = Random.Uint8 % 10
			const g = Random.Uint8 % 10
			const b = Random.Uint8 % 10*/
			/*const r = Random.Uint8 % 10
			const g = Random.Uint8 % 10
			const b = Random.Uint8 % 10*/
			//atom.value = makeArrayFromSplash(r*100 + g*10 + b)
			//atom.value = makeArrayFromSplash(555)
			//const splash = TODEPOND_COLOURS[Random.Uint8 % TODEPOND_COLOURS.length]
			if (typeof state.brush.colour === "number") {
				atom.value = makeArrayFromSplash(state.brush.colour)
			} else {
				atom.value = cloneDragonArray(state.brush.colour.left[0].content)
			}
			
			atom.colourId = 0
			atom.dcolourId = 1
			atom.colourTicker = Infinity
			atom.joins = []
			atom.joinColourIds = []

		},

		update: (atom) => {
			

			if (atom.joinDrawId === undefined) {
				atom.joinDrawId = -1
				atom.joinDrawTimer = 0
			}

			atom.joinDrawTimer++
			if (atom.joinDrawTimer >= 45) {
				atom.joinDrawId++
				atom.needsColoursUpdate = true
				atom.colourTicker = Infinity
				if (atom.joinDrawId >= atom.joins.length) {
					atom.joinDrawId = -1
				}
				atom.joinDrawTimer = 0
			}

			if (atom.needsColoursUpdate) {

				let drawTarget = atom.value
				if (atom.joins.length > 0 && !atom.joinExpanded) {
					if (atom.joinDrawId >= 0) {
						drawTarget = atom.joins[atom.joinDrawId].value
					}
				}

				const valueClone = cloneDragonArray(drawTarget)
				if (atom.value === drawTarget) valueClone.joins = []
				atom.colours = getSplashesArrayFromArray(valueClone)
				atom.colourId = Random.Uint32 % atom.colours.length
				atom.needsColoursUpdate = false

			}

			if (atom.colourTicker >= getColourCycleLength(atom)) {
				atom.colourTicker = 0

				atom.colourId += atom.dcolourId
				if (atom.colourId === atom.colours.length-1 || atom.colourId === 0) {
					atom.dcolourId *= -1
				}
				if (atom.colourId >= atom.colours.length) {
					atom.dcolourId = -1
					atom.colourId = atom.colours.length-1
				}
				if (atom.colourId < 0) {
					atom.dcolourId = 1
					atom.colourId = 0
				}
				atom.colour = Colour.splash(atom.colours[atom.colourId])
			}
			else atom.colourTicker++

			
			const {x, y} = getAtomPosition(atom)

			atom.highlightedAtom = undefined

			if (hand.content === atom && hand.state === HAND.DRAGGING) {

				const left = x
				const top = y
				const right = x + atom.width
				const bottom = y + atom.height

				if (atom.highlight !== undefined) {
					deleteChild(atom, atom.highlight)
					atom.highlight = undefined
				}
				

				for (const paddle of paddles) {

					if (!paddle.expanded || paddle.pinhole.locked) continue

					const {x: px, y: py} = getAtomPosition(paddle)
					const pleft = px
					const pright = px + paddle.width
					const ptop = py
					const pbottom = py + paddle.height

					if (left > pright) continue
					if (right < pleft) continue
					if (top > pbottom) continue
					if (bottom < ptop) continue

					if (paddle.cellAtoms.length === 0) {

						atom.highlight = createChild(atom, HIGHLIGHT, {bottom: true})
						atom.highlight.hasBorder = true
						atom.highlight.colour = Colour.Grey
						atom.highlight.x = paddle.x
						atom.highlight.y = paddle.y
						atom.highlight.width = paddle.width
						atom.highlight.height = paddle.height

						atom.highlightedAtom = paddle

						break

					}

					else if (paddle.rightTriangle !== undefined && left > pleft + paddle.rightTriangle.x) {
						let winningDistance = Infinity
						let winningSlot = undefined
						for (const cellAtom of paddle.cellAtoms) {
							if (cellAtom.slotted !== undefined) continue
							const {x: cx, y: cy} = getAtomPosition(cellAtom.slot)
							
							const distance = Math.hypot(x - cx, y - cy)
							if (distance < winningDistance) {
								winningDistance = distance
								winningSlot = cellAtom.slot
							}

						}

						if (winningSlot === undefined) break

						const {x: cx, y: cy} = getAtomPosition(winningSlot)
						atom.highlight = createChild(atom, HIGHLIGHT, {bottom: true})
						atom.highlight.x = cx
						atom.highlight.y = cy
						atom.highlight.hasBorder = true
						atom.highlight.colour = Colour.Grey
						atom.highlightedAtom = winningSlot

						break
					}
					
					else {
						let winningDistance = Infinity
						let winningSide = undefined
						let winningCellAtom = undefined

						for (const cellAtom of paddle.cellAtoms) {
							const {x: cx, y: cy} = getAtomPosition(cellAtom)
							const cleft = cx
							const cright = cx + cellAtom.width
							const ctop = cy
							const cbottom = cy + cellAtom.height

							const spotLeft = [cleft - cellAtom.width, ctop]
							const spotAbove = [cleft, ctop - cellAtom.height]
							const spotRight = [cright, ctop]
							const spotBelow = [cleft, cbottom]

							const dspotLeft = Math.hypot(x - spotLeft[0], y - spotLeft[1])
							if (!isCellAtomSpotFilled(paddle, spotLeft) && dspotLeft < winningDistance) {
								winningDistance = dspotLeft
								winningCellAtom = cellAtom
								winningSide = "left"
							}

							const dspotAbove = Math.hypot(x - spotAbove[0], y - spotAbove[1])
							if (!isCellAtomSpotFilled(paddle, spotAbove) && dspotAbove < winningDistance) {
								winningDistance = dspotAbove
								winningCellAtom = cellAtom
								winningSide = "above"
							}

							const dspotRight = Math.hypot(x - spotRight[0], y - spotRight[1])
							if (!isCellAtomSpotFilled(paddle, spotRight) && dspotRight < winningDistance) {
								winningDistance = dspotRight
								winningCellAtom = cellAtom
								winningSide = "right"
							}

							const dspotBelow = Math.hypot(x - spotBelow[0], y - spotBelow[1])
							if (!isCellAtomSpotFilled(paddle, spotBelow) && dspotBelow < winningDistance) {
								winningDistance = dspotBelow
								winningCellAtom = cellAtom
								winningSide = "below"
							}
						}

						const {x: cx, y: cy} = getAtomPosition(winningCellAtom)

						atom.highlight = createChild(atom, HIGHLIGHT, {bottom: true})
						if (winningSide === "left" || winningSide === "right") {
							atom.highlight.width = HIGHLIGHT_THICKNESS
							atom.highlight.height = winningCellAtom.height
						}
						else if (winningSide === "above" || winningSide === "below") {
							atom.highlight.width = winningCellAtom.width
							atom.highlight.height = HIGHLIGHT_THICKNESS
						}

						if (winningSide === "left") {
							atom.highlight.x = cx - HIGHLIGHT_THICKNESS/2
							atom.highlight.y = cy
						}
						else if (winningSide === "right") {
							atom.highlight.x = cx - HIGHLIGHT_THICKNESS/2 + winningCellAtom.width
							atom.highlight.y = cy
						}
						else if (winningSide === "above") {
							atom.highlight.x = cx
							atom.highlight.y = cy - HIGHLIGHT_THICKNESS/2
						}
						else if (winningSide === "below") {
							atom.highlight.x = cx
							atom.highlight.y = cy - HIGHLIGHT_THICKNESS/2 + winningCellAtom.height
						}

						atom.highlightedAtom = winningCellAtom
						atom.highlightedSide = winningSide

						break

					}

				}

				if (atom.highlightedAtom === undefined) {
					for (let other of state.colourTode.atoms) {
						if (other === atom) continue
						if (!other.isSquare) continue
						if (other.parent !== COLOURTODE_BASE_PARENT) continue
						if (other.joins.length > 0 && other.joinExpanded) {
							other = other.pickerPad
						}
						
						const {x: ox, y: oy} = getAtomPosition(other)
						const oleft = ox
						const oright = ox + other.width
						const otop = oy
						const obottom = oy + other.height

						if (left > oright) continue
						if (right < oleft) continue
						if (bottom < otop) continue
						if (top > obottom) continue

						if (other.isPicker) {
							atom.highlightedAtom = other.parent
						} else {
							atom.highlightedAtom = other
						}

						atom.highlight = createChild(atom, HIGHLIGHT, {bottom: true})
						atom.highlight.hasBorder = true
						atom.highlight.hasInner = false
						atom.highlight.width = other.width
						atom.highlight.height = other.height
						atom.highlight.x = ox
						atom.highlight.y = oy

						break

					}
				}


			}

			if (atom.highlightedAtom === undefined && atom.highlight !== undefined) {
				deleteChild(atom, atom.highlight)
				atom.highlight = undefined
			}

		},

		drop: (atom) => {
			if (atom.highlight !== undefined) {

				if (atom.highlightedAtom.isPaddle) {
					const paddle = atom.highlightedAtom
					atom.attached = true
					giveChild(paddle, atom)
					paddle.cellAtoms.push(atom)
					atom.x = PADDLE.width/2 - atom.width/2
					atom.y = PADDLE.height/2 - atom.height/2
					atom.dx = 0
					atom.dy = 0
					
					updatePaddleSize(paddle)

					if (paddle.rightTriangle !== undefined && atom.slotted !== undefined) {
						registerAtom(atom.slotted)
						giveChild(paddle, atom.slotted)
					}
				}
				else if (atom.highlightedAtom.isSlot) {
					const slot = atom.highlightedAtom
					const paddle = slot.parent
					atom.attached = true
					giveChild(paddle, atom)
					atom.x = slot.x
					atom.y = slot.y
					atom.dx = 0
					atom.dy = 0
					slot.cellAtom.slotted = atom
					atom.cellAtom = slot.cellAtom
					atom.slottee = true

					updatePaddleSize(slot.parent)
				}
				else if (atom.highlightedAtom.isSquare && atom.highlightedAtom.parent.isPaddle) {

					const square = atom.highlightedAtom
					const paddle = square.parent
					atom.attached = true
					giveChild(paddle, atom)
					paddle.cellAtoms.push(atom)

					if (atom.highlightedSide === "left") {
						atom.x = square.x - atom.width
						atom.y = square.y
					} else if (atom.highlightedSide === "right") {
						atom.x = square.x + square.width
						atom.y = square.y
					} else if (atom.highlightedSide === "above") {
						atom.x = square.x
						atom.y = square.y - atom.height
					} else if (atom.highlightedSide === "below") {
						atom.x = square.x
						atom.y = square.y + square.height
					}

					if (paddle.rightTriangle !== undefined && atom.slotted !== undefined) {
						registerAtom(atom.slotted)
						giveChild(paddle, atom.slotted)
					}

					atom.dx = 0
					atom.dy = 0
					updatePaddleSize(paddle)

				}
				else {
					const joinee = atom.highlightedAtom
					const joiner = atom

					if (joinee.expanded) {
						joinee.unexpand(joinee)
					}

					if (joiner.expanded) {
						joiner.unexpand(joiner)
					}
					
					if (joinee.joinExpanded) {
						joinee.joinUnepxand(joinee)
					}

					joinee.joins.push(joiner)
					deleteAtom(joiner)
					joinee.isJoinee = true
					
					joinee.joinExpand(joinee)
					
					joinee.value.joins.push(joiner.value)
					joinee.needsColoursUpdate = true
					joinee.colourTicker = Infinity

					const diagramCell = makeDiagramCell({content: joinee.value})
					state.brush.colour = makeDiagram({left: [diagramCell]})
					
					
				}

			}
		},

		joinExpand: (atom) => {
			atom.joinExpanded = true
			
			const pickerPad = createChild(atom, COLOURTODE_PICKER_PAD)
			atom.pickerPad = pickerPad
			pickerPad.width = atom.width + OPTION_MARGIN*2
			pickerPad.x = -OPTION_MARGIN
			pickerPad.height = (atom.joins.length+1) * (atom.height + OPTION_MARGIN) + OPTION_MARGIN
			pickerPad.y = -OPTION_MARGIN
			pickerPad.dragOnly = false
			pickerPad.touch = (atom) => atom.parent

			for (let i = 0; i < atom.joins.length; i++) {
				const joiner = atom.joins[i]
				registerAtom(joiner)
				giveChild(atom, joiner)
				joiner.x = 0
				joiner.y = (i+1) * (atom.height + OPTION_MARGIN)
				joiner.dx = 0
				joiner.dy = 0
				joiner.touch = (atom) => atom.parent
				joiner.grab = (atom) => atom.parent
				
			}
			
			atom.needsColoursUpdate = true
			atom.colourTicker = Infinity
			
		},

		joinUnepxand: (atom) => {
			atom.joinExpanded = false
			deleteChild(atom, atom.pickerPad)

			for (let i = 0; i < atom.joins.length; i++) {
				const joiner = atom.joins[i]
				deleteChild(atom, joiner)
			}
			
			atom.needsColoursUpdate = true
			atom.colourTicker = Infinity

		},

		drag: (atom) => {

			if (atom.attached) {

				const paddle = atom.parent
				if (paddle.pinhole.locked) {
					const {x, y} = getAtomPosition(atom)
					const clone = makeAtom(COLOURTODE_SQUARE)
					hand.offset.x -= atom.x - x
					hand.offset.y -= atom.y - y
					clone.x = x
					clone.y = y

					const dragonArray = cloneDragonArray(atom.value)
					clone.value = dragonArray

					for (const j of clone.value.joins) {
						const joinAtom = makeAtom(COLOURTODE_SQUARE)
						joinAtom.value = j
						clone.joins.push(joinAtom)
					}
					registerAtom(clone)

					/*if (atom.slotted !== undefined) {
						clone.slotted = makeAtom(COLOURTODE_SQUARE)
						const slottedDragonArray = cloneDragonArray(atom.slotted.value)
						clone.slotted.value = slottedDragonArray
						//registerAtom(clone)
					}*/

					return clone
				}

				if (atom.slottee) {
					atom.attached = false
					atom.slottee = false
					freeChild(paddle, atom)
					atom.cellAtom.slotted = undefined
					atom.cellAtom = undefined
					return atom
				}
				
				atom.attached = false
				freeChild(paddle, atom)

				const id = paddle.cellAtoms.indexOf(atom)
				paddle.cellAtoms.splice(id, 1)
				
				atom.slot = undefined
				if (paddle.rightTriangle !== undefined && atom.slotted !== undefined) {
					freeChild(paddle, atom.slotted)
					deleteAtom(atom.slotted)
				}
				//atom.slotted = undefined
				updatePaddleSize(paddle)

			}

			return atom
		},

		size: 40,
		expanded: false,
	}

	const TRIANGLE_RIGHT = {
		size: COLOURTODE_SQUARE.size,
		width: COLOURTODE_SQUARE.size * Math.sqrt(3)/2, //the only reason width is set is for the menu spacing
		draw: (atom) => {

			const {x, y} = getAtomPosition(atom)

			let size = atom.size
			if (atom.isTool) size -= BORDER_THICKNESS*2.5

			const height = size
			const width = size * Math.sqrt(3)/2
			
			const left = x
			const right = left + width
			let top = y
			if (atom.isTool) top += BORDER_THICKNESS*1.25
			const bottom = top + height
			const middleY = top + height/2

			colourTodeContext.fillStyle = atom.colour
			const path = new Path2D()

			path.moveTo(left, top)
			path.lineTo(right, middleY)
			path.lineTo(left, bottom)
			path.closePath()
			colourTodeContext.fillStyle = atom.colour
			colourTodeContext.fill(path)
			if (atom.hasBorder) {
				colourTodeContext.lineWidth = BORDER_THICKNESS*1.5
				colourTodeContext.strokeStyle = atom.borderColour

				if (atom.isTool) {
					//colourTodeContext.lineWidth = BORDER_THICKNESS*1.0
					colourTodeContext.strokeStyle = toolBorderColours[atom.colour.splash]
				}
				colourTodeContext.stroke(path)
			}
		},
		overlaps: (atom, x, y) => {
			
			const {x: ax, y: ay} = getAtomPosition(atom)

			const height = atom.size
			const width = atom.size * Math.sqrt(3)/2
			
			const left = ax
			const right = left + width
			const top = ay
			const bottom = top + height

			if (x < left) return false
			if (y < top) return false
			if (x > right) return false
			if (y > bottom) return false

			return true
		},
		offscreen: (atom) => {

			const {x, y} = getAtomPosition(atom)

			const height = atom.size
			const width = atom.size * Math.sqrt(3)/2
			
			const left = x
			const right = left + width
			const top = y
			const bottom = top + height

			if (right < 0) return true
			if (bottom < 0) return true
			if (left > canvas.width) return true
			if (top > canvas.height) return true
			return false
		},
	}

	const TRIANGLE_UP = {
		size: COLOURTODE_SQUARE.size,
		draw: (atom) => {

			const {x, y} = getAtomPosition(atom)

			const width = atom.size
			const height = atom.size * Math.sqrt(3)/2
			
			const left = x
			const right = left + width
			const top = y
			const bottom = top + height
			const middleX = left + width/2

			colourTodeContext.fillStyle = atom.colour
			const path = new Path2D()

			path.moveTo(left, bottom)
			path.lineTo(middleX, top)
			path.lineTo(right, bottom)
			path.closePath()
			colourTodeContext.fillStyle = atom.colour
			colourTodeContext.fill(path)
			if (atom.hasBorder) {
				colourTodeContext.lineWidth = BORDER_THICKNESS*1.5
				colourTodeContext.strokeStyle = atom.borderColour
				colourTodeContext.stroke(path)
			}
		},
		overlaps: (atom, x, y) => {
			
			const {x: ax, y: ay} = getAtomPosition(atom)

			const width = atom.size
			const height = atom.size * Math.sqrt(3)/2
			
			const left = ax
			const right = left + width
			const top = ay
			const bottom = top + height

			if (x < left) return false
			if (y < top) return false
			if (x > right) return false
			if (y > bottom) return false

			return true
		},
		offscreen: (atom) => {

			const {x, y} = getAtomPosition(atom)

			const width = atom.size
			const height = atom.size * Math.sqrt(3)/2
			
			const left = x
			const right = left + width
			const top = y
			const bottom = top + height

			if (right < 0) return true
			if (bottom < 0) return true
			if (left > canvas.width) return true
			if (top > canvas.height) return true
			return false
		},
	}

	const TRIANGLE_DOWN = {
		size: COLOURTODE_SQUARE.size,
		draw: (atom) => {

			const {x, y} = getAtomPosition(atom)

			const width = atom.size
			const height = atom.size * Math.sqrt(3)/2
			
			const left = x
			const right = left + width
			const top = y
			const bottom = top + height
			const middleX = left + width/2

			colourTodeContext.fillStyle = atom.colour
			const path = new Path2D()

			path.moveTo(left, top)
			path.lineTo(middleX, bottom)
			path.lineTo(right, top)
			path.closePath()
			colourTodeContext.fillStyle = atom.colour
			colourTodeContext.fill(path)
			if (atom.hasBorder) {
				colourTodeContext.lineWidth = BORDER_THICKNESS*1.5
				colourTodeContext.strokeStyle = atom.borderColour
				colourTodeContext.stroke(path)
			}
		},
		overlaps: (atom, x, y) => {
			
			const {x: ax, y: ay} = getAtomPosition(atom)

			const width = atom.size
			const height = atom.size * Math.sqrt(3)/2
			
			const left = ax
			const right = left + width
			const top = ay
			const bottom = top + height

			if (x < left) return false
			if (y < top) return false
			if (x > right) return false
			if (y > bottom) return false

			return true
		},
		offscreen: (atom) => {

			const {x, y} = getAtomPosition(atom)

			const width = atom.size
			const height = atom.size * Math.sqrt(3)/2
			
			const left = x
			const right = left + width
			const top = y
			const bottom = top + height

			if (right < 0) return true
			if (bottom < 0) return true
			if (left > canvas.width) return true
			if (top > canvas.height) return true
			return false
		},
	}

	const COLOURTODE_TRIANGLE = {
		behindOtherChildren: true,
		expanded: false,
		draw: (atom) => {
			if (atom.direction === "right") TRIANGLE_RIGHT.draw(atom)
			else if (atom.direction === "down") TRIANGLE_DOWN.draw(atom)
			else if (atom.direction === "up") TRIANGLE_UP.draw(atom)
			else TRIANGLE_RIGHT.draw(atom)
		},
		colour: Colour.splash(999),
		overlaps: TRIANGLE_RIGHT.overlaps,
		offscreen: TRIANGLE_RIGHT.offscreen,
		size: COLOURTODE_SQUARE.size,
		width: TRIANGLE_RIGHT.width,
		direction: "right",
		click: (atom) => {
			
			if (atom.parent.isPaddle) {
				return
			}

			if (atom.expanded) {
				atom.unexpand(atom)
			}
			else {
				atom.expand(atom)
			}
		},

		expand: (atom) => {
			atom.pad = createChild(atom, TRIANGLE_PAD)
			atom.handle = createChild(atom, TRIANGLE_HANDLE)
			atom.expanded = true

			atom.upPick = createChild(atom, TRIANGLE_PICK_UP)
			atom.rightPick = createChild(atom, TRIANGLE_PICK_RIGHT)
			atom.downPick = createChild(atom, TRIANGLE_PICK_DOWN)
			
			if (atom.direction === "up") atom.upPick.value = true
			if (atom.direction === "right") atom.rightPick.value = true
			if (atom.direction === "down") atom.downPick.value = true
		},

		unexpand: (atom) => {
			deleteChild(atom, atom.pad)
			deleteChild(atom, atom.handle)
			deleteChild(atom, atom.upPick)
			deleteChild(atom, atom.rightPick)
			deleteChild(atom, atom.downPick)
			atom.expanded = false
		},

		highlighter: true,

		// Returns what atom to highlight when being hovered over stuff
		hover: (atom) => {

			if (atom.direction !== "right") return undefined

			// Get my bounds
			const {x, y} = getAtomPosition(atom)
			const left = x
			const top = y
			const right = x + atom.width
			const bottom = y + atom.height

			// HIGHLIGHT SELECTION CODE GOES HERE!!!

			for (const paddle of paddles) {

				// Don't pick hidden or filled paddles
				if (!paddle.expanded) continue
				if (paddle.pinhole.locked) continue
				if (paddle.rightTriangle !== undefined) continue

				// Get paddle bounds
				const {x: px, y: py} = getAtomPosition(paddle)
				const pleft = px
				const pright = px + paddle.width
				const ptop = py
				const pbottom = py + paddle.height

				// Check if I am hovering over the paddle
				if (left > pright) continue
				if (right < pleft) continue
				if (top > pbottom) continue
				if (bottom < ptop) continue

				// Return the highlight and the highlighted atom (the paddle)
				return paddle
			}

			return undefined
		},

		place: (atom, paddle) => {
			
			giveChild(paddle, atom)
			paddle.rightTriangle = atom
			atom.x = PADDLE.width/2 - atom.width/2
			atom.y = PADDLE.height/2 - atom.height/2
			atom.dx = 0
			atom.dy = 0

			for (const cellAtom of paddle.cellAtoms) {
				if (cellAtom.slotted !== undefined) {
					registerAtom(cellAtom.slotted)
					giveChild(paddle, cellAtom.slotted)
				}
			}

			updatePaddleSize(paddle)

			if (atom.expanded) {
				atom.unexpand(atom)
			}

			atom.attached = true

			unlockMenuTool("circle")

		},

		drag: (atom) => {
			if (!atom.parent.isPaddle) return atom
			const paddle = atom.parent
			if (paddle.pinhole.locked) {
				const clone = makeAtom(COLOURTODE_TRIANGLE)
				clone.direction = atom.direction
				const {x, y} = getAtomPosition(atom)
				hand.offset.x -= atom.x - x
				hand.offset.y -= atom.y - y
				clone.x = x
				clone.y = y
				registerAtom(clone)
				return clone
			}

			atom.attached = false
			freeChild(paddle, atom)
			paddle.rightTriangle = undefined

			for (const cellAtom of paddle.cellAtoms) {
				if (cellAtom.slotted !== undefined) {
					freeChild(paddle, cellAtom.slotted)
					deleteAtom(cellAtom.slotted)
				}
			}

			updatePaddleSize(paddle)
			return atom
		},

	}

	const OPTION_MARGIN = 10
	const CHANNEL_HEIGHT = COLOURTODE_SQUARE.size - OPTION_MARGIN*2
	const OPTION_SPACING = CHANNEL_HEIGHT + OPTION_MARGIN

	const COLOURTODE_PICKER_PAD_MARGIN = OPTION_MARGIN
	const COLOURTODE_PICKER_PAD = {
		draw: COLOURTODE_RECTANGLE.draw,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		grab: (atom) => atom.parent,
		colour: Colour.Grey,
		width: COLOURTODE_PICKER_PAD_MARGIN + 3*(COLOURTODE_SQUARE.size + COLOURTODE_PICKER_PAD_MARGIN),
		height: COLOURTODE_SQUARE.size,
		y: 0,
		x: COLOURTODE_SQUARE.size + COLOURTODE_PICKER_PAD_MARGIN,
		dragOnly: true,
		isPicker: true,
	}

	const CHANNEL_IDS = {
		red: 0,
		green: 1,
		blue: 2,
	}

	const CHANNEL_NAMES = [
		"red",
		"green",
		"blue",
	]

	const COLOURTODE_PICKER_CHANNEL = {
		
		//behindChildren: true,
		hasBorder: true,
		draw: COLOURTODE_RECTANGLE.draw,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		width: COLOURTODE_SQUARE.size,
		y: (COLOURTODE_SQUARE.size - CHANNEL_HEIGHT)/2,
		height: CHANNEL_HEIGHT,
		
		grab: (atom) => {
			//if (atom.parent.isSquare) return atom.parent
			return atom
		},

		drag: (atom) => {
			if (atom.parent.isSquare) {
				const square = atom.parent
				square[atom.channelSlot] = undefined
				const channelId = CHANNEL_IDS[atom.channelSlot]
				square.receiveNumber(square, undefined, channelId)
				freeChild(square, atom)
				atom.channelSlot = CHANNEL_NAMES[atom.value.channel]
				atom.updateColours(atom)
				atom.attached = false

				
				atom.needsColoursUpdate = true
				atom.colourTicker = Infinity

				unlockMenuTool("wide_rectangle")
			}
			return atom
		},

		construct: (atom) => {
			const values = [false, false, false, false, false, false, false, false, false, true]
			const channel = Random.Uint8 % 3
			atom.value = makeNumber({values, channel})
			atom.needsColoursUpdate = true
			atom.colourId = 0
			atom.dcolourId = 1
			atom.colourTicker = Infinity

			atom.selectionBack = createChild(atom, COLOURTODE_CHANNEL_SELECTION_SIDE)

			const selectionTop = createChild(atom, COLOURTODE_CHANNEL_SELECTION_END)
			atom.selectionTop = selectionTop
			atom.selectionTop.isTop = true
			selectionTop.dragOnly = false

			const selectionBottom = createChild(atom, COLOURTODE_CHANNEL_SELECTION_END)
			atom.selectionBottom = selectionBottom
			atom.selectionBottom.isTop = false
			selectionBottom.dragOnly = false

			atom.positionSelection(atom)
		},

		positionSelection: (atom, start, end, top, bottom) => {
			
			if (!atom.expanded) {

				atom.selectionTop.y = -atom.selectionTop.height
				//atom.selectionTop.x = -atom.selectionTop.height
				
				atom.selectionBottom.y = atom.height
				//atom.selectionBottom.x = -atom.selectionBottom.height

			}
			
			else {
				//const optionSpacing = (atom.height + (COLOURTODE_SQUARE.size - CHANNEL_HEIGHT)/2)
				const optionSpacing = OPTION_SPACING

				atom.selectionTop.y = end - atom.selectionTop.height
				atom.selectionBottom.y = start + optionSpacing - atom.selectionBottom.height

				atom.selectionTop.minY = top - atom.selectionTop.height
				atom.selectionTop.maxY = atom.selectionBottom.y - optionSpacing

				atom.selectionBottom.minY = atom.selectionTop.y + optionSpacing
				atom.selectionBottom.maxY = bottom - atom.selectionBottom.height + optionSpacing
			}

			atom.positionSelectionBack(atom)

			// bring selectors to front!
			const selectionTopId = atom.children.indexOf(atom.selectionTop)
			atom.children.splice(selectionTopId, 1)
			atom.children.push(atom.selectionTop)

			const selectionBottomId = atom.children.indexOf(atom.selectionBottom)
			atom.children.splice(selectionBottomId, 1)
			atom.children.push(atom.selectionBottom)

		},

		positionSelectionBack: (atom) => {
			atom.selectionBack.x = -COLOURTODE_CHANNEL_SELECTION_END.height
			atom.selectionBack.y = atom.selectionTop.y
			atom.selectionBack.height = atom.selectionBottom.y - atom.selectionTop.y + atom.selectionTop.height
			atom.selectionBack.width = atom.width + COLOURTODE_CHANNEL_SELECTION_END.height*2
		},

		update: (atom) => {

			if (atom.expanded) {
				if (atom.needsColoursUpdate) {
					atom.needsColoursUpdate = false
					atom.updateColours(atom)
				}
			}

			if (!atom.expanded && atom.needsColoursUpdate) {
				atom.needsColoursUpdate = false
				
				if (atom.parent.isSquare) {
					
					const channels = []

					for (let i = 0; i < 3; i++) {
						if (i === atom.value.channel) {
							channels[i] = atom.value
						}
						else {
							const values = [true, false, false, false, false, false, false, false, false, false]
							channels[i] = makeNumber({values, channel: i})
						}
					}
					
					const array = makeArray({channels})
					atom.colours = getSplashesArrayFromArray(array)

				}
				else {

					let array = undefined

					for (let i = 0; i < 10; i++) {
						const v = atom.value.values[i]
						if (v === false) continue
						const join = makeArrayFromSplash(`${i}${i}${i}`)
						if (array === undefined) {
							array = join
						} else {
							array.joins.push(join)
						}
					}

					atom.colours = getSplashesArrayFromArray(array)
				}

				atom.colourTicker = Infinity
			}

			if (atom.colourTicker >= getColourCycleLength(atom)) {
				atom.colourTicker = 0

				atom.colourId += atom.dcolourId
				if (atom.colourId === atom.colours.length-1 || atom.colourId === 0) {
					atom.dcolourId *= -1
				}
				if (atom.colourId >= atom.colours.length) {
					atom.dcolourId = -1
					atom.colourId = atom.colours.length-1
				}
				if (atom.colourId < 0) {
					atom.dcolourId = 1
					atom.colourId = 0
				}
				atom.colour = Colour.splash(atom.colours[atom.colourId])

			} else {
				atom.colourTicker++
			}

			atom.highlightedAtom = undefined
			if (hand.content === atom && hand.state === HAND.DRAGGING) {

				const {x, y} = getAtomPosition(atom)
				const left = x
				const top = y
				const right = x + atom.width
				const bottom = y + atom.height

				if (atom.highlight !== undefined) {
					deleteChild(atom, atom.highlight)
					atom.highlight = undefined
				}

				let winningDistance = Infinity
				let winningSquare = undefined
				let winningSlot = undefined

				for (const square of state.colourTode.atoms) {
					if (!square.isSquare) continue
					if (!square.expanded) continue

					const {x: px, y: py} = getAtomPosition(square.pickerPad)

					const pleft = px
					const pright = px + square.pickerPad.width
					const ptop = py
					const pbottom = py + square.pickerPad.height

					if (left > pright) continue
					if (right < pleft) continue
					if (bottom < ptop) continue
					if (top > pbottom) continue

					const slots = ["red", "green", "blue"].filter(slot => square[slot] === undefined)
					if (slots.length === 0) continue
					
					const {x: ax, y: ay} = getAtomPosition(square)

					for (const slot of slots) {
						const slotId = CHANNEL_IDS[slot]
						const sx = ax + square.size + OPTION_MARGIN*2 + slotId*(COLOURTODE_SQUARE.size + COLOURTODE_PICKER_PAD_MARGIN)
						const sy = ay + OPTION_MARGIN
						const distance = Math.hypot(x - sx, y - sy)
						if (distance < winningDistance) {
							winningDistance = distance
							winningSquare = square
							winningSlot = slot
						}
					}

				}

				if (winningSquare !== undefined) {

					const {x: ax, y: ay} = getAtomPosition(winningSquare)
					const slotId = CHANNEL_IDS[winningSlot]

					atom.highlight = createChild(atom, HIGHLIGHT, {bottom: true})
					atom.highlight.hasBorder = true
					atom.highlight.x = ax + winningSquare.size + OPTION_MARGIN + slotId*(OPTION_MARGIN+winningSquare.size)
					atom.highlight.y = ay
					atom.highlight.width = OPTION_MARGIN*2+winningSquare.size
					atom.highlightedAtom = winningSquare
					atom.highlightedSlot = winningSlot
				}

			}
			
			if (atom.highlightedAtom === undefined && atom.highlight !== undefined) {
				deleteChild(atom, atom.highlight)
				atom.highlight = undefined
			}

		},

		drop: (atom) => {
			if (atom.highlight !== undefined) {
				const square = atom.highlightedAtom
				const slotId = CHANNEL_IDS[atom.highlightedSlot]
				atom.value.channel = slotId
				/*giveChild(square, atom)
				atom.dx = 0
				atom.dy = 0
				square[atom.highlightedSlot] = atom
				atom.y = OPTION_MARGIN
				atom.x = square.size + OPTION_MARGIN*2 + slotId*(OPTION_MARGIN*square.size)*/
				square.receiveNumber(square, atom.value, slotId, {expanded: atom.expanded})
				deleteAtom(atom)
			}
			
			unlockMenuTool("tall_rectangle")
		},

		click: (atom) => {
			if (!atom.expanded) {
				atom.expanded = true
				atom.colourId = 0
				atom.colourTicker = Infinity
				atom.createOptions(atom)
			}
			else {
				atom.expanded = false
				atom.deleteOptions(atom)
			}
		},

		deleteOptions: (atom) => {

			for (const option of atom.options) {
				if (atom !== option) deleteChild(atom, option)
			}
			atom.needsColoursUpdate = true
			atom.colourTicker = Infinity
			atom.positionSelection(atom)
		},

		updateColours: (atom) => {
			let parentR = undefined
			let parentG = undefined
			let parentB = undefined

			if (atom.parent.isSquare) {

				let redNumber = atom.parent.value.channels[0]
				let greenNumber = atom.parent.value.channels[1]
				let blueNumber = atom.parent.value.channels[2]

				if (redNumber === undefined) redNumber = makeNumber({channel: 0, values: [true, false, false, false, false, false, false, false, false, false]})
				if (greenNumber === undefined) greenNumber = makeNumber({channel: 1, values: [true, false, false, false, false, false, false, false, false, false]})
				if (blueNumber === undefined) blueNumber = makeNumber({channel: 2, values: [true, false, false, false, false, false, false, false, false, false]})

				parentR = makeNumber({values: [...redNumber.values], channel: redNumber.channel})
				parentG = makeNumber({values: [...greenNumber.values], channel: greenNumber.channel})
				parentB = makeNumber({values: [...blueNumber.values], channel: blueNumber.channel})
			}
			else {
				const values = [false, false, false, false, false, false, false, false, false, false]
				parentR = makeNumber({values: [...values], channel: 0})
				parentG = makeNumber({values: [...values], channel: 1})
				parentB = makeNumber({values: [...values], channel: 2})
			}

			const parentChannels = [parentR, parentG, parentB]
			const mainParentChannel = parentChannels[CHANNEL_IDS[atom.channelSlot]]
			if (mainParentChannel !== undefined) mainParentChannel.values = [false, false, false, false, false, false, false, false, false, false]

			if (atom.options !== undefined && atom.options.length > 0) {
				for (let i = 0; i < 10; i++) {

					const option = atom.options[i]
					
					if (atom.parent.isSquare) {
						mainParentChannel.values[9-i] = true
						if (i > 0) mainParentChannel.values[9-i+1] = false
					} else {
						for (const c of parentChannels) {
							c.values[9-i] = true
							if (i > 0) c.values[9-i+1] = false
						}
					}

					const baseArray = makeArray({channels: parentChannels})

					const colours = getSplashesArrayFromArray(baseArray)

					option.colours = colours
					option.colourTicker = Infinity
					//option.needsColoursUpdate = true
				}
			}
		},

		getCenterId: (atom) => {
			let startId = undefined
			let endId = undefined
	
			for (let i = 0; i < atom.value.values.length; i++) {
				const value = atom.value.values[i]
				if (value) {
					if (startId === undefined) startId = i
					endId = i
				}
			}
			return Math.round((endId + startId) / 2)
		},

		getStartAndEndId: (atom) => {
			let startId = undefined
			let endId = undefined
	
			for (let i = 0; i < atom.value.values.length; i++) {
				const value = atom.value.values[i]
				if (value) {
					if (startId === undefined) startId = i
					endId = i
				}
			}
			return [startId, endId]
		},

		createOptions: (atom) => {

			atom.options = []

			let startId = undefined
			let endId = undefined
	
			for (let i = 0; i < atom.value.values.length; i++) {
				const value = atom.value.values[i]
				if (value) {
					if (startId === undefined) startId = i
					endId = i
				}
			}
	
			if (startId === undefined) throw new Error("[ColourTode] Number cannot be NOTHING. Please let @TodePond know if you see this error!")
			//const centerOptionId = 9 - Math.floor((endId + startId) / 2)
			const centerOptionId = atom.getCenterId(atom)
			
			//const optionSpacing = (atom.height + (COLOURTODE_SQUARE.size - CHANNEL_HEIGHT)/2)
			const optionSpacing = OPTION_SPACING
			let top = (centerOptionId - 9) * optionSpacing
			let bottom = centerOptionId*optionSpacing

			
			const start = top + (9-startId) * optionSpacing
			const end = top + (9-endId) * optionSpacing

			for (let i = 0; i < 10; i++) {
				if (centerOptionId === 9-i) {
					atom.options.push(atom)
					continue
				}

				const pityTop = i !== 9 - endId + 1
				const pityBottom = i !== 9 - startId - 1
				const option = createChild(atom, {...COLOURTODE_PICKER_CHANNEL_OPTION, pityTop, pityBottom})

				option.y = top + i * optionSpacing
				option.value = 9 - i
				//option.colourTicker = Infinity
				//option.needsColoursUpdate = true
				option.updateColours(option)
				atom.options.push(option)
			}


			atom.positionSelection(atom, start, end, top, bottom)
			
			atom.updateColours(atom)
		}
	}

	const COLOURTODE_CHANNEL_SELECTION_END = {
		draw: (atom) => {
			const {x, y} = getAtomPosition(atom)

			let colour = "pink"
			if (atom.parent !== COLOURTODE_BASE_PARENT) {
				if (atom.parent.parent !== COLOURTODE_BASE_PARENT) {
					const colours = getSplashesArrayFromArray(atom.parent.parent.value)
					colour = colours[Random.Uint32 % colours.length]
				}
			}

			/*colourTodeContext.fillStyle = "#000000"
			colourTodeContext.globalCompositeOperation = "lighten"
			colourTodeContext.fillRect(x, y, atom.width, atom.height)
			colourTodeContext.globalCompositeOperation = "source-over"

			colourTodeContext.filter = "invert(1) saturate(0%) brightness(67.5%) contrast(10000%)"

			const X = Math.round(x)
			const Y = Math.round(y)
			const W = Math.round(atom.width)
			const H = Math.round(atom.height)

			colourTodeContext.drawImage(colourTodeCanvas, X, Y, W, H, X, Y, W, H)
			colourTodeContext.filter = "none"*/

			const X = Math.round(x)
			const Y = Math.round(y)
			const W = Math.round(atom.width)
			const H = Math.round(atom.height)

			colourTodeContext.fillStyle = Colour.Grey
			colourTodeContext.fillRect(X, Y, W, H)
			
		},
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		height: OPTION_SPACING - CHANNEL_HEIGHT,
		width: COLOURTODE_SQUARE.size + OPTION_MARGIN*2,
		x: - OPTION_MARGIN,
		//grabbable: false,
		dragOnly: true,
		grab: (atom) => atom.parent.expanded? atom : atom.parent,
		touch: (atom) => atom.parent.expanded? atom : atom.parent,
		cursor: (atom) => {
			return atom.parent.expanded? "ns-resize" : "pointer"
		},
		move: (atom) => {
			atom.parent.positionSelectionBack(atom.parent)
		},
		drop: (atom) => {
			let distanceFromMiddle = Math.round((atom.y+CHANNEL_HEIGHT/2) / OPTION_SPACING)

			const oldNumber = atom.parent.value

			let [startId, endId] = atom.parent.getStartAndEndId(atom.parent)
			let centerId = atom.parent.getCenterId(atom.parent)

			if (atom.isTop) {
				endId = centerId - distanceFromMiddle
			}
			if (!atom.isTop) {
				startId = centerId - (distanceFromMiddle-1)
			}

			const values = [false, false, false, false, false, false, false, false, false, false]
			for (let i = startId; i <= endId; i++) {
				values[i] = true
			}

			const number = makeNumber({channel: oldNumber.channel, values})
			atom.parent.value = number
			atom.parent.deleteOptions(atom.parent)
			atom.parent.createOptions(atom.parent)

			atom.dx = 0
			atom.dy = 0

			
			if (atom.parent.parent !== COLOURTODE_BASE_PARENT) {
				const square = atom.parent.parent
				const channel = CHANNEL_IDS[atom.parent.channelSlot]
				square.receiveNumber(square, number, channel)
			}

			
		},
		dragLockX: true,
	}

	const COLOURTODE_CHANNEL_SELECTION_SIDE = {
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		width: (COLOURTODE_SQUARE.size - CHANNEL_HEIGHT)/2,
		height: COLOURTODE_SQUARE.size,
		//grabbable: false,
		grab: (atom) => atom.parent,
		touch: (atom) => atom.parent,
		dragLockX: true,
		draw: COLOURTODE_RECTANGLE.draw,
		colour: Colour.Grey,
	}

	const COLOURTODE_PICKER_CHANNEL_OPTION = {
		draw: COLOURTODE_RECTANGLE.draw,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		height: CHANNEL_HEIGHT,
		width: COLOURTODE_SQUARE.size,
		grab: (atom) => atom.parent,
		hasBorder: true,
		
		colourTicker: Infinity,
		colours: [999],
		colourId: 0,
		dcolourId: 1,
		update: (atom) => {
			if (atom.colourTicker >= getColourCycleLength(atom)) {
				atom.colourTicker = 0

				atom.updateColours(atom)

			} else {
				atom.colourTicker++
			}
		},

		getId: (atom) => {			
			const parent = atom.parent
			const centerId = parent.getCenterId(parent)
			const offset = atom.y / OPTION_SPACING
			return centerId - offset
		},

		updateColours: (atom) => {
			atom.colourId += atom.dcolourId
			if (atom.colourId === atom.colours.length-1 || atom.colourId === 0) {
				atom.dcolourId *= -1
			}
			if (atom.colourId >= atom.colours.length) {
				atom.dcolourId = -1
				atom.colourId = atom.colours.length-1
			}
			if (atom.colourId < 0) {
				atom.dcolourId = 1
				atom.colourId = 0
			}
			atom.colour = Colour.splash(atom.colours[atom.colourId])
		},

		touch: (atom) => {
			const id = atom.getId(atom)
			if (atom.parent.value.values[id]) return atom.parent
			return atom
		},

		click: (atom) => {

			const values = [false, false, false, false, false, false, false, false, false, false]
			values[atom.value] = true
			const number = makeNumber({values, channel: atom.parent.value.channel})
			const parent = atom.parent
			parent.value = number
			parent.deleteOptions(parent)
			parent.createOptions(parent)
			parent.updateColours(parent)

			if (parent.parent !== COLOURTODE_BASE_PARENT) {
				const square = parent.parent
				const channel = CHANNEL_IDS[parent.channelSlot]
				square.receiveNumber(square, number, channel)
			}
		},

		construct: (atom) => {

			if (atom.pityTop) {
				const topPity = createChild(atom, COLOURTODE_OPTION_PADDING)
				topPity.y = -topPity.height
			}

			if (atom.pityBottom) {
				const bottomPity = createChild(atom, COLOURTODE_OPTION_PADDING)
				bottomPity.y = atom.height
			}

			//TODO: add cursor pity on the sides too
		}
	}

	const CHANNEL_VARIABLES = [
		"red",
		"green",
		"blue",
	]

	const COLOURTODE_TALL_RECTANGLE = {
		draw: (atom) => {
			const {x, y} = getAtomPosition(atom)

			let size = atom.size
			//if (atom.isTool) size -= BORDER_THICKNESS*2.5

			const height = size
			const width = size
			
			const left = Math.round(x)
			let right = left + Math.round(width)
			if (atom.isTool) right = left + Math.round(width) - 1
			let top = Math.round(y)
			//if (atom.isTool) top += BORDER_THICKNESS*1.25
			let bottom = top + Math.round(height)
			if (atom.isTool) bottom = top + Math.round(height)-1
			const middleY = top + Math.round(height/2)
			const middleX = left + Math.round(width/2)

			colourTodeContext.fillStyle = atom.colour
			const path = new Path2D()

			path.moveTo(...[middleX, top].map(n => Math.round(n)))
			path.lineTo(...[right, middleY].map(n => Math.round(n)))
			path.lineTo(...[middleX, bottom].map(n => Math.round(n)))
			path.lineTo(...[left, middleY].map(n => Math.round(n)))

			path.closePath()
			colourTodeContext.fillStyle = atom.colour
			colourTodeContext.fill(path)
			if (atom.hasBorder) {
				colourTodeContext.lineWidth = BORDER_THICKNESS
				colourTodeContext.strokeStyle = atom.borderColour

				if (atom.isTool) {
					colourTodeContext.lineWidth = BORDER_THICKNESS*1.5
					colourTodeContext.strokeStyle = toolBorderColours[atom.colour.splash]
				}
				colourTodeContext.stroke(path)
			}
		},
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		width: COLOURTODE_PICKER_CHANNEL.height,
		height: COLOURTODE_PICKER_CHANNEL.width,
		hasBorder: true,
		isTallRectangle: true,
		size: CHANNEL_HEIGHT + OPTION_MARGIN/3*2,
		height: CHANNEL_HEIGHT + OPTION_MARGIN/3*2,
		width: CHANNEL_HEIGHT + OPTION_MARGIN/3*2,
		construct: (atom) => {
			atom.variable = CHANNEL_VARIABLES[Random.Uint8 % 3]
			atom.updateAppearance(atom)
			if (!atom.isTool) {
				atom.width += BORDER_THICKNESS/2
				atom.height += BORDER_THICKNESS/2
				atom.size += BORDER_THICKNESS/2
			}
		},
		updateAppearance: (atom) => {
			if (atom.variable === "red") {
				atom.colour = Colour.splash(900)
			} else if (atom.variable === "green") {
				atom.colour = Colour.splash(090)
			} else if (atom.variable === "blue") {
				atom.colour = Colour.splash(009)
			}

			atom.borderColour = borderColours[atom.colour.splash]
		},
		expanded: false,
		click: (atom) => {
			if (!atom.expanded) {
				atom.expand(atom)
			} else {
				atom.unexpand(atom)
			}
		},
		expand: (atom) => {
			atom.expanded = true
			
			atom.handleRight = createChild(atom, SYMMETRY_HANDLE)
			atom.handleRight.y = atom.height/2 - atom.handleRight.height/2
			atom.handleRight.x = atom.width/2
			atom.handleRight.width *= 2

			atom.padRight = createChild(atom, SYMMETRY_PAD)
			atom.padRight.height = COLOURTODE_PICKER_PAD.height
			atom.padRight.width = OPTION_MARGIN + (atom.width+OPTION_MARGIN)*3
			atom.padRight.y = atom.height/2 - atom.padRight.height/2
			atom.padRight.x = atom.width + OPTION_MARGIN

		},
		unexpand: (atom) => {
			atom.expanded = false
		}
	}
	
	const COLOURTODE_OPTION_PADDING = {
		draw: () => {},
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		grab: (atom) => atom.parent.parent,
		touch: (atom) => atom.parent,
		colour: Colour.Grey,
		width: COLOURTODE_SQUARE.size,
		height: OPTION_SPACING - CHANNEL_HEIGHT,
		y: 0,
		x: 0,
		//dragOnly: true,
	}

	paddles = []

	const PADDLE_MARGIN = COLOURTODE_SQUARE.size/2
	const PADDLE = {
		stayAtBack: true,
		attached: true,
		isPaddle: true,
		behindChildren: true,
		draw: COLOURTODE_RECTANGLE.draw,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		colour: Colour.Grey,
		size: COLOURTODE_SQUARE.size + OPTION_MARGIN*4, //for legacy
		width: COLOURTODE_SQUARE.size + OPTION_MARGIN*4,
		height: COLOURTODE_SQUARE.size + OPTION_MARGIN*4,
		dragOnly: true,
		dragLockY: true,
		scroll: 0,
		x: Math.round(PADDLE_MARGIN), //needed for handle creation
		y: COLOURTODE_SQUARE.size + OPTION_MARGIN + PADDLE_MARGIN,
		construct: (paddle) => {

			paddle.cellAtoms = []
			paddle.slots = []

			const handle = createChild(paddle, PADDLE_HANDLE)
			paddle.handle = handle
			paddle.setLimits(paddle)
			paddle.x = paddle.minX
			paddle.expanded = false

			paddle.pinhole = createChild(handle, PIN_HOLE)

			updatePaddleSize(paddle)


		},

		setLimits: (paddle) => {
			paddle.maxX = paddle.handle.width
			paddle.minX = paddle.handle.width - paddle.width
		},

		drop: (paddle) => {

			const distanceFromMax = paddle.maxX - paddle.x
			const distanceFromMin = paddle.x - paddle.minX

			if (distanceFromMax < distanceFromMin) {
				paddle.x = paddle.maxX
				paddle.expanded = true
				updatePaddleRule(paddle)

				if (paddles.last === paddle) {
					createPaddle()
				}

			} else {
				paddle.x = paddle.minX
				paddle.expanded = false
				updatePaddleRule(paddle)

				if (paddles.last !== paddle) {
					deletePaddle(paddle)
				}
			}
			paddle.dx = 0
		},

		drag: (paddle) => {
			if (paddle.pinhole.locked) {
				alert("I haven't coded this feature yet.")
				return paddle
			}
			return paddle
		}
	}

	const fillPoints = (colour, points) => {
		
		const path = new Path2D()
		const [head, ...tail] = points
		path.moveTo(...head.map(n => Math.round(n)))
		for (const point of tail) {
			path.lineTo(...point.map(n => Math.round(n)))
		}
		path.closePath()

		colourTodeContext.fillStyle = colour
		colourTodeContext.fill(path)
	}

	const SLOT = {
		isSlot: true,
		behindChildren: true,
		//hasBorder: true,
		//borderColour: Colour.Silver,
		draw: (atom) => {
			//atom.colour = borderColours[atom.cellAtom.colour.splash]
			COLOURTODE_RECTANGLE.draw(atom)
			
			const [x, y] = getAtomPosition(atom)

			const left = x
			const right = x + atom.width
			const top = y
			const bottom = y + atom.height

			/*const swidth = atom.width/10
			const sheight = atom.height/10

			const stripes = [
				[
					[left, top],
					[left + swidth*1, top],
					[left, top + sheight*1],
				],
				[
					[left + swidth*4, top],
					[left + swidth*6, top],
					[left, top + swidth*6],
					[left, top + swidth*4],
				],
				[
					[left + swidth*9, top],
					[right, top],
					[right, top + sheight],
					[left + swidth, bottom],
					[left, bottom],
					[left, top + swidth*9],
				],
				[
					[left + swidth*9, bottom],
					[right, top + sheight * 9],
					[right, bottom],
				],
				[
					[left + swidth*4, bottom],
					[left + swidth*6, bottom],
					[right, top + sheight * 6],
					[right, top + sheight * 4],
				],
			]

			for (const stripe of stripes) {
				fillPoints(Colour.Black, stripe)
			}*/

			colourTodeContext.fillStyle = Colour.Black
			/*colourTodeContext.beginPath()
			colourTodeContext.arc(x + atom.width/2, y+atom.height/2, atom.width / 5, 0, 2*Math.PI)
			colourTodeContext.fill()*/

			const w = atom.width/3
			const h = atom.width/3
			const X = x + atom.width/2 - w/2
			const Y = y + atom.height/2 - h/2
			colourTodeContext.fillRect(...[X, Y, w, h].map(n => Math.round(n)))

		},
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		colour: Colour.Grey,
		size: COLOURTODE_SQUARE.size,
		grab: (atom) => atom.parent,
		dragOnly: true,
	}

	const updatePaddleSize = (paddle) => {
		
		let width = PADDLE.width
		let height = PADDLE.size

		if (paddle.cellAtoms.length > 0) {
			let top = Infinity
			let bottom = -Infinity
			let right = -Infinity
			let left = Infinity

			for (const cellAtom of paddle.cellAtoms) {
				const cx = cellAtom.x
				const cy = cellAtom.y
				const cleft = cx
				const cright = cx + cellAtom.width
				const ctop = cy
				const cbottom = cy + cellAtom.height

				if (cleft < left) left = cleft
				if (cright > right) right = cright
				if (ctop < top) top = ctop
				if (cbottom > bottom) bottom = cbottom
			}

			let topOffset = 0
			let leftOffset = 0

			const yPadding = (PADDLE.height/2 - COLOURTODE_SQUARE.size/2)
			const xPadding = (PADDLE.width/2 - COLOURTODE_SQUARE.size/2)

			const desiredTop = yPadding
			const desiredLeft = xPadding

			if (top !== desiredTop) {
				topOffset = desiredTop - top
				bottom += topOffset
			}
			if (left !== desiredLeft) {
				leftOffset = desiredLeft - left
				right += leftOffset
			}

			for (const cellAtom of paddle.cellAtoms) {
				cellAtom.y += topOffset
				cellAtom.x += leftOffset
			}

			const desiredWidth = right + xPadding
			const desiredHeight = bottom + yPadding

			width = desiredWidth
			height = desiredHeight

		}

		if (paddle.rightTriangle !== undefined) {
			paddle.rightTriangle.x = width
			paddle.rightTriangle.y = height/2 - paddle.rightTriangle.height/2
			width = width+width + paddle.rightTriangle.width
		}
		
		if (paddle.hasSymmetry) {
			width += SYMMETRY_CIRCLE.size/3
		}

		paddle.width = width
		paddle.height = height
		paddle.setLimits(paddle)

		//=============================//
		// ARRANGING PADDLE's CHILDREN //
		//=============================//
		
		for (const slot of paddle.slots) {
			deleteChild(paddle, slot)
		}
		paddle.slots = []

		if (paddle.rightTriangle !== undefined) {
			for (const cellAtom of paddle.cellAtoms) {

				const slot = createChild(paddle, SLOT, {bottom: true})
				cellAtom.slot = slot
				paddle.slots.push(slot)
				slot.x = cellAtom.x + paddle.rightTriangle.x + paddle.rightTriangle.width
				slot.y = cellAtom.y
				slot.cellAtom = cellAtom

				if (cellAtom.slotted !== undefined) {
					cellAtom.slotted.x = cellAtom.x + paddle.rightTriangle.x + paddle.rightTriangle.width
					cellAtom.slotted.y = cellAtom.y
				}
				
			}
		}

		if (paddle.symmetryCircle !== undefined) {
			paddle.symmetryCircle.x = paddle.width - paddle.symmetryCircle.width/2
			paddle.symmetryCircle.y = paddle.height/2 - paddle.symmetryCircle.height/2
		}
		
		paddle.handle.y = paddle.height/2 - paddle.handle.height/2

		updatePaddleRule(paddle)
		positionPaddles()
	}

	const isDragonArraySingleColour = (array) => {
		const splashes = getSplashesSetFromArray(array)
		return splashes.size === 1
	}

	const isDragonArrayEqual = (a, b) => {
		const asplashes = getSplashesArrayFromArray(a)
		const bsplashes = getSplashesArrayFromArray(b)

		for (const asplash of asplashes) {
			const id = bsplashes.indexOf(asplash)
			if (id === -1) return false
			bsplashes.splice(id, 1)
		}

		if (bsplashes.length > 0) return false

		return true

	}

	const applyRangeStamp = (stampeds, value) => {
		const isSingle = isDragonArraySingleColour(value)
		if (!isSingle) {
			let newStamp = undefined
			for (let i = 0; i < stampeds.length; i++) {
				const stamped = stampeds[i]
				if (isDragonArrayEqual(stamped, value)) {
					newStamp = i
					break
				}
			}
			if (newStamp === undefined) {
				newStamp = stampeds.length
				stampeds.push(value)
			}
			value.stamp = newStamp.toString()
		}
	}

	const updatePaddleRule = (paddle) => {

		if (!paddle.expanded) return

		let transformations = DRAGON_TRANSFORMATIONS.NONE
		if (paddle.hasSymmetry) {
			const [x, y, r] = getXYR(paddle.symmetryCircle.value)

			const isX = x > 0
			const isY = y > 0
			const isR = r > 0

			let key = `${isY? "X" : ""}${isX? "Y" : ""}${isR? "R" : ""}`
			if (key === "") key = "NONE"
			else if (key === "XR" || key === "YR") key = "XYR"

			transformations = DRAGON_TRANSFORMATIONS[key]
		}

		const origin = paddle.cellAtoms[0]
		const left = []
		const right = []
		const stampeds = []
		for (const cellAtom of paddle.cellAtoms) {
			const x = (cellAtom.x - origin.x) / cellAtom.width
			const y = (cellAtom.y - origin.y) / cellAtom.height

			applyRangeStamp(stampeds, cellAtom.value)
			const diagramCell = makeDiagramCell({x, y, content: cellAtom.value})
			left.push(diagramCell)

			const rightContent = cellAtom.slotted === undefined? cellAtom.value : cellAtom.slotted.value
			applyRangeStamp(stampeds, rightContent)
			const rightDiagramCell = makeDiagramCell({x, y, content: rightContent})
			right.push(rightDiagramCell)
		}
		
		const diagram = makeDiagram({left, right})

		const locked = paddle.pinhole.locked
		const rule = makeRule({steps: [diagram], transformations, locked})
		paddle.rule = rule
		if (paddle.registry !== undefined) {
			unregisterRegistry(paddle.registry)
		}
		if (locked && paddle.rightTriangle !== undefined) paddle.registry = registerRule(rule)
	}

	const positionPaddles = () => {

		if (paddles.length > 1) {
			unlockMenuTool("triangle")
		}

		let previous = undefined
		for (const paddle of paddles) {
			if (previous === undefined) {
				paddle.y = PADDLE.y + PADDLE.scroll
				previous = paddle
				continue
			}

			paddle.y = previous.y + previous.height + PADDLE_MARGIN
			previous = paddle
			//bringAtomToBack(paddle) //causes bug where circle tool disappears but really shouldn't :(
		}
	}

	const deletePaddle = (paddle, id = paddles.indexOf(paddle)) => {
		paddles.splice(id, 1)
		if (paddle.registry !== undefined) {
			unregisterRegistry(paddle.registry)
		}
		deleteAtom(paddle)
		positionPaddles()
	}

	const createPaddle = () => {
		const paddle = makeAtom(PADDLE)
		
		paddles.push(paddle)
		positionPaddles()

		registerAtom(paddle)
	}

	const PADDLE_HANDLE = {
		attached: true,
		behindChildren: true,
		draw: COLOURTODE_RECTANGLE.draw,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		colour: Colour.Grey,
		size: PADDLE.x,
		x: -PADDLE.x,
		y: PADDLE.size/2 - PADDLE.x/2,
		touch: (atom) => atom.parent.pinhole,
		grab: (atom) => {
			//if (atom.parent.pinhole.locked) return 
			return atom.parent.pinhole
		},
	}

	const CIRCLE = {
		draw: (atom) => {
			const {x, y} = getAtomPosition(atom)

			const X = x + atom.width/2
			const Y = y + atom.height/2
			let R = (atom.width/2)

			if (atom.hasBorder) {
				if (atom.isTool) {
					atom.borderColour = toolBorderColours[atom.colour.splash]
				}
				colourTodeContext.fillStyle = atom.borderColour !== undefined? atom.borderColour : Colour.Void
				colourTodeContext.beginPath()
				colourTodeContext.arc(X, Y, R, 0, 2*Math.PI)
				colourTodeContext.fill()
				let borderScale = atom.borderScale !== undefined? atom.borderScale : 1.0
				R = (atom.width/2 - BORDER_THICKNESS*1.5 * borderScale)
			}

			colourTodeContext.fillStyle = atom.colour
			colourTodeContext.beginPath()
			colourTodeContext.arc(X, Y, R, 0, 2*Math.PI)
			colourTodeContext.fill()

		},
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		
	}

	const PIN_HOLE = {
		attached: true,
		locked: false,
		borderScale: 1/2,
		borderColour: Colour.Black,
		draw: (atom) => {
			if (atom.locked) {
				atom.hasBorder = true
				atom.colour = Colour.Grey				
			}
			else {
				atom.hasBorder = false
				atom.colour = Colour.Black
			}
			CIRCLE.draw(atom)
		},
		overlaps: CIRCLE.overlaps,
		offscreen: CIRCLE.offscreen,
		colour: Colour.Black,
		size: PADDLE_HANDLE.size - OPTION_MARGIN/2,
		y: OPTION_MARGIN/2/2,
		x: OPTION_MARGIN/2/2,
		click: (atom) => {
			const handle = atom.parent
			const paddle = handle.parent
			if (atom.locked) {
				atom.locked = false
				paddle.grabbable = true
				//handle.grabbable = true
				handle.draggable = true
				paddle.draggable = true
				atom.draggable = true
				//paddle.dragOnly = true
				updatePaddleRule(paddle)
			} 

			else {
				atom.locked = true
				//paddle.grabbable = false
				//handle.grabbable = false
				handle.draggable = false
				//paddle.draggable = false
				atom.draggable = false

				for (const cellAtom of paddle.cellAtoms) {
					if (cellAtom.expanded) {
						cellAtom.unexpand(cellAtom)
					}
					if (cellAtom.slotted !== undefined) {
						const slotted = cellAtom.slotted
						if (slotted.expanded) {
							slotted.unexpand(slotted)
						}
					}
					if (cellAtom.joins.length > 0 && cellAtom.joinExpanded) {
						cellAtom.joinUnepxand(cellAtom)
					}
				}

				/*if (paddle.hasSymmetry) {
					if (paddle.symmetryCircle.expanded) {
						paddle.symmetryCircle.unexpand(paddle.symmetryCircle)
					}
				}*/

				if (paddle.cellAtoms.length === 0) {
					paddle.grabbable = false
					paddle.draggable = false
				}
				//paddle.dragOnly = false
				updatePaddleRule(paddle)
			}
		},
		grab: (atom) => atom.parent.parent,
	}

	const SYMMETRY_TOGGLINGS = new Map()
	SYMMETRY_TOGGLINGS.set(000, DRAGON_TRANSFORMATIONS.NONE)
	SYMMETRY_TOGGLINGS.set(100, DRAGON_TRANSFORMATIONS.X)
	SYMMETRY_TOGGLINGS.set(010, DRAGON_TRANSFORMATIONS.Y)
	SYMMETRY_TOGGLINGS.set(110, DRAGON_TRANSFORMATIONS.XY)
	SYMMETRY_TOGGLINGS.set(001, DRAGON_TRANSFORMATIONS.R)
	SYMMETRY_TOGGLINGS.set(111, DRAGON_TRANSFORMATIONS.XYR)
	SYMMETRY_TOGGLINGS.set(101, DRAGON_TRANSFORMATIONS.XYR)
	SYMMETRY_TOGGLINGS.set(011, DRAGON_TRANSFORMATIONS.XYR)

	const getXYR = getRGB

	const SYMMETRY_CIRCLE = {
		hasBorder: true,
		draw: (atom) => {
			CIRCLE.draw(atom)
			if (atom.value === undefined) return
			const [x, y, r] = getXYR(atom.value)
			if (x > 0) SYMMETRY_TOGGLE_X.drawX(atom)
			if (y > 0) SYMMETRY_TOGGLE_Y.drawY(atom)
			if (r > 0) SYMMETRY_TOGGLE_R.drawR(atom)
		},
		offscreen: CIRCLE.offscreen,
		overlaps: CIRCLE.overlaps,
		//behindChildren: true,
		expanded: false,
		borderColour: Colour.Grey,
		colour: Colour.Black,
		value: 000,
		click: (atom) => {
			
			if (atom.expanded) {
				atom.unexpand(atom)
			}

			else {

				atom.expand(atom)
			}
		},

		expand: (atom) => {
			atom.pad = createChild(atom, SYMMETRY_PAD)
			atom.handle = createChild(atom, SYMMETRY_HANDLE)
			atom.handle.width += OPTION_MARGIN
			atom.expanded = true

			const [x, y, r] = getXYR(atom.value)
			atom.xToggle = createChild(atom, SYMMETRY_TOGGLE_X)
			atom.yToggle = createChild(atom, SYMMETRY_TOGGLE_Y)
			atom.rToggle = createChild(atom, SYMMETRY_TOGGLE_R)

			if (x > 0) atom.xToggle.value = true
			if (y > 0) atom.yToggle.value = true
			if (r > 0) atom.rToggle.value = true
		},

		unexpand: (atom) => {
			deleteChild(atom, atom.pad)
			deleteChild(atom, atom.handle)
			deleteChild(atom, atom.xToggle)
			deleteChild(atom, atom.yToggle)
			deleteChild(atom, atom.rToggle)
			atom.expanded = false
		},
		
		size: COLOURTODE_SQUARE.size,
		update: (atom) => {
			
			const {x, y} = getAtomPosition(atom)

			const id = state.colourTode.atoms.indexOf(atom)
			const left = x
			const top = y
			const right = x + atom.width
			const bottom = y + atom.height

			if (hand.content === atom) for (const paddle of paddles) {
				const pid = state.colourTode.atoms.indexOf(paddle)
				const {x: px, y: py} = getAtomPosition(paddle)
				const pright = px + paddle.width
				const ptop = py
				const pbottom = py + paddle.height

				//if (paddle.pinhole.locked) continue

				if (!paddle.hasSymmetry && paddle.expanded && id > pid && left <= pright && right >= pright && ((top < pbottom && top > ptop) || (bottom > ptop && bottom < pbottom))) {
					if (atom.highlightPaddle !== undefined) {
						deleteChild(atom, atom.highlightPaddle)
					}

					atom.highlightPaddle = createChild(atom, HIGHLIGHT, {bottom: true})
					atom.highlightPaddle.width = HIGHLIGHT_THICKNESS
					atom.highlightPaddle.height = paddle.height
					atom.highlightPaddle.y = ptop
					atom.highlightPaddle.x = pright - HIGHLIGHT_THICKNESS/2
					atom.highlightedPaddle = paddle
					return
				}

			}

			if (atom.highlightPaddle !== undefined) {
				deleteChild(atom, atom.highlightPaddle)
				atom.highlightPaddle = undefined
				atom.highlightedPaddle = undefined
			}
		},
		drop: (atom) => {

			if (!atom.attached) {
				if (atom.highlightedPaddle !== undefined) {
					const paddle = atom.highlightedPaddle
					atom.attached = true
					giveChild(paddle, atom)
					
					paddle.hasSymmetry = true
					paddle.symmetryCircle = atom
					updatePaddleSize(paddle)
					
					atom.x = paddle.width -atom.width/2
					atom.y = paddle.height/2 - atom.height/2
					atom.dx = 0
					atom.dy = 0

					/*if (paddle.pinhole.locked && atom.expanded) {
						atom.unexpand(atom)
					}*/

				}
			}
			
		},

		drag: (atom) => {

			if (atom.attached) {
				const paddle = atom.parent

				/*if (paddle.pinhole.locked) {
					const clone = makeAtom(SYMMETRY_CIRCLE)
					clone.value = atom.value
					const {x, y} = getAtomPosition(atom)
					hand.offset.x -= atom.x - x
					hand.offset.y -= atom.y - y
					clone.x = x
					clone.y = y
					registerAtom(clone)
					return clone
				}*/

				atom.attached = false
				freeChild(paddle, atom)
				paddle.hasSymmetry = false
				paddle.symmetryCircle = undefined
				updatePaddleSize(paddle)
			}

			return atom
		},
	}

	const HIGHLIGHT_THICKNESS = BORDER_THICKNESS
	const HIGHLIGHT = {
		draw: COLOURTODE_RECTANGLE.draw,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		draggable: false,
		grabbable: false,
		justVisual: true,
		colour: Colour.splash(999),
		borderColour: Colour.splash(999),
		hasAbsolutePosition: true,
		hasInner: false,
	}

	const TRIANGLE_PAD = {
		draw: COLOURTODE_RECTANGLE.draw,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		dragOnly: true,
		width: SYMMETRY_CIRCLE.size,
		x: SYMMETRY_CIRCLE.size*Math.sqrt(3)/2 + OPTION_MARGIN,
		height: (SYMMETRY_CIRCLE.size * 3) - OPTION_MARGIN,
		y: -(SYMMETRY_CIRCLE.size * 3)/3 + OPTION_MARGIN/2,
		colour: Colour.Grey,
		grab: (atom) => atom.parent,
	}

	const TRIANGLE_HANDLE = {
		draw: COLOURTODE_RECTANGLE.draw,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		dragOnly: true,
		width: SYMMETRY_CIRCLE.size/2 + OPTION_MARGIN,
		x: SYMMETRY_CIRCLE.size/2,
		height: SYMMETRY_CIRCLE.size / 3,
		y: SYMMETRY_CIRCLE.size/2 - (SYMMETRY_CIRCLE.size / 3)/2,
		colour: Colour.Grey,
		grab: (atom) => atom.parent,
	}

	const SYMMETRY_PAD = {
		draw: COLOURTODE_RECTANGLE.draw,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		dragOnly: true,
		width: SYMMETRY_CIRCLE.size,
		x: SYMMETRY_CIRCLE.size + OPTION_MARGIN,
		height: (SYMMETRY_CIRCLE.size * 3) - OPTION_MARGIN,
		y: -(SYMMETRY_CIRCLE.size * 3)/3 + OPTION_MARGIN/2,
		colour: Colour.Grey,
		grab: (atom) => atom.parent,
	}

	const SYMMETRY_HANDLE = {
		draw: COLOURTODE_RECTANGLE.draw,
		offscreen: COLOURTODE_RECTANGLE.offscreen,
		overlaps: COLOURTODE_RECTANGLE.overlaps,
		dragOnly: true,
		width: SYMMETRY_CIRCLE.size/2,
		x: SYMMETRY_CIRCLE.size/2 + SYMMETRY_CIRCLE.size/4,
		height: SYMMETRY_CIRCLE.size / 3,
		y: SYMMETRY_CIRCLE.size/2 - (SYMMETRY_CIRCLE.size / 3)/2,
		colour: Colour.Grey,
		grab: (atom) => atom.parent,
	}

	const TRIANGLE_PICK_UP = {
		hasBorder: true,
		borderColour: Colour.Black,
		draw: (atom) => {
			atom.colour = atom.value? Colour.Silver : Colour.Black
			TRIANGLE_UP.draw(atom)
		},
		click: (atom) => {
			
			const triangle = atom.parent
			triangle.upPick.value = false
			triangle.rightPick.value = false
			triangle.downPick.value = false
			
			triangle.direction = "up"
			atom.value = true

		},
		offscreen: TRIANGLE_UP.offscreen,
		overlaps: TRIANGLE_UP.overlaps,
		
		value: false,
		size: COLOURTODE_SQUARE.size - OPTION_MARGIN*1.5,
		grab: (atom) => atom.parent,
		x: TRIANGLE_PAD.x + TRIANGLE_PAD.width/2 - (COLOURTODE_SQUARE.size - OPTION_MARGIN*1.5)/2,
		y: TRIANGLE_PAD.y + OPTION_MARGIN*1.5/2,
	}

	const TRIANGLE_PICK_RIGHT = {
		hasBorder: true,
		borderColour: Colour.Black,
		draw: (atom) => {
			atom.colour = atom.value? Colour.Silver : Colour.Black
			TRIANGLE_RIGHT.draw(atom)
		},
		offscreen: TRIANGLE_RIGHT.offscreen,
		overlaps: TRIANGLE_RIGHT.overlaps,
		
		value: false,
		size: COLOURTODE_SQUARE.size - OPTION_MARGIN*1.5,
		grab: (atom) => atom.parent,
		click: (atom) => {
			
			const triangle = atom.parent
			triangle.upPick.value = false
			triangle.rightPick.value = false
			triangle.downPick.value = false
			
			triangle.direction = "right"
			atom.value = true

		},
		x: TRIANGLE_PAD.x + TRIANGLE_PAD.width/2 - ((COLOURTODE_SQUARE.size - OPTION_MARGIN*1.5) * Math.sqrt(3)/2)/2,
		y: OPTION_MARGIN*1.5/2,
	}

	const TRIANGLE_PICK_DOWN = {
		hasBorder: true,
		borderColour: Colour.Black,
		draw: (atom) => {
			atom.colour = atom.value? Colour.Silver : Colour.Black
			TRIANGLE_DOWN.draw(atom)
		},
		click: (atom) => {
			
			const triangle = atom.parent
			triangle.upPick.value = false
			triangle.rightPick.value = false
			triangle.downPick.value = false
			
			triangle.direction = "down"
			atom.value = true

		},
		offscreen: TRIANGLE_DOWN.offscreen,
		overlaps: TRIANGLE_DOWN.overlaps,
		
		value: false,
		size: COLOURTODE_SQUARE.size - OPTION_MARGIN*1.5,
		grab: (atom) => atom.parent,
		x: TRIANGLE_PAD.x + TRIANGLE_PAD.width/2 - (COLOURTODE_SQUARE.size - OPTION_MARGIN*1.5)/2,
		y: TRIANGLE_PAD.y + TRIANGLE_PAD.height - (COLOURTODE_SQUARE.size - OPTION_MARGIN*1.5) - OPTION_MARGIN/2,
	}
	
	const SYMMETRY_TOGGLE_X = {
		hasBorder: true,
		borderColour: Colour.Black,
		colour: Colour.Grey,
		draw: (atom) => {
			atom.colour = atom.value? Colour.Silver : Colour.Grey
			CIRCLE.draw(atom)
			atom.drawX(atom)
		},
		drawX: (atom) => {
			const {x, y} = getAtomPosition(atom)

			const W = (atom.size)
			const H = (BORDER_THICKNESS*1.0)
			const X = (x)
			const Y = (y + atom.size/2 - BORDER_THICKNESS*1.0/2)

			colourTodeContext.fillStyle = atom.borderColour
			colourTodeContext.fillRect(X, Y, W, H)
		},
		offscreen: CIRCLE.offscreen,
		overlaps: CIRCLE.overlaps,
		expanded: false,
		click: (atom) => {
			atom.value = !atom.value
			let [x, y, r] = getXYR(atom.parent.value)
			x = atom.value? 100 : 0
			atom.parent.value = x+y+r
			const circle = atom.parent
			if (circle.parent !== COLOURTODE_BASE_PARENT) {
				const paddle = circle.parent
				updatePaddleRule(paddle)
			}
		},
		value: false,
		size: COLOURTODE_SQUARE.size - OPTION_MARGIN,
		grab: (atom) => atom.parent,
		x: SYMMETRY_PAD.x + SYMMETRY_PAD.width/2 - (COLOURTODE_SQUARE.size - OPTION_MARGIN)/2,
		y: SYMMETRY_PAD.y + OPTION_MARGIN/2,
	}
	
	const SYMMETRY_TOGGLE_Y = {
		hasBorder: true,
		borderColour: Colour.Black,
		colour: Colour.Grey,
		draw: (atom) => {
			atom.colour = atom.value? Colour.Silver : Colour.Grey
			CIRCLE.draw(atom)
			atom.drawY(atom)
		},
		drawY: (atom) => {
			const {x, y} = getAtomPosition(atom)

			const W = (BORDER_THICKNESS*1.0)
			const H = (atom.size)
			const X = (x + atom.size/2 - BORDER_THICKNESS*1.0/2)
			const Y = (y)

			colourTodeContext.fillStyle = atom.borderColour
			colourTodeContext.fillRect(X, Y, W, H)
		},
		offscreen: CIRCLE.offscreen,
		overlaps: CIRCLE.overlaps,
		expanded: false,
		click: (atom) => {
			atom.value = !atom.value
			let [x, y, r] = getXYR(atom.parent.value)
			y = atom.value? 10 : 0
			atom.parent.value = x+y+r
			const circle = atom.parent
			if (circle.parent !== COLOURTODE_BASE_PARENT) {
				const paddle = circle.parent
				updatePaddleRule(paddle)
			}
		},
		value: false,
		size: COLOURTODE_SQUARE.size - OPTION_MARGIN,
		grab: (atom) => atom.parent,
		x: SYMMETRY_PAD.x + SYMMETRY_PAD.width/2 - (COLOURTODE_SQUARE.size - OPTION_MARGIN)/2,
		y: OPTION_MARGIN/2,
	}
	
	const SYMMETRY_TOGGLE_R = {
		hasBorder: true,
		borderColour: Colour.Black,
		colour: Colour.Grey,
		draw: (atom) => {
			atom.colour = atom.value? Colour.Silver : Colour.Grey
			CIRCLE.draw(atom)
			atom.drawR(atom)
		},
		drawR: (atom) => {
			const {x, y} = getAtomPosition(atom)

			let X = (x + atom.size/2)
			let Y = (y + atom.size/2)
			let R = atom.size/2 - (BORDER_THICKNESS*1.5)*2

			colourTodeContext.fillStyle = atom.borderColour
			colourTodeContext.beginPath()
			colourTodeContext.arc(X, Y, R, 0, 2*Math.PI)
			colourTodeContext.fill()
			
			R -= BORDER_THICKNESS
			colourTodeContext.fillStyle = atom.colour
			colourTodeContext.beginPath()
			colourTodeContext.arc(X, Y, R, 0, 2*Math.PI)
			colourTodeContext.fill()
		},
		offscreen: CIRCLE.offscreen,
		overlaps: CIRCLE.overlaps,
		expanded: false,
		click: (atom) => {
			atom.value = !atom.value
			let [x, y, r] = getXYR(atom.parent.value)
			r = atom.value? 1 : 0
			atom.parent.value = x+y+r
			const circle = atom.parent
			if (circle.parent !== COLOURTODE_BASE_PARENT) {
				const paddle = circle.parent
				updatePaddleRule(paddle)
			}
		},
		value: false,
		size: COLOURTODE_SQUARE.size - OPTION_MARGIN,
		grab: (atom) => atom.parent,
		x: SYMMETRY_PAD.x + SYMMETRY_PAD.width/2 - (COLOURTODE_SQUARE.size - OPTION_MARGIN)/2,
		y: SYMMETRY_PAD.y + SYMMETRY_PAD.height - (COLOURTODE_SQUARE.size - OPTION_MARGIN) - OPTION_MARGIN/2,
	}

	//====================//
	// COLOURTODE - TOOLS //
	//====================//
	let menuRight = 10

	const COLOURTODE_TOOL = {
		element: COLOURTODE_SQUARE,
		draw: (atom) => {
			atom.element.draw(atom)
		},
		overlaps: (atom, x, y) => atom.element.overlaps(atom, x, y),
		grab: (atom, x, y) => {
			return atom
		},
		drag: (atom) => {
			const newAtom = makeAtom({...atom.element, x: atom.x, y: atom.y})
			registerAtom(newAtom)

			if (newAtom.value !== undefined && newAtom.value.joins !== undefined) {
				for (const j of newAtom.value.joins) {
					const joinAtom = makeAtom(COLOURTODE_SQUARE)
					joinAtom.value = j
					newAtom.joins.push(joinAtom)
				}
			}
			
			if (newAtom.isSquare) {
				const diagramCell = makeDiagramCell({content: newAtom.value})
				state.brush.colour = makeDiagram({left: [diagramCell]})
			}

			return newAtom
		},
		cursor: () => "move",
	}

	const addMenuTool = (element, unlockName) => {
		const {width = COLOURTODE_SQUARE.size, height = COLOURTODE_SQUARE.size, size} = element
		
		let y = COLOURTODE_PICKER_PAD_MARGIN
		if (height < COLOURTODE_SQUARE.size) {
			y += (COLOURTODE_SQUARE.size - height)/2
		}
		y += BORDER_THICKNESS

		const atom = makeAtom({...COLOURTODE_TOOL, width, height, size, x: menuRight, y, element})
		atom.attached = true
		atom.isTool = true
		atom.previousBrushColour = undefined
		atom.colourId = 0
		atom.dcolourId = 1
		atom.colourTicker = Infinity
		atom.hasBorder = true
		menuRight += width
		menuRight += OPTION_MARGIN

		atom.draw = (a) => {
			if (a.unlocked) {
				element.draw(a)
			}
		}

		registerAtom(atom)

		if (unlockName === undefined) {
			atom.unlocked = true
		} else {
			atom.unlocked = false
			atom.grabbable = false
			unlocks[unlockName] = atom
			if (UNLOCK_MODE) unlockMenuTool(unlockName)
		}

		return atom
	}

	unlocks = {}
	const unlockMenuTool = (unlockName) => {
		const unlock = unlocks[unlockName]
		if (unlock.unlocked) return
		unlock.unlocked = true
		unlock.grabbable = true

		/*registerAtom(unlock)
		menuRight += unlock.width
		menuRight += OPTION_MARGIN*/

	}

	squareTool = addMenuTool(COLOURTODE_SQUARE)
	menuRight += BORDER_THICKNESS
	const triangleTool = addMenuTool(COLOURTODE_TRIANGLE, "triangle")
	//triangleTool.size -= BORDER_THICKNESS*1.5
	//triangleTool.y += BORDER_THICKNESS*1.5 / 2
	menuRight -= BORDER_THICKNESS
	const circleTool = addMenuTool(SYMMETRY_CIRCLE, "circle")
	const wideRectangleTool = addMenuTool(COLOURTODE_PICKER_CHANNEL, "wide_rectangle")
	//menuRight += BORDER_THICKNESS
	const tallRectangleTool = addMenuTool(COLOURTODE_TALL_RECTANGLE, "tall_rectangle")
	createPaddle()

	circleTool.borderScale = 1
	
	squareTool.update = (atom) => {

		if (atom.joinDrawId === undefined) {
			atom.joinDrawId = -1
			atom.joinDrawTimer = 0
		}

		if (typeof state.brush.colour === "number") {
			atom.value = makeArrayFromSplash(state.brush.colour)
			atom.joins = []
		} else {
			const content = state.brush.colour.left[0].content
			atom.value = cloneDragonArray(content)
			atom.joins = content.joins.map(j => ({value: j}))
			//atom.joins.map(j => getSplashesArrayFromArray(j.value)).d
		}

		atom.joinDrawTimer++
		if (atom.joinDrawTimer >= 45) {
			atom.joinDrawId++
			atom.toolbarNeedsColourUpdate = true
			atom.colourTicker = Infinity
			if (atom.joinDrawId >= atom.joins.length) {
				atom.joinDrawId = -1
			}
			atom.joinDrawTimer = 0
		}

		if (atom.previousBrushColour !== state.brush.colour || atom.toolbarNeedsColourUpdate) {
			atom.toolbarNeedsColourUpdate = false

			let drawTarget = atom.value
			if (atom.joins.length > 0) {
				if (atom.joinDrawId >= atom.joins.length) {
					atom.joinDrawId = 0
				}
				if (atom.joinDrawId >= 0) {
					drawTarget = atom.joins[atom.joinDrawId].value
				}
			}

			const valueClone = cloneDragonArray(drawTarget)
			valueClone.joins = []
			atom.colours = getSplashesArrayFromArray(valueClone)
			//atom.colourId = Random.Uint32 % atom.colours.length
			atom.colourTicker = Infinity
			atom.previousBrushColour = state.brush.colour
		}

		if (atom.colourTicker >= getColourCycleLength(atom)) {
			atom.colourTicker = 0

			atom.colourId += atom.dcolourId
			if (atom.colourId === atom.colours.length-1 || atom.colourId === 0) {
				atom.dcolourId *= -1
			}
			if (atom.colourId >= atom.colours.length) {
				atom.dcolourId = -1
				atom.colourId = atom.colours.length-1
			}
			if (atom.colourId < 0) {
				atom.dcolourId = 1
				atom.colourId = 0
			}
			atom.colour = Colour.splash(atom.colours[atom.colourId])
		}
		else atom.colourTicker++
	}

	triangleTool.update = squareTool.update
	circleTool.update = squareTool.update
	wideRectangleTool.update = squareTool.update
	tallRectangleTool.update = squareTool.update

	

})

const   Y_AXIS = 1,
        X_AXIS = 2,
        COLS = 4,
        ROWS = 4,
        GAME = new Game2048(ROWS, COLS)

let     canvas, 
        CENTER_POINT,
        SIZE,
        GUT,
        COLOR_1,
        COLOR_2

function setup() {
    // frameRate(5)
    COLOR_1 = color(53, 92, 125)
    COLOR_2 = color(192, 108, 132)

    canvas = createCanvas(windowWidth, windowHeight)
    canvas.style('display', 'block')

    CENTER_POINT = createVector(windowWidth / 2, windowHeight / 2)
    SIZE = 600
    GUT = 15
    GAME.set_sizes(SIZE, GUT)
}

function draw() {
    setGradient(0, 0, width, height, COLOR_1, COLOR_2, X_AXIS)

    translate(CENTER_POINT)
    rectMode(CENTER);

    // Table
    draw_table()

    // Game
    GAME.draw()
}

function draw_table() {
    noStroke()
    fill(200)
    rect(0, 0, SIZE + GUT, SIZE + GUT, 15)
    fill(150)
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            let x = (SIZE / (ROWS * 2)) * (2 * i - (ROWS - 1))
            let y = (SIZE / (COLS * 2)) * (2 * j - (COLS - 1))
            let w = SIZE / ROWS - GUT
            let h = SIZE / COLS - GUT
            rect(x, y, w, h, 15)
        }
    }
}

/* Events */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    CENTER_POINT.set(windowWidth / 2, windowHeight / 2)
    GAME.set_sizes(SIZE, GUT)
}

function keyPressed() {
    if (!GAME.isMoving) {
        if (keyIsDown(UP_ARROW))            GAME.move(UP_ARROW)
        else if (keyIsDown(RIGHT_ARROW))    GAME.move(RIGHT_ARROW)
        else if (keyIsDown(DOWN_ARROW))     GAME.move(DOWN_ARROW)
        else if (keyIsDown(LEFT_ARROW))     GAME.move(LEFT_ARROW)
    }
}
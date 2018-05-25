const FILL = {
    '2':    [252,241,222],
    '4':    [252,241,182],
    '8':    [242,205,159],
    '16':   [242,205,119],
    '32':   [226,176,111],
    '64':   [226,176,71],
    '128':  [233,150,59],
    '256':  [233,150,19],
    '512':  [244,208,88],
    '1024': [244,208,48],
    '2048': [244,88,88]
}, TEXT = {
    '2':    0,
    '4':    0,
    '8':    0,
    '16':   0,
    '32':   0,
    '64':   0,
    '128':  255,
    '256':  0,
    '512':  0,
    '1024': 0,
    '2048': 0
}

class Tile {
    constructor(value, i, j, w, h) {
        this.v = value
        this.i = i
        this.j = j
        this.w = w ? w : 0
        this.h = h ? h : 0
        this.combined = false
    }

    set_v(value) {
        this.v = value
    }

    get_v() {
        return this.v
    }

    set_size(w, h) {
        this.w = w
        this.h = h
    }

    draw(size, rows, cols) {
        if (this.v > 0) {
            let x = (size / (rows * 2)) * (2 * this.i - (rows - 1))
            let y = (size / (cols * 2)) * (2 * this.j - (cols - 1))

            noStroke()
            fill(FILL[this.v])
            rect(x, y, this.w, this.h, 15)

            textAlign(CENTER)
            textSize(this.h / 4)
            fill(TEXT[this.v])
            text(this.v, x, y + this.h / 10)
        }
    }
}

class Game2048 {
    constructor(rows, cols, size, gut) {
        this.rows = rows > 1 ? rows : 1
        this.cols = cols > 1 ? cols : 1
        this.size = size ? size : 0
        this.gut = gut ? gut : 0
        this.tiles = []

        for (let i = 0; i < this.rows; i++) {
            this.tiles[i] = []
            for (let j = 0; j < this.cols; j++) {
                let w = this.size / this.rows - this.gut
                let h = this.size / this.cols - this.gut

                this.tiles[i][j] = new Tile(0, i, j, w, h)
            }
        }
        this.make_turn()
        this.make_turn()

        this.isMoving = false
    }

    move(direction) {
        switch (direction) {
            case LEFT_ARROW:
                this.isMoving = true
                for (let k = 0; k < this.rows - 1; k++) {
                    for (let i = 0; i < this.rows - 1; i++) {
                        for (let j = 0; j < this.cols; j++) {
                            if (this.tiles[i][j].v == 0) {
                                this.tiles[i][j].v = this.tiles[i + 1][j].v
                                this.tiles[i + 1][j].v = 0
                                this.tiles[i + 1][j].combined = false
                            } else {
                                if (this.tiles[i][j].v == this.tiles[i + 1][j].v && !this.tiles[i][j].combined && !this.tiles[i + 1][j].combined) {
                                    this.tiles[i][j].v = this.tiles[i][j].v * 2
                                    this.tiles[i][j].combined = true
                                    this.tiles[i + 1][j].v = 0
                                }
                            }
                        }
                    }
                }
                for (let i = 0; i < this.rows; i++)
                    for (let j = 0; j < this.cols; j++)
                        this.tiles[i][j].combined = false
                this.isMoving = false
                break
            case DOWN_ARROW:
                this.isMoving = true
                for (let k = 0; k < this.rows - 1; k++) {
                    for (let i = this.rows - 1; i >= 0; i--) {
                        for (let j = this.cols - 1; j > 0; j--) {
                            if (this.tiles[i][j].v == 0) {
                                this.tiles[i][j].v = this.tiles[i][j - 1].v
                                this.tiles[i][j - 1].v = 0
                                this.tiles[i][j - 1].combined = false
                            } else {
                                if (this.tiles[i][j].v == this.tiles[i][j - 1].v && !this.tiles[i][j].combined && !this.tiles[i][j - 1].combined) {
                                    this.tiles[i][j].v = this.tiles[i][j].v * 2
                                    this.tiles[i][j].combined = true
                                    this.tiles[i][j - 1].v = 0
                                }
                            }
                        }
                    }
                }
                for (let i = 0; i < this.rows; i++)
                    for (let j = 0; j < this.cols; j++)
                        this.tiles[i][j].combined = false
                this.isMoving = false
                break
            case RIGHT_ARROW:
                this.isMoving = true
                for (let k = 0; k < this.rows - 1; k++) {
                    for (let i = this.rows - 1; i > 0; i--) {
                        for (let j = this.cols - 1; j >= 0; j--) {
                            if (this.tiles[i][j].v == 0) {
                                this.tiles[i][j].v = this.tiles[i - 1][j].v
                                this.tiles[i - 1][j].v = 0
                                this.tiles[i - 1][j].combined = false
                            } else {
                                if (this.tiles[i][j].v == this.tiles[i - 1][j].v && !this.tiles[i][j].combined && !this.tiles[i - 1][j].combined) {
                                    this.tiles[i][j].v = this.tiles[i][j].v * 2
                                    this.tiles[i][j].combined = true
                                    this.tiles[i - 1][j].v = 0
                                }
                            }
                        }
                    }
                }
                for (let i = 0; i < this.rows; i++)
                    for (let j = 0; j < this.cols; j++)
                        this.tiles[i][j].combined = false
                this.isMoving = false
                break
            case UP_ARROW:
                this.isMoving = true
                for (let k = 0; k < this.rows - 1; k++) {
                    for (let i = 0; i < this.rows; i++) {
                        for (let j = 0; j < this.cols - 1; j++) {
                            if (this.tiles[i][j].v == 0) {
                                this.tiles[i][j].v = this.tiles[i][j + 1].v
                                this.tiles[i][j + 1].v = 0
                                this.tiles[i][j + 1].combined = false
                            } else {
                                if (this.tiles[i][j].v == this.tiles[i][j + 1].v && !this.tiles[i][j].combined && !this.tiles[i][j + 1].combined) {
                                    this.tiles[i][j].v = this.tiles[i][j].v * 2
                                    this.tiles[i][j].combined = true
                                    this.tiles[i][j + 1].v = 0
                                }
                            }
                        }
                    }
                }
                for (let i = 0; i < this.rows; i++)
                    for (let j = 0; j < this.cols; j++)
                        this.tiles[i][j].combined = false
                this.isMoving = false
                break
            default:
                this.isMoving = false
                break
        }

        this.make_turn()
    }

    make_turn() {
        let empty = this.empty_tiles()
        if (empty) {
            let i = Math.floor(Math.random() * empty.length)
            let v = Math.random() > 0.35 ? 2 : 4
            this.tiles[empty[i][0]][empty[i][1]].v = v
        } else if (this.check_over()) {
            this.game_over()
        }
    }

    check_over() {
        for (let i = 0; i < this.rows - 1; i++)
            for (let j = 0; j < this.cols - 1; j++)
                if (this.tiles[i][j].v == this.tiles[i + 1][j] || this.tiles[i][j].v == this.tiles[i][j + 1])
                    return true
        return false
    }

    game_over() {
        alert("Game Over!")
    }

    set_sizes(size, gut) {
        this.size = size
        this.gut = gut
        let w = this.size / this.rows - this.gut
        let h = this.size / this.cols - this.gut
        for (let row of this.tiles) {
            for (let tile of row) {
                tile.set_size(w, h)
            }
        }
    }

    empty_tiles() {
        let t = []
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                if (this.tiles[i][j].v == 0)
                    t.push([i, j])

        if (t.length > 0)   return t
        else                return false
    }

    draw() {
        for (let row of this.tiles) for (let tile of row) tile.draw(this.size, this.rows, this.cols)
    }
}

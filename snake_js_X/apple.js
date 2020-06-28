class Apple {
    constructor(x, y) {
        this.widht = 1;
        this.x = x
        this.y = y
    }
    show() {
        noStroke()
        colorMode(RGB)
        fill(255, 0, 0)
        rect(this.x, this.y, this.widht, this.widht)
    }
}
class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(0, 0);
        this.xdir = 1;
        this.ydir = 0;
        this.widht = 1;
    }

    setDir(x, y) {
        this.xdir = x;
        this.ydir = y;
    }

    getDirStr() {
        if (this.xdir === 0) {
            if (this.ydir === 1) {
                return 'down'
            } else {
                return 'up'
            }
        } else {
            if (this.xdir === 1) {
                return 'right'
            } else {
                return 'left'
            }
        }
    }

    getHead() {
        return this.body[this.body.length - 1].copy()
    }

    eat(apple) {
        let x = this.getHead().x;
        let y = this.getHead().y;
        if (x === apple.x && y === apple.y) {
            this.grow();
            return true;
        }
        return false;
    }

    grow() {
        let head = this.getHead();
        this.body.push(head);
    }

    collisionSnake() {
        let head = this.getHead();
        for (let i = 0; i < this.body.length - 1; i++) {
            let part = this.body[i]
            if (part.x === head.x && part.y === head.y) {
                return true;
            }
        }
        return false;
    }

    collisionWall() {
        let x = this.getHead().x
        let y = this.getHead().y

        if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
            return true;
        }
        return false;
    }

    collision() {
        return (this.collisionWall() || this.collisionSnake());
    }
    update() {
        let head = this.getHead();
        this.body.shift();
        head.x += this.xdir;
        head.y += this.ydir;
        this.body.push(head);

    }

    show() {
        for (let i = 0; i < this.body.length; i++) {
            noStroke();
            colorMode(HSB);
            fill((100 + 20 * i) % 360, 100, 95)
            rect(this.body[i].x, this.body[i].y, this.widht, this.widht)
        }

    }


}
let snake;
let apple;
let pixleSize = 20;

function setup() {
  w = floor(640 / pixleSize);
  h = floor(480 / pixleSize);
  createCanvas(w * pixleSize, h * pixleSize);
  frameRate(10);
  snake = new Snake();
  apple = get_new_apple();
  score = 0;
}


function get_new_apple() {
  apple_location = get_random_location(w, h);
  return new Apple(apple_location[0], apple_location[1]);
}

function get_random_location(w, h) {
  return [floor(random(w)), floor(random(h))];
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      console.log('pressed', keyCode)

      snake.setDir(-1, 0);
      break;


    case RIGHT_ARROW:
      console.log('pressed', keyCode)

      snake.setDir(1, 0);
      break;


    case DOWN_ARROW:
      console.log('pressed', keyCode)


      snake.setDir(0, 1)
      break;

    case UP_ARROW:
      console.log('pressed', keyCode)

      snake.setDir(0, -1)
      break;

    default:
      console.log('pressed', keyCode)
      break;
  }
}

function draw() {
  scale(pixleSize)
  colorMode(RGB)
  background(0);
  if (snake.eat(apple)) {
    apple = get_new_apple()
    score += 1
    print(score)
  };
  snake.update();
  snake.show();
  apple.show();
  fill(255);
  textSize(1);
  text('Score: ' + score, w - 6, 3)

  if (snake.collision()) {
    textSize(3)
    alert('Game Over', 7, 11);
    //text('Game Over', 7, 11)
    window.location = "";
    noLoop()
  }
}
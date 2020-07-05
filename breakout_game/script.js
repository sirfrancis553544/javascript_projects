const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");

// 1. Create canvas context
const ctx = canvas.getContext("2d");

// set score variable
let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;

// create ball props
const ball = {
  // positioning of the ball in the middle
  x: canvas.width / 2,
  y: canvas.height / 2,
  // ball size
  size: 10,
  speed: 4,
  // dx moves the ball up on the axix
  dx: 4,
  // dy negative moves the ball down
  dy: -4,
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// create bricks properties
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  // to prevent bricks from being on top of each other
  offsetX: 45,
  offsetY: 60,
  // need to set visability after being hit when a ball its it its fale
  visible: true,
};

// create bricks, array with column n bricks
// loop ?# rows as lng as i < rowcount incroment by
// array for each row set that to what ever the bricks are
// loop through column count and incroment by 1
// create x and y value
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// draw paddle
function drawPaddle() {
  ctx.beginPath();
  //   rectangle
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  // negative 100 places it on the x axes and 30 on the y
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// draw bricks on vancas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}
// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // console.log(ball.x, ball.y);

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  // Hit bottom wall - Lose
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}
// Increase score
function increaseScore() {
  score++;

  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();
  }
}

// Make all bricks appear
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

// call function
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}
//move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}
// update canvas
function update() {
  movePaddle();
  moveBall();
  // draw everything
  draw();
  requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

// Keyup event
function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}
// keyboard event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// rules and close event handler
rulesBtn.addEventListener("click", () => rules.classList.add("show"));
// close rule sidebar
closeBtn.addEventListener("click", () => rules.classList.remove("show"));

// 1. Create canvas context
// 2. Create and draw ball
// 3. Create and draw paddle
// 4. Create bricks
// 5. Draw score
// 6. Add update() - Animate - requestAnimationFrame(cb)
// 7. Move paddle
// 8. Keyboard event handlers to move paddle
// 9. Move ball
// 10. Add wall bounderies
// 11. Increase score when bricks break
// 12. Lose - redraw bricks, reset score

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const speedLevelEl = document.getElementById("speed-level");
const gameStateEl = document.getElementById("game-state");
const rankListEl = document.getElementById("rank-list");
const rankTitleEl = document.getElementById("rank-title");
const gameTitleEl = document.getElementById("game-title");
const gameDescEl = document.getElementById("game-desc");
const switchDodgeBtn = document.getElementById("switch-dodge-btn");
const switchSnakeBtn = document.getElementById("switch-snake-btn");
const switchBirdBtn = document.getElementById("switch-bird-btn");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const keys = {};

const config = {
  dodge: {
    label: "躲避方块",
    desc: "键盘方向键或 WASD 移动蓝色方块，躲避红色障碍。",
    bestKey: "game-hub-dodge-best",
    rankKey: "game-hub-dodge-rank",
  },
  snake: {
    label: "贪吃蛇",
    desc: "方向键或 WASD 控制蛇移动，吃到食物加分，撞墙或撞自己结束。",
    bestKey: "game-hub-snake-best",
    rankKey: "game-hub-snake-rank",
  },
  bird: {
    label: "飞跃小鸟",
    desc: "按空格/上箭头/W 跳跃，穿过绿色管道缝隙，碰撞即结束。",
    bestKey: "game-hub-bird-best",
    rankKey: "game-hub-bird-rank",
  },
};

let mode = "dodge";
let running = false;
let paused = false;
let score = 0;
let frame = 0;
let birdRequireManualRestart = false;

const dodge = {
  player: { x: 40, y: 150, size: 22, speed: 5 },
  obstacles: [],
};

const snake = {
  cell: 20,
  cols: Math.floor(canvas.width / 20),
  rows: Math.floor(canvas.height / 20),
  body: [{ x: 8, y: 8 }],
  direction: "right",
  nextDirection: "right",
  food: { x: 14, y: 8 },
  stepTick: 0,
  stepInterval: 12,
  minStepInterval: 5,
};

const bird = {
  x: 140,
  y: 160,
  size: 24,
  velocityY: 0,
  gravity: 0.17,
  jumpVelocity: -4.8,
  pipes: [],
  pipeGap: 118,
  pipeWidth: 54,
  pipeSpeed: 2.6,
  pipeSpeedCap: 5.2,
  spawnTick: 0,
  spawnInterval: 92,
};

function getBestScore() {
  return Number(localStorage.getItem(config[mode].bestKey) || 0);
}

function setBestScore(value) {
  localStorage.setItem(config[mode].bestKey, String(value));
}

function readRank() {
  try {
    return JSON.parse(localStorage.getItem(config[mode].rankKey) || "[]");
  } catch (_error) {
    return [];
  }
}

function writeRank(value) {
  localStorage.setItem(config[mode].rankKey, JSON.stringify(value));
}

function saveCurrentScore() {
  const rank = readRank();
  rank.push(score);
  rank.sort((a, b) => b - a);
  writeRank(rank.slice(0, 5));
}

function renderRank() {
  const rank = readRank();
  rankTitleEl.textContent = `排行榜（本地）- ${config[mode].label}`;
  rankListEl.innerHTML = rank.length
    ? rank.map((item) => `<li>${item} 分</li>`).join("")
    : "<li>暂无记录，开始挑战吧！</li>";
}

function syncScoreBoard() {
  scoreEl.textContent = String(score);
  bestScoreEl.textContent = String(getBestScore());
  if (mode === "snake") {
    speedLevelEl.textContent = String(13 - snake.stepInterval);
    return;
  }
  if (mode === "bird") {
    speedLevelEl.textContent = String(Math.floor((bird.pipeSpeed - 2) * 2) + 1);
    return;
  }
  speedLevelEl.textContent = "-";
}

function updateBestScore() {
  const best = getBestScore();
  if (score > best) setBestScore(score);
  bestScoreEl.textContent = String(getBestScore());
}

function drawBackground() {
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function resetDodge() {
  dodge.player.x = 40;
  dodge.player.y = 150;
  dodge.obstacles = [];
}

function spawnObstacle() {
  const size = 14 + Math.random() * 18;
  const y = Math.random() * (canvas.height - size);
  const speed = 2 + Math.random() * 3 + score / 120;
  dodge.obstacles.push({ x: canvas.width, y, size, speed });
}

function drawDodge() {
  drawBackground();
  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(dodge.player.x, dodge.player.y, dodge.player.size, dodge.player.size);
  ctx.fillStyle = "#ef4444";
  dodge.obstacles.forEach((item) => ctx.fillRect(item.x, item.y, item.size, item.size));
}

function updateDodge() {
  frame += 1;
  score += 1;
  if (keys.ArrowUp || keys.w || keys.W) dodge.player.y -= dodge.player.speed;
  if (keys.ArrowDown || keys.s || keys.S) dodge.player.y += dodge.player.speed;
  if (keys.ArrowLeft || keys.a || keys.A) dodge.player.x -= dodge.player.speed;
  if (keys.ArrowRight || keys.d || keys.D) dodge.player.x += dodge.player.speed;
  dodge.player.x = Math.max(0, Math.min(canvas.width - dodge.player.size, dodge.player.x));
  dodge.player.y = Math.max(0, Math.min(canvas.height - dodge.player.size, dodge.player.y));
  if (frame % 35 === 0) spawnObstacle();
  dodge.obstacles = dodge.obstacles
    .map((item) => ({ ...item, x: item.x - item.speed }))
    .filter((item) => item.x + item.size > 0);
  const hit = dodge.obstacles.some(
    (item) =>
      dodge.player.x < item.x + item.size &&
      dodge.player.x + dodge.player.size > item.x &&
      dodge.player.y < item.y + item.size &&
      dodge.player.y + dodge.player.size > item.y
  );
  if (hit) endGame();
}

function resetSnake() {
  snake.body = [{ x: 8, y: 8 }];
  snake.direction = "right";
  snake.nextDirection = "right";
  snake.stepTick = 0;
  placeFood();
}

function resetBird() {
  bird.y = 160;
  bird.velocityY = 0;
  bird.pipes = [];
  bird.pipeSpeed = 2.6;
  bird.spawnTick = 0;
}

function birdJump() {
  if (mode !== "bird") return;
  if (birdRequireManualRestart) return;
  if (!running) {
    running = true;
    paused = false;
    gameStateEl.textContent = "进行中";
  }
  bird.velocityY = bird.jumpVelocity;
}

function placeFood() {
  while (true) {
    const x = Math.floor(Math.random() * snake.cols);
    const y = Math.floor(Math.random() * snake.rows);
    if (!snake.body.some((node) => node.x === x && node.y === y)) {
      snake.food = { x, y };
      return;
    }
  }
}

function drawSnake() {
  drawBackground();
  const cell = snake.cell;
  ctx.fillStyle = "#22d3ee";
  snake.body.forEach((node, idx) => {
    ctx.fillStyle = idx === 0 ? "#67e8f9" : "#22d3ee";
    ctx.fillRect(node.x * cell + 1, node.y * cell + 1, cell - 2, cell - 2);
  });
  ctx.fillStyle = "#f43f5e";
  ctx.fillRect(snake.food.x * cell + 1, snake.food.y * cell + 1, cell - 2, cell - 2);
}

function updateSnakeDirectionByInput() {
  if ((keys.ArrowUp || keys.w || keys.W) && snake.direction !== "down") snake.nextDirection = "up";
  if ((keys.ArrowDown || keys.s || keys.S) && snake.direction !== "up") snake.nextDirection = "down";
  if ((keys.ArrowLeft || keys.a || keys.A) && snake.direction !== "right") snake.nextDirection = "left";
  if ((keys.ArrowRight || keys.d || keys.D) && snake.direction !== "left") snake.nextDirection = "right";
}

function updateSnake() {
  updateSnakeDirectionByInput();
  // Difficulty curve: start slower, then speed up as score grows.
  snake.stepInterval = Math.max(snake.minStepInterval, 12 - Math.floor(score / 50));
  snake.stepTick += 1;
  if (snake.stepTick < snake.stepInterval) return;
  snake.stepTick = 0;

  snake.direction = snake.nextDirection;
  const head = { ...snake.body[0] };
  if (snake.direction === "up") head.y -= 1;
  if (snake.direction === "down") head.y += 1;
  if (snake.direction === "left") head.x -= 1;
  if (snake.direction === "right") head.x += 1;

  const out = head.x < 0 || head.y < 0 || head.x >= snake.cols || head.y >= snake.rows;
  const bite = snake.body.some((node) => node.x === head.x && node.y === head.y);
  if (out || bite) {
    endGame();
    return;
  }

  snake.body.unshift(head);
  const eat = head.x === snake.food.x && head.y === snake.food.y;
  if (eat) {
    score += 10;
    placeFood();
  } else {
    snake.body.pop();
  }
}

function spawnBirdPipe() {
  const topMin = 35;
  const topMax = canvas.height - bird.pipeGap - 35;
  const topHeight = topMin + Math.random() * (topMax - topMin);
  bird.pipes.push({
    x: canvas.width + 10,
    topHeight,
    passed: false,
  });
}

function drawBird() {
  drawBackground();
  // bird
  ctx.fillStyle = "#facc15";
  ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
  // pipes
  ctx.fillStyle = "#22c55e";
  bird.pipes.forEach((pipe) => {
    const bottomY = pipe.topHeight + bird.pipeGap;
    const bottomHeight = canvas.height - bottomY;
    ctx.fillRect(pipe.x, 0, bird.pipeWidth, pipe.topHeight);
    ctx.fillRect(pipe.x, bottomY, bird.pipeWidth, bottomHeight);
  });
}

function birdHitPipe(pipe) {
  const birdRight = bird.x + bird.size;
  const birdBottom = bird.y + bird.size;
  const inX = birdRight > pipe.x && bird.x < pipe.x + bird.pipeWidth;
  if (!inX) return false;
  const inTop = bird.y < pipe.topHeight;
  const inBottom = birdBottom > pipe.topHeight + bird.pipeGap;
  return inTop || inBottom;
}

function updateBird() {
  frame += 1;
  bird.spawnTick += 1;
  bird.pipeSpeed = Math.min(bird.pipeSpeedCap, 2.6 + score * 0.015);

  bird.velocityY += bird.gravity;
  bird.y += bird.velocityY;

  if (bird.spawnTick >= bird.spawnInterval) {
    bird.spawnTick = 0;
    spawnBirdPipe();
  }

  bird.pipes = bird.pipes
    .map((pipe) => ({ ...pipe, x: pipe.x - bird.pipeSpeed }))
    .filter((pipe) => pipe.x + bird.pipeWidth > -4);

  for (const pipe of bird.pipes) {
    if (!pipe.passed && pipe.x + bird.pipeWidth < bird.x) {
      pipe.passed = true;
      score += 10;
    }
    if (birdHitPipe(pipe)) {
      endGame();
      return;
    }
  }

  if (bird.y < 0 || bird.y + bird.size > canvas.height) {
    endGame();
  }
}

function resetCurrentGame() {
  running = false;
  paused = false;
  frame = 0;
  score = 0;
  birdRequireManualRestart = false;
  gameStateEl.textContent = "未开始";
  if (mode === "dodge") resetDodge();
  if (mode === "snake") resetSnake();
  if (mode === "bird") resetBird();
  syncScoreBoard();
  renderRank();
  draw();
}

function endGame() {
  running = false;
  paused = false;
  if (mode === "bird") birdRequireManualRestart = true;
  gameStateEl.textContent = "结束";
  saveCurrentScore();
  updateBestScore();
  renderRank();
}

function draw() {
  if (mode === "dodge") drawDodge();
  if (mode === "snake") drawSnake();
  if (mode === "bird") drawBird();
}

function update() {
  if (!running || paused) return;
  if (mode === "dodge") updateDodge();
  if (mode === "snake") updateSnake();
  if (mode === "bird") updateBird();
  syncScoreBoard();
  updateBestScore();
  draw();
}

function tick() {
  update();
  requestAnimationFrame(tick);
}

function switchGame(nextMode) {
  mode = nextMode;
  switchDodgeBtn.classList.toggle("active", mode === "dodge");
  switchSnakeBtn.classList.toggle("active", mode === "snake");
  switchBirdBtn.classList.toggle("active", mode === "bird");
  gameTitleEl.textContent = config[mode].label;
  gameDescEl.textContent = config[mode].desc;
  resetCurrentGame();
}

startBtn.addEventListener("click", () => {
  if (mode === "bird" && birdRequireManualRestart) {
    resetCurrentGame();
  }
  if (!running) {
    running = true;
    paused = false;
    gameStateEl.textContent = "进行中";
  }
});

pauseBtn.addEventListener("click", () => {
  if (!running) return;
  paused = !paused;
  gameStateEl.textContent = paused ? "已暂停" : "进行中";
});

resetBtn.addEventListener("click", resetCurrentGame);
switchDodgeBtn.addEventListener("click", () => switchGame("dodge"));
switchSnakeBtn.addEventListener("click", () => switchGame("snake"));
switchBirdBtn.addEventListener("click", () => switchGame("bird"));

window.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
  if ([" ", "ArrowUp", "w", "W"].includes(e.key) && mode === "bird") birdJump();
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

canvas.addEventListener("click", () => {
  if (mode === "bird") birdJump();
});

document.getElementById("year").textContent = String(new Date().getFullYear());
switchGame("dodge");
tick();

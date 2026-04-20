document.addEventListener("DOMContentLoaded", function () {
  const setupScreen = document.getElementById("setupScreen");
  const gameScreen = document.getElementById("gameScreen");
  const gameArea = document.getElementById("gameArea");
  const shape = document.getElementById("shape");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const timerDisplay = document.getElementById("timerDisplay");

  const difficultySelect = document.getElementById("difficulty");
  const colorInput = document.getElementById("shapeColor");
  const startBtn = document.getElementById("startBtn");

  let score = 0;
  let timeLimit = 1000;
  let shapeSize = 50;
  let timerInterval;

  startBtn.addEventListener("click", function () {
    timeLimit = parseInt(difficultySelect.value);
    const chosenColor = colorInput.value;

    if (timeLimit === 3000) {
      shapeSize = 80;
    } else if (timeLimit === 2000) {
      shapeSize = 50;
    } else if (timeLimit === 1000) {
      shapeSize = 25;
    }

    shape.style.backgroundColor = chosenColor;
    shape.style.width = shapeSize + "px";
    shape.style.height = shapeSize + "px";

    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;

    setupScreen.style.display = "none";
    gameScreen.style.display = "block";
    gameArea.style.display = "block";

    spawnShape();
  });

  shape.addEventListener("click", function () {
    clearInterval(timerInterval);

    score++;
    scoreDisplay.textContent = `Score: ${score}`;

    spawnShape();
  });

  function spawnShape() {
    const maxX = gameArea.clientWidth - shapeSize;
    const maxY = gameArea.clientHeight - shapeSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    shape.style.left = randomX + "px";
    shape.style.top = randomY + "px";

    let timeLeft = timeLimit;
    timerDisplay.textContent = `Time: ${(timeLeft / 1000).toFixed(1)}s`;

    timerInterval = setInterval(function () {
      timeLeft -= 100;
      timerDisplay.textContent = `Time: ${(timeLeft / 1000).toFixed(1)}s`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 100);
  }

  function endGame() {
    alert(`Time out! Final score: ${score}`);

    gameScreen.style.display = "none";
    setupScreen.style.display = "block";
  }
});


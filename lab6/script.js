document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  const levelSelect = document.getElementById("levelSelect");
  const loadBtn = document.getElementById("loadBtn");

  const statsArea = document.getElementById("statsArea");
  const timeDisplay = document.getElementById("timeDisplay");
  const movesDisplay = document.getElementById("movesDisplay");
  const minMovesDisplay = document.getElementById("minMovesDisplay");

  let gridState = [];
  let moves = 0;
  let time = 0;
  let timerInterval = null;
  let isGameActive = false;
  let levelsData = [];

  let lastClicked = { r: null, c: null };

  fetch("levels.json")
    .then((response) => response.json())
    .then((data) => {
      levelsData = data;
    })
    .catch((err) => console.error("Error:", err));

  loadBtn.addEventListener("click", () => {
    const selectedIndex = parseInt(levelSelect.value);
    loadLevel(selectedIndex);
  });

  function loadLevel(index) {
    const levelData = levelsData[index];
    gridState = levelData.grid.map((row) => [...row]);

    moves = 0;
    time = 0;
    isGameActive = true;
    lastClicked = { r: null, c: null };
    statsArea.style.display = "block";
    gameBoard.style.display = "grid";

    movesDisplay.textContent = moves;
    minMovesDisplay.textContent = levelData.minMoves;
    timeDisplay.textContent = time;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (isGameActive) {
        time++;
        timeDisplay.textContent = time;
      }
    }, 1000);

    renderBoard();
  }

  function renderBoard() {
    gameBoard.innerHTML = "";

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (gridState[r][c] === 1) {
          cell.classList.add("on");
        }

        cell.addEventListener("click", () => handleCellClick(r, c));
        gameBoard.appendChild(cell);
      }
    }
  }

  function handleCellClick(r, c) {
    if (!isGameActive) return;

    if (lastClicked.r === r && lastClicked.c === c) {
      moves--;
      lastClicked = { r: null, c: null };
    } else {
      moves++;
      lastClicked = { r: r, c: c };
    }

    movesDisplay.textContent = moves;

    toggleCell(r, c);
    toggleCell(r - 1, c);
    toggleCell(r + 1, c);
    toggleCell(r, c - 1);
    toggleCell(r, c + 1);

    renderBoard();
    checkWin();
  }

  function toggleCell(r, c) {
    if (r >= 0 && r < 5 && c >= 0 && c < 5) {
      gridState[r][c] = gridState[r][c] === 1 ? 0 : 1;
    }
  }

  function checkWin() {
    const hasLightOn = gridState.some((row) => row.includes(1));
    if (!hasLightOn) {
      isGameActive = false;
      clearInterval(timerInterval);
      setTimeout(() => {
        alert(`Wictory! you complete ${time} seconds and ${moves} steps.`);
      }, 100);
    }
  }
});

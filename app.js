document.addEventListener("DOMContentLoaded", () => {
  const sq = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector("span");
  const startBtn = document.querySelector(".start");
  const width = 10;
  let currentIndex = 0,
    appleIndex = 0,
    currentSnake = [2, 1, 0];
  let direction = 1,
    score = 0,
    speed = 0.9,
    intervalTime = 0,
    interval = 0;

  // Function to start the game
  function startGame() {
    currentSnake.forEach((index) => sq[index].classList.remove("snake"));
    sq[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 400;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => sq[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  function moveOutcomes() {
    // Deals with snake hitting  slef
    if (
      (currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
      sq[currentSnake[0] + direction].classList.contains("snake") //if snake goes into itself
    ) {
      return clearInterval(interval);
    }

    const tail = currentSnake.pop();
    sq[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    if (sq[currentSnake[0]].classList.contains("apple")) {
      sq[currentSnake[0]].classList.remove("apple");
      sq[tail].classList.add("snake");
      currentSnake.push(tail);
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
      randomApple();
    }

    sq[currentSnake[0]].classList.add("snake");
  }

  function control(e) {
    sq[currentIndex].classList.remove("snake");
    if (e.keyCode === 39) {
      direction = 1;
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 37) {
      direction = -1;
    } else if (e.keyCode === 40) {
      direction = +width;
    }
  }

  document.addEventListener("keyup", control);
  startBtn.addEventListener("click", startGame);

  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * sq.length);
    } while (sq[appleIndex].classList.contains("snake"));
    sq[appleIndex].classList.add("apple");
  }
});

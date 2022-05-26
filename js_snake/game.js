import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
  clearSnake,
  snakeLength,
} from "./snake.js";
import { grabSettings, clearDirection } from "./input.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;

let currentSpeed = 0;
let currentGrowthRate = 0;
let currentBoardSize = 0;

let highestSpeed = 0;
let highestGrowthRate = 0;
let lowestBoardSize = 1000000;
let longestSnake = 0;

const gameBoard = $("#game-board")[0];

function main(currentTime) {
  if (gameOver) {
    if (confirm("You lost. Press OK to restart")) {
        updateHighScore();
        clearSnake();
        clearDirection();
        grabSettings();
        currentSpeed = $('#speed-input').val();
        currentGrowthRate = $('#growth-input').val();
        currentBoardSize = $('#size-input').val();
        gameOver = false;
        window.requestAnimationFrame(main);
    } else return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;
  update();
  draw();
}

grabSettings();
currentSpeed = $('#speed-input').val();
currentGrowthRate = $('#growth-input').val();
currentBoardSize = $('#size-input').val();
window.requestAnimationFrame(main);

$(':button').click(() => {
    updateHighScore();
    clearSnake();
    clearDirection();
    grabSettings();
    currentSpeed = $('#speed-input').val();
    currentGrowthRate = $('#growth-input').val();
    currentBoardSize = $('#size-input').val();
    gameOver = false;
    window.requestAnimationFrame(main);
});

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function updateHighScore() {
    if (highestSpeed < currentSpeed) highestSpeed = currentSpeed;
    if (highestGrowthRate < currentGrowthRate) highestGrowthRate = currentGrowthRate;
    if (lowestBoardSize > currentBoardSize) lowestBoardSize = currentBoardSize;
    if (longestSnake < snakeLength()) longestSnake = snakeLength();
    $('#score').text(longestSnake + '!');
    $('#speed').text('With snake speed: ' + highestSpeed);
    $('#growth').text('Growth rate: ' + highestGrowthRate);
    $('#board-size').text('Board size: ' + lowestBoardSize);
}
import { getInputDirection } from "./input.js";
import { equalPositions, middlePosition } from "./grid.js";

export let SNAKE_SPEED = 0;
let snakeBody = [{ x: 0, y: 0 }];
let newSegments = 0;

export function setSnakeSpeed(speed) {
  SNAKE_SPEED = speed;
}

export function setSnakeStartPos() {
  snakeBody[0] = middlePosition();
}

export function clearSnake() {
  snakeBody = [{ x: 0, y: 0 }];
}

export function snakeLength() {
  return snakeBody.length;
}

export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    $("<div></div>", { class: "snake" })
      .css({ gridRowStart: segment.y, gridColumnStart: segment.x })
      .appendTo(gameBoard);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(getSnakeHead(), { ignoreHead: true });
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

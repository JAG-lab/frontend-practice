import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = null;
let EXPANSION_RATE = 0;

export function setGrowthRate(growth) {
  EXPANSION_RATE = growth;
}

export function setFirstFood() {
  food = getRandomFoodPosition();
}

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  $("<div></div>", { class: "food" })
    .css({ gridRowStart: food.y, gridColumnStart: food.x })
    .appendTo(gameBoard);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}

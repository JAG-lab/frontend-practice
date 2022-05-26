export let GRID_SIZE = 0;

export function setGridSize(size) {
  GRID_SIZE = size;
  $("#game-board").css({
    "grid-template-rows": "repeat(" + GRID_SIZE + ", 1fr)",
    "grid-template-columns": "repeat(" + GRID_SIZE + ", 1fr)",
  });
}

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}

export function outsideGrid(pos) {
  return pos.x < 1 || pos.x > GRID_SIZE || pos.y < 1 || pos.y > GRID_SIZE;
}

export function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

export function middlePosition() {
  return { x: Math.floor(GRID_SIZE / 2) + 1, y: Math.floor(GRID_SIZE / 2) + 1 };
}

let errorCount = 0;
let startClueCount = 3;
let remaining = 46;

const gameBoard = $(".grid")[0];
let board = [];

function randomColor() {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return "rgb(255, 0, 0) none repeat scroll 0% 0%";
    case 1:
      return "rgb(255, 255, 0) none repeat scroll 0% 0%";
    // case 2:
    //   return "rgb(0, 128, 0) none repeat scroll 0% 0%";
    default:
      return "rgb(0, 0, 255) none repeat scroll 0% 0%";
  }
}

function rgbToText(rgb) {
  switch (rgb) {
    case "rgb(255, 0, 0) none repeat scroll 0% 0%":
      return "red";
    case "rgb(255, 255, 0) none repeat scroll 0% 0%":
      return "yellow";
    case "rgb(0, 128, 0) none repeat scroll 0% 0%":
      return "green";
    default:
      return "blue";
  }
}

function textToRgb(text) {
  switch (text) {
    case "red":
      return "rgb(255, 0, 0) none repeat scroll 0% 0%";
    case "yellow":
      return "rgb(255, 255, 0) none repeat scroll 0% 0%";
    case "green":
      return "rgb(0, 128, 0) none repeat scroll 0% 0%";
    default:
      return "rgb(0, 0, 255) none repeat scroll 0% 0%";
  }
}

function randomClue() {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return "orthogonal";
    case 1:
      return "diagonal";
    default:
      return "both";
  }
}

function setUpBoard() {
  let boardTemp = [];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      $("<button></button>", { class: `grid-button grid-button-${i}-${j}` })
        .css({ gridRowStart: i + 1, gridColumnStart: j + 1 })
        .appendTo(gameBoard);
      boardTemp.push({
        color: rgbToText(randomColor()),
        clue: randomClue(),
      });
    }
    board.push([...boardTemp]);
    boardTemp.splice(0, boardTemp.length);
  }
  setStartingClues(startClueCount);
}

function findSurroundingTiles(coorX, coorY) {
  let res = [];
  const X = coorX;
  const Y = coorY;
  let topBorder = X === 0;
  let bottomBorder = X === 6;
  let leftBorder = Y === 0;
  let rightBorder = Y === 6;
  if (!topBorder && !leftBorder) {
    res.push({ x: X - 1, y: Y - 1 });
  }
  if (!topBorder) {
    res.push({ x: X - 1, y: Y });
  }
  if (!topBorder && !rightBorder) {
    res.push({ x: X - 1, y: Y + 1 });
  }
  if (!rightBorder) {
    res.push({ x: X, y: Y + 1 });
  }
  if (!bottomBorder && !rightBorder) {
    res.push({ x: X + 1, y: Y + 1 });
  }
  if (!bottomBorder) {
    res.push({ x: X + 1, y: Y });
  }
  if (!bottomBorder && !leftBorder) {
    res.push({ x: X + 1, y: Y - 1 });
  }
  if (!leftBorder) {
    res.push({ x: X, y: Y - 1 });
  }
  return res;
}

function findDiagonalTiles(coorX, coorY) {
  let res = [];
  const X = coorX;
  const Y = coorY;
  let topBorder = X === 0;
  let bottomBorder = X === 6;
  let leftBorder = Y === 0;
  let rightBorder = Y === 6;
  if (!topBorder && !leftBorder) {
    res.push({ x: X - 1, y: Y - 1 });
  }
  if (!topBorder && !rightBorder) {
    res.push({ x: X - 1, y: Y + 1 });
  }
  if (!bottomBorder && !rightBorder) {
    res.push({ x: X + 1, y: Y + 1 });
  }
  if (!bottomBorder && !leftBorder) {
    res.push({ x: X + 1, y: Y - 1 });
  }
  return res;
}

function findOrthogonalTiles(coorX, coorY) {
  let res = [];
  const X = coorX;
  const Y = coorY;
  let topBorder = X === 0;
  let bottomBorder = X === 6;
  let leftBorder = Y === 0;
  let rightBorder = Y === 6;
  if (!topBorder) {
    res.push({ x: X - 1, y: Y });
  }
  if (!rightBorder) {
    res.push({ x: X, y: Y + 1 });
  }
  if (!bottomBorder) {
    res.push({ x: X + 1, y: Y });
  }
  if (!leftBorder) {
    res.push({ x: X, y: Y - 1 });
  }
  return res;
}

function determineClueText(clueType, coorX, coorY) {
  let num = 0;
  let R = 0;
  let Y = 0;
  let G = 0;
  let B = 0;
  let tiles, color;
  switch (clueType) {
    case "orthogonal":
      tiles = findOrthogonalTiles(coorX, coorY);
      break;
    case "diagonal":
      tiles = findDiagonalTiles(coorX, coorY);
      break;
    default:
      tiles = findSurroundingTiles(coorX, coorY);
      break;
  }
  tiles.forEach((coords) => {
    switch (board[coords.x][coords.y].color) {
      case "red":
        R++;
        break;
      case "blue":
        B++;
        break;
      case "green":
        G++;
        break;
      default:
        Y++;
        break;
    }
  });
  if (R > Y && R > G && R > B) {
    num = R;
    color = "red";
  } else if (Y > G && Y > B) {
    num = Y;
    color = "yellow";
  } else if (G > B) {
    num = G;
    color = "green";
  } else {
    num = B;
    color = "blue";
  }
  switch (clueType) {
    case "orthogonal":
      return `[${num} ${color}]`;
    case "diagonal":
      return `<${num} ${color}>`;
    default:
      return `${num} ${color}`;
  }
}

function revealTile(coorX, coorY) {
  if (coorX < 0 || coorX > 6 || coorY < 0 || coorY > 6) return;
  if (board[coorX][coorY].revealed) {
    return;
  } else {
    let guess = $(".selector__current").css("background");
    if (guess === textToRgb(board[coorX][coorY].color)) {
      $(`.grid-button-${coorX}-${coorY}`)
        .css({ background: textToRgb(board[coorX][coorY].color) })
        .text(determineClueText(board[coorX][coorY].clue, coorX, coorY))
        .prop("disabled", true);
      remaining--;
    } else {
      errorCount++;
      $(".error-count__num").text(`${errorCount}/3`);
      if (errorCount >= 3) {
        $("<div></div>", { class: "gameover" })
          .text("You lost! Hit restart to try again")
          .appendTo($("body")[0]);
        $(".grid-button").prop("disabled", true);
      }
    }
  }
}

function revealTileForced(coorX, coorY) {
  if (coorX < 0 || coorX > 6 || coorY < 0 || coorY > 6) return;
  $(`.grid-button-${coorX}-${coorY}`)
    .css({ background: textToRgb(board[coorX][coorY].color) })
    .text(determineClueText(board[coorX][coorY].clue, coorX, coorY))
    .prop("disabled", true);
}

function setStartingClues(num) {
  let coords;
  let usedCoords = [];
  while (num) {
    num--;
    coords = {
      x: Math.floor(Math.random() * 7),
      y: Math.floor(Math.random() * 7),
    };
    if (
      usedCoords.find((used) => {
        return used.x === coords.x && used.y === coords.y;
      }) !== undefined
    ) {
      num++;
      continue;
    }
    usedCoords.push(coords);
    revealTileForced(coords.x, coords.y);
    coords = undefined;
  }
}

setUpBoard();

$(".selector__red").click(() => {
  $(".selector__current").css({ background: "red" });
});

$(".selector__yellow").click(() => {
  $(".selector__current").css({ background: "yellow" });
});

// $(".selector__green").click(() => {
//   $(".selector__current").css({ background: "green" });
// });

$(".selector__blue").click(() => {
  $(".selector__current").css({ background: "blue" });
});

$(".error-count__reset").click(() => {
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.lastChild);
  }
  board = [];
  setUpBoard();
  $(".selector__current").css({ background: randomColor() });
  firstTileClicked = false;
  errorCount = 0;
  $(".error-count__num").text("0/3");
  $(".gameover").remove();
  $(".grid-button").click((e) => {
    const row = e.target.style.gridRowStart;
    const column = e.target.style.gridColumnStart;
    revealTile(row - 1, column - 1);
  });
  remaining = 46;
});

$(".grid-button").click((e) => {
  const row = e.target.style.gridRowStart;
  const column = e.target.style.gridColumnStart;
  revealTile(row - 1, column - 1);
  if (remaining === 0) {
    $("<div></div>", { class: "gameover" })
      .text("You won! Hit restart to start over")
      .appendTo($("body")[0]);
  }
});

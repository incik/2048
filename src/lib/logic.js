const MOVES = { UP: 'UP', RIGHT: 'RIGHT', DOWN: 'DOWN', LEFT: 'LEFT' };

// privates
const __getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

const __getRandomValue = () => {
  return [2, 2, 2, 2, 4][Math.floor(Math.random() * 5)];
};

const __getFreeCells = (matrix) => {
  let result = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        result.push({ x: i, y: j });
      }
    }
  }
  return result;
};

const __generateNewNumber = (matrix, x, y) => {
  let coords = [x, y];
  if (!x && !y) {
    const freeCells = __getFreeCells(matrix);
    coords = freeCells[__getRandomNumber(0, freeCells.length)];
  }
  if (!!coords) {
    const newMatrix = JSON.parse(JSON.stringify(matrix)); // hack for deep array copy
    newMatrix[coords.x][coords.y] = __getRandomValue();
    return newMatrix;
  } else {
    return matrix;
  }
};

const invertMatrix = (matrix) => {
  let newMatrix = [];
  for (let i = 3; i >= 0; i--) {
    newMatrix.push(matrix[i]);
  }
  return newMatrix;
};

// moving numbers

const __squashRowLeft = (row) => {
  let vals = row.filter((v) => v);
  let zeros = Array(4 - vals.length).fill(0);
  return vals.concat(zeros);
};

const __squashRowRight = (row) => {
  let vals = row.filter((v) => v);
  let zeros = Array(4 - vals.length).fill(0);
  return zeros.concat(vals);
};

const __squashColumnUp = (matrix, columnIndex) => {
  let res = [];
  for (let i = 0; i < 4; i++) {
    if (matrix[i][columnIndex] !== 0) {
      res.push(matrix[i][columnIndex]);
    }
  }
  for (let i = 0; i < 4; i++) {
    matrix[i][columnIndex] = res[i] === undefined ? 0 : res[i];
  }
  return matrix;
};

const __squashColumnDown = (matrix, columnIndex) => {
  return invertMatrix(__squashColumnUp(invertMatrix(matrix), columnIndex));
};

// combine

const __combineLeft = (row) => {
  let pts = 0;
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      pts += row[i];
    }
  }
  return { row: __squashRowLeft(row), gainedPoints: pts };
};

const __combineRight = (row) => {
  let pts = 0;
  for (let i = 3; i >= 1; i--) {
    if (row[i] === row[i - 1]) {
      row[i] *= 2;
      row[i - 1] = 0;
      pts += row[i];
    }
  }
  return { row: __squashRowRight(row), gainedPoints: pts };
};

const __combineUp = (matrix, columnIndex) => {
  let pts = 0;
  for (let i = 0; i < 3; i++) {
    if (matrix[i][columnIndex] === matrix[i + 1][columnIndex]) {
      matrix[i][columnIndex] *= 2;
      matrix[i + 1][columnIndex] = 0;
      pts += matrix[i][columnIndex];
    }
  }
  return { matrix: __squashColumnUp(matrix, columnIndex), gainedPoints: pts };
};

const __combineDown = (matrix, columnIndex) => {
  const combined = __combineUp(invertMatrix(matrix), columnIndex);
  return { matrix: invertMatrix(combined.matrix), gainedPoints: combined.gainedPoints };
};

// compare two matrixes and return true if they are equal
const __eqMatrixes = (matrixA, matrixB) => {
  return JSON.stringify(matrixA) === JSON.stringify(matrixB);
};

// public

const generate = () => {
  const emptyMatrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  return __generateNewNumber(__generateNewNumber(emptyMatrix));
};

const move = (matrix, direction) => {
  const oldMatrix = JSON.parse(JSON.stringify(matrix)); // hack for deep array copy

  let pts = 0;

  switch (direction) {
    case MOVES.LEFT: {
      for (let i = 0; i < 4; i++) {
        const combined = __combineLeft(__squashRowLeft(matrix[i]));
        matrix[i] = combined.row;
        pts += combined.gainedPoints;
      }
      break;
    }
    case MOVES.RIGHT: {
      for (let i = 0; i < 4; i++) {
        const combined = __combineRight(__squashRowRight(matrix[i]));
        matrix[i] = combined.row;
        pts += combined.gainedPoints;
      }
      break;
    }
    case MOVES.UP: {
      for (let i = 0; i < 4; i++) {
        const combined = __combineUp(__squashColumnUp(matrix, i), i);
        matrix = combined.matrix;
        pts += combined.gainedPoints;
      }
      break;
    }
    case MOVES.DOWN: {
      for (let i = 0; i < 4; i++) {
        const combined = __combineDown(__squashColumnDown(matrix, i), i);
        matrix = combined.matrix;
        pts += combined.gainedPoints;
      }
      break;
    }
  }

  // did something change? then add new number
  return { matrix: __eqMatrixes(oldMatrix, matrix) ? matrix : __generateNewNumber(matrix), gainedPoints: pts };
};

module.exports = {
  MOVES,
  __combineLeft,
  __combineRight,
  __combineDown,
  __combineUp,
  __getRandomNumber,
  __getFreeCells,
  __generateNewNumber,
  __squashRowLeft,
  __squashRowRight,
  __squashColumnDown,
  __squashColumnUp,
  generate,
  move,
};

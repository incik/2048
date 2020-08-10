import React, { useState } from 'react';
import './App.css';

import logic from './lib/logic';

// const renderMatrix = (matrix) => {
//   let result = '';
//   for (let i = 0; i < matrix.length; i++) {
//     result += `[${matrix[i].map((elem) => elem).join(',')}]\n`;
//   }
//   return result;
// };

const MatrixCell = ({ cell }) => {
  return <div className={`cell cell-${cell}`}>{cell == 0 ? '' : cell}</div>;
};

const MatrixRow = ({ row }) => (
  <div className="matrix-row">
    {row.map((cell) => (
      <MatrixCell cell={cell} key={+new Date() * Math.random()} />
    ))}
  </div>
);

const Matrix = ({ matrix }) => (
  <div className="matrix">
    {matrix.map((row) => (
      <MatrixRow row={row} key={+new Date() * Math.random()} />
    ))}
  </div>
);

const moveLeft = (mat) => {
  return logic.move(mat, logic.MOVES.LEFT);
};

const moveRight = (mat) => {
  return logic.move(mat, logic.MOVES.RIGHT);
};

const moveUp = (mat) => {
  return logic.move(mat, logic.MOVES.UP);
};

const moveDown = (mat) => {
  return logic.move(mat, logic.MOVES.DOWN);
};

function App() {
  const [mat, setMat] = useState(logic.generate());
  const [pts, setPts] = useState(0);

  return (
    <div className="App">
      <h1>{pts}</h1>
      <Matrix matrix={mat} />

      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <button
                onClick={() => {
                  const res = moveUp(mat);
                  setMat(res.matrix);
                  setPts(pts + res.gainedPoints);
                }}
              >
                up
              </button>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <button
                onClick={() => {
                  const res = moveLeft(mat);
                  setMat(res.matrix);
                  setPts(pts + res.gainedPoints);
                }}
              >
                left
              </button>
            </td>
            <td></td>
            <td>
              <button
                onClick={() => {
                  const res = moveRight(mat);
                  setMat(res.matrix);
                  setPts(pts + res.gainedPoints);
                }}
              >
                right
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button
                onClick={() => {
                  const res = moveDown(mat);
                  setMat(res.matrix);
                  setPts(pts + res.gainedPoints);
                }}
              >
                down
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

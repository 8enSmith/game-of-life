import React, { useState } from 'react';

import './App.scss';
import Board from './engine/board';
import Cell from './engine/cell';
import Grid from './Grid';
import { useInterval } from './useInterval';

const DEFAULT_TIMEOUT_INTERVAL = 200;
const DEFAULT_ITERATION = 0;

const createInitialBoard = () => {
  const _board = new Board(50, 100);

  for (let row = 0; row < _board.cells.length; row++) {
    for (let col = 0; col < _board.cells[row].length; col++) {
      var randomLifeState = Math.random() < 0.5;
      _board.cells[row][col] = new Cell(row, col, randomLifeState);
    }
  }

  return _board;
};

const initialBoard = createInitialBoard();

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(DEFAULT_ITERATION);
  const [timeoutInterval, setTimeoutInterval] = useState<number>(
    DEFAULT_TIMEOUT_INTERVAL
  );

  useInterval(
    () => {
      setBoard(board.newEpoch());
      setIteration(iteration + 1);
    },
    isRunning ? timeoutInterval : null
  );

  return (
    <div className="App">
      <header className="App-header">
        <Grid board={board} updateBoard={setBoard} />
        <div>
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeoutInterval(DEFAULT_TIMEOUT_INTERVAL);
              setBoard(createInitialBoard());
              setIteration(DEFAULT_ITERATION);
            }}
          >
            Reset
          </button>
          <input
            id="timeoutInterval"
            aria-label="timeout-interval"
            type="range"
            value={timeoutInterval}
            min={0}
            max={2000}
            step={20}
            onChange={(event) => {
              setTimeoutInterval(parseInt(event.currentTarget.value, 10) || 0);
            }}
          />
          <label>{`${timeoutInterval} ms`}</label>
          <div>{`Iteration ${iteration}`}</div>
        </div>
      </header>
    </div>
  );
};

export default App;

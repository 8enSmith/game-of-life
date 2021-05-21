import React, { useState } from 'react';

import './App.css';
import Board from './engine/board';
import Grid from './Grid';
import SimpleRange from './range';
import { useInterval } from './useInterval';

const DEFAULT_TIMEOUT_INTERVAL = 2500;

const _board = new Board(15, 15);

// TODO Write fn to randomly seed the board
_board.seedCells([
  {
    row: 2,
    col: 1,
  },
  {
    row: 2,
    col: 2,
  },
  {
    row: 2,
    col: 3,
  },
]);

const App = () => {
  const [board, setBoard] = useState(_board);
  const [isRunning, setIsRunning] = useState(true);
  const [iteration, setIteration] = useState(1);
  const [timeoutInterval, setTimeoutInterval] = useState<number | null>(
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
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setBoard(_board);
            setIteration(1);
          }}
        >
          Reset
        </button>
        <Grid board={board} updateBoard={setBoard} />
        <div>{`Iteration ${iteration}`}</div>
        <SimpleRange setTimeoutInterval={setTimeoutInterval} />
      </header>
    </div>
  );
};

export default App;

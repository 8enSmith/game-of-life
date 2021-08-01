import Board from '../../engine/board';
import Cell, { changeCellState, isCellAlive } from '../../engine/cell';

describe('A cell', () => {
  it('can be made alive', () => {
    let cell = new Cell(0, 0);

    cell = changeCellState(cell, true);

    expect(cell.isAlive).toEqual(true);
  });

  it('can be made dead', () => {
    let cell = new Cell(0, 0);

    cell = changeCellState(cell, true);
    cell = changeCellState(cell, false);
    expect(cell.isAlive).toEqual(false);
  });

  describe('which has', () => {
    test('fewer than two live neighbours should die', () => {
      const board = new Board(2, 2);
      let cell = new Cell(0, 0);

      cell = changeCellState(cell, true);

      expect(isCellAlive(cell, board)).toEqual(false);
    });

    test('2 or 3 live neighbours lives on to the next generation', () => {
      const board = new Board(2, 2);
      board.seedCells([
        {
          row: 0,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
        {
          row: 1,
          col: 0,
        },
      ]);

      expect(isCellAlive(board.cells[1][0], board)).toEqual(true);
    });

    test('A cell with more than 3 live neighbours dies of overcrowding', () => {
      const board = new Board(4, 4);
      board.seedCells([
        { row: 0, col: 1 },
        {
          row: 1,
          col: 1,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 2,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
      ]);

      const newBoard = board.newEpoch();

      expect(newBoard.cells[1][2].isAlive).toEqual(false);
    });

    test('An empty cell with exactly 3 live neighbours comes to life', () => {
      const board = new Board(2, 2);
      board.seedCells([
        {
          row: 0,
          col: 1,
        },
        {
          row: 1,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
      ]);

      isCellAlive(board.cells[0][0], board);
      expect(isCellAlive(board.cells[0][0], board)).toEqual(true);
    });
  });
});

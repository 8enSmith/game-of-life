import Board from '../../engine/board';

describe('Board', () => {
  it('should initialize as expected', () => {
    const board = new Board(4, 4);

    expect(board.cells.length).toBe(4);
    expect(board.cells[0].length).toBe(4);
    expect(board.cells[1].length).toBe(4);
    expect(board.cells[2].length).toBe(4);
    expect(board.cells[3].length).toBe(4);
  });

  describe('seed cells', () => {
    let board: Board;

    beforeEach(() => {
      board = new Board(2, 2);
    });

    it('should make alive single cell', () => {
      board.seedCells([
        {
          row: 0,
          col: 0,
        },
      ]);

      expect(board.cells[0][0].isAlive).toBe(true);

      expect(board.cells[0][1].isAlive).toBe(false);
      expect(board.cells[1][0].isAlive).toBe(false);
      expect(board.cells[1][1].isAlive).toBe(false);
    });

    it('should make alive multiple cells', () => {
      board.seedCells([
        {
          row: 0,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
      ]);

      expect(board.cells[0][0].isAlive).toBe(true);
      expect(board.cells[0][1].isAlive).toBe(true);

      expect(board.cells[1][0].isAlive).toBe(false);
      expect(board.cells[1][1].isAlive).toBe(false);
    });
  });

  describe('newEpoch', () => {
    it('should correctly determine the state of the board', () => {
      const board = new Board(2, 2);
      board.seedCells([
        {
          row: 0,
          col: 0,
        },
      ]);

      const newBoard = board.newEpoch();

      expect(newBoard.cells[0][0].isAlive).toBe(false);
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

      const newBoard = board.newEpoch();

      expect(newBoard.cells[0][0].isAlive).toEqual(true);
    });

    test('still life square pattern stays the same (block)', () => {
      const board = new Board(4, 4);
      board.seedCells([
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

      expect(newBoard.cells[1][1].isAlive).toEqual(true);
      expect(newBoard.cells[1][2].isAlive).toEqual(true);
      expect(newBoard.cells[2][1].isAlive).toEqual(true);
      expect(newBoard.cells[2][2].isAlive).toEqual(true);
    });

    test('still life square pattern stays the same (tub)', () => {
      const board = new Board(5, 5);
      board.seedCells([
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
          col: 3,
        },
        {
          row: 3,
          col: 2,
        },
      ]);

      const newBoard = board.newEpoch();

      expect(newBoard.cells[1][2].isAlive).toEqual(true);
      expect(newBoard.cells[2][1].isAlive).toEqual(true);
      expect(newBoard.cells[2][3].isAlive).toEqual(true);
      expect(newBoard.cells[3][2].isAlive).toEqual(true);
    });

    describe('Oscillators', () => {
      test('Binker', () => {
        const board = new Board(5, 5);
        board.seedCells([
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

        const firstOscillation = board.newEpoch();

        expect(firstOscillation.cells[1][2].isAlive).toEqual(true);
        expect(firstOscillation.cells[2][2].isAlive).toEqual(true);
        expect(firstOscillation.cells[3][2].isAlive).toEqual(true);

        const secondOscillation = firstOscillation.newEpoch();

        expect(secondOscillation.cells[2][1].isAlive).toEqual(true);
        expect(secondOscillation.cells[2][2].isAlive).toEqual(true);
        expect(secondOscillation.cells[2][3].isAlive).toEqual(true);
      });
    });

    describe('toggle cell state', () => {
      it('should update cell state accordingly', () => {
        const board = new Board(5, 5);
        board.seedCells([
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

        const updateBoard = board.toggleCellState(0, 0);
        expect(updateBoard.cells[0][0].isAlive).toBe(true);
      });
    });
  });
});

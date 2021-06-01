import Cell, { changeCellState, determineCellState } from './cell';
import { ICoordinates } from './interfaces';

class Board {
  cells: Cell[][];
  rowCount = 0;
  colCount = 0;

  constructor(rowCount: number, colCount: number) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.cells = [];

    for (let row = 0; row < rowCount; row++) {
      this.cells[row] = [];
      for (let col = 0; col < colCount; col++) {
        this.cells[row][col] = new Cell(row, col);
      }
    }
  }

  toggleCellState = (rowIndex: number, colIndex: number) => {
    const board = { ...this };
    board.cells[rowIndex][colIndex].isAlive =
      !board.cells[rowIndex][colIndex].isAlive;
    return board;
  };

  seedCells = (cellCoordinates: Array<ICoordinates>) => {
    const board = { ...this };
    cellCoordinates.forEach((coordinates: ICoordinates) => {
      board.cells[coordinates.row][coordinates.col] = changeCellState(
        board.cells[coordinates.row][coordinates.col],
        true
      );
    });
    return board;
  };

  newEpoch = () => {
    let newBoard = new Board(this.rowCount, this.colCount);

    for (let row = 0; row < this.cells.length; row++) {
      for (let col = 0; col < this.cells[row].length; col++) {
        const isAlive = determineCellState(this.cells[row][col], this);
        newBoard.cells[row][col] = new Cell(row, col, isAlive);
      }
    }

    return newBoard;
  };
}

export default Board;

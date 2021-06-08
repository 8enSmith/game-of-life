import Board from './board';

export const changeCellState = (cell: Cell, isAlive: boolean) =>
  new Cell(cell.rowIndex, cell.colIndex, isAlive);

export const determineCellState = (cell: Cell, board: Board) => {
  const numberOfLivingNeighbours = getLivingNeighbours(cell, board);

  if (cell.isAlive) {
    if (numberOfLivingNeighbours < 2 || numberOfLivingNeighbours > 3) {
      return false;
    }

    if (numberOfLivingNeighbours === 2 || numberOfLivingNeighbours === 3) {
      return true;
    }
  }

  return numberOfLivingNeighbours === 3 ? true : false;
};

export const getLivingNeighbours = (cell: Cell, board: Board) => {
  let numberOfLivingNeighbours = 0;

  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      const neighbouringCellRow = cell.rowIndex + rowOffset;
      const neighbouringCellCol = cell.colIndex + colOffset;

      // Ignore this cell
      if (
        neighbouringCellRow === cell.rowIndex &&
        neighbouringCellCol === cell.colIndex
      ) {
        continue;
      }

      // If the cell is within the board, check how many neighbours it has.
      if (
        neighbouringCellCol >= 0 &&
        neighbouringCellRow >= 0 &&
        neighbouringCellCol <= board.colCount - 1 &&
        neighbouringCellRow <= board.rowCount - 1
      ) {
        if (board.cells[neighbouringCellRow][neighbouringCellCol].isAlive) {
          numberOfLivingNeighbours += 1;
        }
      }
    }
  }

  return numberOfLivingNeighbours;
};

class Cell {
  isAlive: boolean;
  rowIndex: number;
  colIndex: number;

  constructor(rowIndex: number, colIndex: number, isAlive: boolean = false) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.isAlive = isAlive;
  }
}

export default Cell;

import Board from './engine/board';

interface IProps {
  board: Board;
  updateBoard: (board: Board) => void;
}

const Grid = ({ board, updateBoard }: IProps) => (
  <table data-testid="table">
    <tbody>
      {board.cells.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((col, colIndex) => (
            <td
              aria-label={`${rowIndex}_${colIndex}_${
                col.isAlive ? 'alive' : 'dead'
              }`}
              key={`${rowIndex}_${colIndex}`}
              {...(col.isAlive && { className: 'alive' })}
              onClick={() => {
                const updatedBoard = board.toggleCellState(rowIndex, colIndex);
                updateBoard(updatedBoard);
              }}
            ></td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Grid;

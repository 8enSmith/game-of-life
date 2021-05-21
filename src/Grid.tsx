import Board from './engine/board';

interface IProps {
  board: Board;
  updateBoard: (board: Board) => void;
}

const Grid = ({ board, updateBoard }: IProps) => (
  // TODO: Should really use canvas instead of a table
  <table data-testid="table">
    <tbody>
      {board.cells.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((col, colIndex) => (
            <td
              key={`${rowIndex}_${colIndex}`}
              {...(col.isAlive && { className: 'alive' })}
              onClick={() => {
                const newBoard = board.toggleCellState(rowIndex, colIndex);
                updateBoard(newBoard);
              }}
            ></td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Grid;

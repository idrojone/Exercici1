import './Board.css';
import Ficha from '../Ficha/Ficha.jsx';

const Board = ({ board = [], fallingFichas = [] }) => {
    const ROWS = 6;
    const COLS = 7;

    return (
        <div className="board" style={{ position: 'relative' }}>
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} className="square">
                        {cell && <Ficha key={`${rowIndex}-${colIndex}-ficha`} jugador={cell} />}
                    </div>
                ))
            )}
        </div>
    );
};

export default Board;
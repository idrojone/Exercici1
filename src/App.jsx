import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Board from './components/Board/Board.jsx'
import DropZone from './components/DropZone/DropZone.jsx'
import './App.css'

function App() {
    const ROWS = 6;
    const COLS = 7;
    const ROW_HEIGHT = 110; // es el size + el gap 

    const [board, setBoard] = useState(
        new Array(ROWS).fill().map(() => new Array(COLS).fill(null))
    );

    const [fallingFichas, setFallingFichas] = useState([]);
    const [ganador, setGanador] = useState(null);

    const checkWin = (boardState, row, col, jugador) => {
        const directions = [
            { dr: 0, dc: 1 }, 
            { dr: 1, dc: 0 },  
            { dr: 1, dc: 1 },  
            { dr: 1, dc: -1 }  
        ];

        for (let { dr, dc } of directions) {
            let count = 1; 

            for (let i = 1; i < 4; i++) {
                const newRow = row + dr * i;
                const newCol = col + dc * i;
                if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                    if (boardState[newRow][newCol] === jugador) {
                        count++;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }

            for (let i = 1; i < 4; i++) {
                const newRow = row - dr * i;
                const newCol = col - dc * i;
                if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                    if (boardState[newRow][newCol] === jugador) {
                        count++;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }

            if (count >= 4) {
                return true;
            }
        }

        return false;
    };

    const addFallingFicha = (ficha) => {
        let targetRow = -1; 
        for (let r = ROWS - 1; r >= 0; r--) {
            if (board[r][ficha.col] === null) {
                targetRow = r;
                break; 
            }
        }

        if (targetRow === -1) {
            alert('Columna llena');
            return false;
        }

        const targetY = targetRow * ROW_HEIGHT;

        const fallingFicha = {
            ...ficha,
            startY: 0,
            endY: targetY,
            targetRow: targetRow
        };

        setFallingFichas(prev => [...prev, fallingFicha]);

        setFallingFichas(fichas =>
            fichas.map(f =>
                f.id === fallingFicha.id ? { ...f, startY: fallingFicha.endY } : f
            )
        );

    
        setBoard(prevBoard => {
            const copia = prevBoard.map(row => [...row]);
            copia[targetRow][ficha.col] = ficha.jugador;

            const hasWon = checkWin(copia, targetRow, ficha.col, ficha.jugador);
            if (hasWon) {
                setGanador(ficha.jugador);
                alert(`¡${ficha.jugador} ha ganado!`);
            }
            return copia;
        });

        setFallingFichas(fichas => fichas.filter(f => f.id !== fallingFicha.id));

        return true;
    };

    return (
        <div className="App">
            <DropZone onAddFallingFicha={addFallingFicha} ganador={ganador} />
            <Board board={board} fallingFichas={fallingFichas} />
        </div>
    )
}

export default App
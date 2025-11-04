import { useState, useRef } from "react";
import Ficha from "../Ficha/Ficha.jsx";
import './DropZone.css';

const DropZone = ({ onAddFallingFicha, ganador }) => {

    const [turno, setTurno] = useState('jugador1');
    const [pos, setPos] = useState(0);
    const containerRef = useRef(null);
    const STEP_PX = 110;

    const handleKeyDown = (event) => {
        if (ganador) {
            return;
        }

        if (event.key === 'Enter') {
            const colIndex = pos + 3;

            const newFicha = {
                id: Date.now(),
                jugador: turno,
                col: colIndex,
                startY: 0,
                endY: 600,
            };

            const change = onAddFallingFicha(newFicha);
            change ? setTurno(t => (t === 'jugador1' ? 'jugador2' : 'jugador1')) : null;
        }

        if (event.key === 'ArrowRight') {
            setPos(p => Math.min(3, p + 1));
        }

        if (event.key === 'ArrowLeft') {
            setPos(p => Math.max(-3, p - 1));
        }
    }

    return (
        <div
            className="drop-zone"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={containerRef}
        >
            <Ficha 
                jugador={turno} 
                style={{ 
                    transform: `translateX(${pos * STEP_PX}px)`,
                    position: 'absolute'
                }} 
            />
        </div>
    );
}

export default DropZone;
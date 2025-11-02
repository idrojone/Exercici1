import './Board.css';
const Board = () => {
    const squares =  new Array(6).fill().map(_ => new Array(7).fill(''));

    return (
        <div className="board">
            {
                squares.map((row, rowIndex) => (
                    row.map((_,j)  => {
                        return <div key={`${rowIndex}-${j}`} className="square"></div>;
                    })
                ))
            }
        </div>
    )
}
export default Board;
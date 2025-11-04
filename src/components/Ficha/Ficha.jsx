import './Ficha.css';

const Ficha = ({jugador, style}) => {

    return (
        <div className={`ficha ${jugador}`} style={style}></div>
    );
}

export default Ficha;
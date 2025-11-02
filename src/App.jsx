import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Board from './components/Board/Board.jsx'
import DropZone from './components/DropZone/DropZone.jsx'
import './App.css'

function App() {
    return(
        <div className="App">
            <DropZone />
            <Board />
        </div>
    )
}

export default App

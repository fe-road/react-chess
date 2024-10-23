import { useState } from 'react';

import Board from './components/board/Board';
import BoardModel from './models/BoardModel';

import './App.css';

function App() {
    const [board] = useState(new BoardModel());

    return (
        <>
            <h1>React Chess</h1>
            <Board board={board} playingAsWhite />
        </>
    );
}

export default App;

import { useState } from 'react';

import Board from './components/board/Board';
import BoardModel from './models/BoardModel';
import SquareModel from './models/SquareModel';
import { PlayerColor } from './models/PlayerModel';

import './App.css';

function App() {
    const [board] = useState(new BoardModel());
    const [playerTurn, setPlayerTurn] = useState<PlayerColor>(PlayerColor.WHITE);

    const movePiece = (currentSquare: SquareModel, finalSquare: SquareModel): void => {
        board.updateSquarePiece(finalSquare.coordinates, currentSquare.piece);
        board.updateSquarePiece(currentSquare.coordinates, null);
        setPlayerTurn((currentTurn) => currentTurn === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE);
    };

    return (
        <>
            <h1>React Chess</h1>
            <Board board={board} playingAsWhite playerTurn={playerTurn} movePiece={movePiece} />
        </>
    );
}

export default App;

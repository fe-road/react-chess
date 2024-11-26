import { useState } from 'react';

import Board from './components/board/Board';
import SquareModel from './models/SquareModel';
import { PlayerColor } from './models/PlayerModel';

import { MoveModel } from './models/MoveModel';
import MoveHistory from './components/MoveHistory';
import PromotionChoice from './components/PromotionChoice';
import { PieceType } from './models/piece/PieceType';
import GameModel from './models/GameModel';
import WinnerBanner from './components/WinnerBanner';

const App = () => {
    const [key, setKey] = useState(0);
    const [game] = useState(new GameModel());

    const selectPromotionPiece = (type: PieceType): void => {
        game.selectPromotionPiece(type);
        setKey((currentKey) => currentKey + 1);
    };

    const movePiece = (currentSquare: SquareModel, finalSquare: SquareModel, move: MoveModel | undefined): void => {
        game.movePiece(currentSquare, finalSquare, move);
        setKey((currentKey) => currentKey + 1);
    };

    return (
        <div key={key} className='max-w-xl w-3/4 my-4 mx-auto'>
            {game.winner && <WinnerBanner color={game.winner} />}
            <Board game={game} playingAsWhite blockMoves={!!game.promotionCoordinates || !!game.winner} movePiece={movePiece} />
            {!!game.promotionCoordinates && (
                <PromotionChoice isWhitePiece={game.playerTurn === PlayerColor.WHITE} select={selectPromotionPiece} />
            )}
            <MoveHistory moveList={game.moveHistory} />
        </div>
    );
}

export default App;

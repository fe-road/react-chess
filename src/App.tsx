import { useState } from 'react';

import Board from './components/board/Board';
import BoardModel from './models/BoardModel';
import SquareModel from './models/SquareModel';
import { PlayerColor } from './models/PlayerModel';

import './App.css';
import { MoveHistoryModel, MoveModel, MoveType } from './models/MoveModel';
import MoveHistory from './components/MoveHistory';
import PieceModel from './models/piece/PieceModel';

const App = () => {
    const [board] = useState(new BoardModel());
    const [moveHistoryList, setMoveHistoryList] = useState<Array<MoveHistoryModel>>([]);
    const [playerTurn, setPlayerTurn] = useState<PlayerColor>(PlayerColor.WHITE);

    const makeRookCastleMove = (piece: PieceModel, rookColumn: number, targetColumn: number): void => {
        const kingRow = piece.isWhitePiece() ? 0 : 7;
        const rookPiece = board.getSquareOnCoordinate({ row: kingRow, column: rookColumn })?.piece;
        rookPiece?.setHasMoved(true);
        board.updateSquarePiece({ row: kingRow, column: targetColumn }, rookPiece || null);
        board.updateSquarePiece({ row: kingRow, column: rookColumn }, null);
    };

    const movePiece = (currentSquare: SquareModel, finalSquare: SquareModel, move: MoveModel | undefined): void => {
        const { piece } = currentSquare;
        const { piece: capturedPiece } = finalSquare;
        if (piece) {
            piece.setHasMoved(true);
            board.updateSquarePiece(finalSquare.coordinates, piece);
            board.updateSquarePiece(currentSquare.coordinates, null);
            if (move?.type === MoveType.CASTLE_KING_SIDE) {
                makeRookCastleMove(piece, 7, 5);
            }
            if (move?.type === MoveType.CASTLE_QUEEN_SIDE) {
                makeRookCastleMove(piece, 0, 3);
            }
            if (move?.type === MoveType.EN_PASSANT) {
                const row = piece.isWhitePiece() ? finalSquare.coordinates.row - 1 : finalSquare.coordinates.row + 1;
                board.updateSquarePiece({ row, column: finalSquare.coordinates.column }, null);
            }
            setMoveHistoryList((currentValue) => [
                ...currentValue,
                {
                    from: currentSquare.coordinates,
                    to: finalSquare.coordinates,
                    piece: piece.type,
                    color: playerTurn,
                    captured: capturedPiece?.type,
                    type: move?.type || MoveType.NORMAL,
                },
            ]);
            setPlayerTurn((currentTurn) => (currentTurn === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE));
        }
    };

    return (
        <div className='max-w-xl w-3/4 my-4 mx-auto'>
            <Board board={board} moveHistoryList={moveHistoryList} playingAsWhite playerTurn={playerTurn} movePiece={movePiece} />
            <MoveHistory moveList={moveHistoryList} />
        </div>
    );
}

export default App;

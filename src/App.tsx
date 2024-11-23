import { useState } from 'react';

import Board from './components/board/Board';
import BoardModel from './models/BoardModel';
import SquareModel from './models/SquareModel';
import { PlayerColor } from './models/PlayerModel';

import './App.css';
import { MoveHistoryModel, MoveModel, MoveType } from './models/MoveModel';
import MoveHistory from './components/MoveHistory';
import PieceModel from './models/piece/PieceModel';
import PromotionChoice from './components/PromotionChoice';
import { pieceClasses, PieceType } from './constants/piece-info';
import { CoordinateModel } from './models/CoordinateModel';

const App = () => {
    const [board] = useState(new BoardModel());
    const [promotionCoordinates, setPromotionCoordinates] = useState<CoordinateModel | null>(null);
    const [moveHistoryList, setMoveHistoryList] = useState<Array<MoveHistoryModel>>([]);
    const [playerTurn, setPlayerTurn] = useState<PlayerColor>(PlayerColor.WHITE);

    const switchPlayerTurn = (): void => {
        setPlayerTurn((currentTurn) => (currentTurn === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE));
    }

    const makeRookCastleMove = (piece: PieceModel, rookColumn: number, targetColumn: number): void => {
        const kingRow = piece.isWhitePiece() ? 0 : 7;
        const rookPiece = board.getSquareOnCoordinate({ row: kingRow, column: rookColumn })?.piece;
        rookPiece?.setHasMoved(true);
        board.updateSquarePiece({ row: kingRow, column: targetColumn }, rookPiece || null);
        board.updateSquarePiece({ row: kingRow, column: rookColumn }, null);
    };

    const selectPromotionPiece = (type: PieceType): void => {
        if (promotionCoordinates) {
            board.updateSquarePiece(promotionCoordinates, new pieceClasses[type](playerTurn));
            setPromotionCoordinates(null);

            setMoveHistoryList((currentValue) => {
                const lastMove = currentValue[currentValue.length - 1];
                lastMove.type = MoveType.PROMOTION;
                lastMove.promotedTo = type;

                return [...currentValue.slice(0, -1), lastMove];
            });
            switchPlayerTurn();
        }
    }   

    const movePiece = (currentSquare: SquareModel, finalSquare: SquareModel, move: MoveModel | undefined): void => {
        const { piece } = currentSquare;
        const { piece: capturedPiece } = finalSquare;
        if (piece && !promotionCoordinates) {
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
            if (move?.type === MoveType.PROMOTION) {
                setPromotionCoordinates(finalSquare.coordinates);
                return;
            }
            switchPlayerTurn();
        }
    };

    return (
        <div className='max-w-xl w-3/4 my-4 mx-auto'>
            <Board
                board={board}
                moveHistoryList={moveHistoryList}
                playingAsWhite
                playerTurn={playerTurn}
                movePiece={movePiece}
                blockMoves={!!promotionCoordinates}
            />
            {!!promotionCoordinates && <PromotionChoice isWhitePiece={playerTurn === PlayerColor.WHITE} select={selectPromotionPiece} />}
            <MoveHistory moveList={moveHistoryList} />
        </div>
    );
}

export default App;

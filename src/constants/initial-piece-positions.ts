import { PlayerColor } from '../models/PlayerModel';
import { PieceType } from './piece-info';

interface InitialPiecePosition {
    rows: Array<number>;
    columns: Array<number>;
    pieceType: PieceType;
    playerColor: PlayerColor;
}

export const initialPiecePositions: Array<InitialPiecePosition> = [
    // White
    { rows: [1], columns: [0, 1, 2, 3, 4, 5, 6, 7], pieceType: PieceType.PAWN, playerColor: PlayerColor.WHITE },
    { rows: [0], columns: [0, 7], pieceType: PieceType.ROOK, playerColor: PlayerColor.WHITE },
    { rows: [0], columns: [1, 6], pieceType: PieceType.KNIGHT, playerColor: PlayerColor.WHITE },
    { rows: [0], columns: [2, 5], pieceType: PieceType.BISHOP, playerColor: PlayerColor.WHITE },
    { rows: [0], columns: [3], pieceType: PieceType.QUEEN, playerColor: PlayerColor.WHITE },
    { rows: [0], columns: [4], pieceType: PieceType.KING, playerColor: PlayerColor.WHITE },
    // Black
    { rows: [6], columns: [0, 1, 2, 3, 4, 5, 6, 7], pieceType: PieceType.PAWN, playerColor: PlayerColor.BLACK },
    { rows: [7], columns: [0, 7], pieceType: PieceType.ROOK, playerColor: PlayerColor.BLACK },
    { rows: [7], columns: [1, 6], pieceType: PieceType.KNIGHT, playerColor: PlayerColor.BLACK },
    { rows: [7], columns: [2, 5], pieceType: PieceType.BISHOP, playerColor: PlayerColor.BLACK },
    { rows: [7], columns: [3], pieceType: PieceType.QUEEN, playerColor: PlayerColor.BLACK },
    { rows: [7], columns: [4], pieceType: PieceType.KING, playerColor: PlayerColor.BLACK },
];

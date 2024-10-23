import PieceModel, { PieceType } from '../models/PieceModel';

const pieceIcons = {
    [PieceType.PAWN]: 'fa-chess-pawn',
    [PieceType.KNIGHT]: 'fa-chess-knight',
    [PieceType.BISHOP]: 'fa-chess-bishop',
    [PieceType.ROOK]: 'fa-chess-rook',
    [PieceType.QUEEN]: 'fa-chess-queen',
    [PieceType.KING]: 'fa-chess-king',
};

export const getPieceIcon = (piece: PieceModel): string => {
    return pieceIcons[piece.type];
};

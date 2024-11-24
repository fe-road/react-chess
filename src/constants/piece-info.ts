import { PieceType } from '../models/piece/PieceType';
import BishopPieceModel from '../models/piece/BishopPieceModel';
import KingPieceModel from '../models/piece/KingPieceModel';
import KnightPieceModel from '../models/piece/KnightPieceModel';
import PawnPieceModel from '../models/piece/PawnPieceModel';
import QueenPieceModel from '../models/piece/QueenPieceModel';
import RookPieceModel from '../models/piece/RookPieceModel';

export const pieceIcons = {
    [PieceType.PAWN]: 'fa-chess-pawn',
    [PieceType.KNIGHT]: 'fa-chess-knight',
    [PieceType.BISHOP]: 'fa-chess-bishop',
    [PieceType.ROOK]: 'fa-chess-rook',
    [PieceType.QUEEN]: 'fa-chess-queen',
    [PieceType.KING]: 'fa-chess-king',
};

export const pieceNotation = {
    [PieceType.PAWN]: '',
    [PieceType.KNIGHT]: 'N',
    [PieceType.BISHOP]: 'B',
    [PieceType.ROOK]: 'R',
    [PieceType.QUEEN]: 'Q',
    [PieceType.KING]: 'K',
};

export const pieceClasses = {
    [PieceType.PAWN]: PawnPieceModel,
    [PieceType.KNIGHT]: KnightPieceModel,
    [PieceType.BISHOP]: BishopPieceModel,
    [PieceType.ROOK]: RookPieceModel,
    [PieceType.QUEEN]: QueenPieceModel,
    [PieceType.KING]: KingPieceModel,
};

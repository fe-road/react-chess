import { PlayerColor } from './PlayerModel';

export enum PieceType {
    PAWN = 'PAWN',
    KNIGHT = 'KNIGHT',
    BISHOP = 'BISHOP',
    ROOK = 'ROOK',
    QUEEN = 'QUEEN',
    KING = 'KING',
}

const pieceIcons = {
    [PieceType.PAWN]: 'fa-chess-pawn',
    [PieceType.KNIGHT]: 'fa-chess-knight',
    [PieceType.BISHOP]: 'fa-chess-bishop',
    [PieceType.ROOK]: 'fa-chess-rook',
    [PieceType.QUEEN]: 'fa-chess-queen',
    [PieceType.KING]: 'fa-chess-king',
};

export default class PieceModel {
    readonly type: PieceType;
    readonly color: PlayerColor;

    constructor(type: PieceType, color: PlayerColor) {
        this.type = type;
        this.color = color;
    }

    getPieceIcon = (): string => {
        return pieceIcons[this.type];
    };

    isWhitePiece = (): boolean => {
        return this.color === PlayerColor.WHITE;
    };
}

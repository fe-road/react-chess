import { PlayerColor } from './PlayerModel';

export enum PieceType {
    PAWN = 'PAWN',
    KNIGHT = 'KNIGHT',
    BISHOP = 'BISHOP',
    ROOK = 'ROOK',
    QUEEN = 'QUEEN',
    KING = 'KING',
}

export default class PieceModel {
    readonly type: PieceType;
    readonly color: PlayerColor;

    constructor(type: PieceType, color: PlayerColor) {
        this.type = type;
        this.color = color;
    }
}

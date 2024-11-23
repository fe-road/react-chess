import { PieceType } from '../constants/piece-info';
import { CoordinateModel } from './CoordinateModel';
import { PlayerColor } from './PlayerModel';

export enum MoveType {
    NORMAL = 'NORMAL',
    CASTLE_KING_SIDE = 'CASTLE_KING_SIDE',
    CASTLE_QUEEN_SIDE = 'CASTLE_QUEEN_SIDE',
    EN_PASSANT = 'EN_PASSANT',
    PROMOTION = 'PROMOTION',
}

export interface MoveHistoryModel {
    from: CoordinateModel;
    to: CoordinateModel;
    piece: PieceType;
    color: PlayerColor;
    type: MoveType;
    captured?: PieceType;
    promotedTo?: PieceType;
}

export interface MoveModel extends CoordinateModel {
    type: MoveType;
}
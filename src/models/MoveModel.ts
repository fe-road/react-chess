import { PieceType } from '../constants/piece-info';
import { CoordinateModel } from './CoordinateModel';
import { PlayerColor } from './PlayerModel';

export default interface MoveModel {
    from: CoordinateModel;
    to: CoordinateModel;
    piece: PieceType;
    color: PlayerColor;
}
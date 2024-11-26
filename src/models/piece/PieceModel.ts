import { pieceIcons } from '../../constants/piece-info';
import { PossibleMove } from '../../services/move-validation-service';
import { CoordinateModel } from '../CoordinateModel';
import { MoveHistoryModel } from '../MoveModel';
import { PlayerColor } from '../PlayerModel';
import { PieceType } from './PieceType';

export default abstract class PieceModel {
    readonly type: PieceType;
    readonly color: PlayerColor;
    hasMoved: boolean;

    constructor(type: PieceType, color: PlayerColor) {
        this.type = type;
        this.color = color;
        this.hasMoved = false;
    }

    getPieceIcon = (): string => {
        return pieceIcons[this.type];
    };

    isWhitePiece = (): boolean => {
        return this.color === PlayerColor.WHITE;
    };

    setHasMoved = (newState: boolean): void => {
        this.hasMoved = newState;
    };

    abstract getMoves(coordinates: CoordinateModel, lastMove: MoveHistoryModel | undefined): Array<PossibleMove>;
}

import { pieceIcons } from '../../constants/piece-info';
import BoardModel from '../BoardModel';
import { MoveHistoryModel, MoveModel } from '../MoveModel';
import { PlayerColor } from '../PlayerModel';
import SquareModel from '../SquareModel';
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

    abstract getValidMoves(board: BoardModel, square: SquareModel, lastMove: MoveHistoryModel | undefined): Array<MoveModel | null>;
}

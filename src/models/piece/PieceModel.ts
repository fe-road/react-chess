import { PieceType, pieceIcons } from '../../constants/piece-info';
import BoardModel from '../BoardModel';
import { CoordinateModel } from '../CoordinateModel';
import { PlayerColor } from '../PlayerModel';
import SquareModel from '../SquareModel';

export default abstract class PieceModel {
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

    abstract getValidMoves(board: BoardModel, square: SquareModel): Array<CoordinateModel | null>;
}

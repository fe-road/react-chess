import { PossibleMove } from '../../services/move-validation-service';
import { CoordinateModel } from '../CoordinateModel';
import { PlayerColor } from '../PlayerModel';
import PieceModel from './PieceModel';
import { PieceType } from './PieceType';

export default class KnightPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.KNIGHT, color);
    }

    getMoves = (coordinates: CoordinateModel): Array<PossibleMove> => {
        const { row, column } = coordinates;
        return [
            { singleConfig: { targetCoordinate: { row: row + 2, column: column + 1 } } },
            { singleConfig: { targetCoordinate: { row: row + 2, column: column - 1 } } },
            { singleConfig: { targetCoordinate: { row: row - 2, column: column + 1 } } },
            { singleConfig: { targetCoordinate: { row: row - 2, column: column - 1 } } },

            { singleConfig: { targetCoordinate: { row: row + 1, column: column + 2 } } },
            { singleConfig: { targetCoordinate: { row: row + 1, column: column - 2 } } },
            { singleConfig: { targetCoordinate: { row: row - 1, column: column + 2 } } },
            { singleConfig: { targetCoordinate: { row: row - 1, column: column - 2 } } },
        ];
    };
}
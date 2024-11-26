import { PossibleMove } from '../../services/move-validation-service';
import { CoordinateModel } from '../CoordinateModel';
import { PlayerColor } from '../PlayerModel';
import PieceModel from './PieceModel';
import { PieceType } from './PieceType';

export default class RookPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.ROOK, color);
    }

    getMoves = (coordinates: CoordinateModel): Array<PossibleMove> => {
        const { row, column } = coordinates;
        return [
            {
                rowColumnConfig: {
                    startPos: column + 1,
                    endPos: 7,
                    increment: 1,
                    rowIncrement: 0,
                    columnIncrement: 1,
                },
            },
            {
                rowColumnConfig: {
                    startPos: column - 1,
                    endPos: 0,
                    increment: -1,
                    rowIncrement: 0,
                    columnIncrement: -1,
                },
            },
            {
                rowColumnConfig: {
                    startPos: row + 1,
                    endPos: 7,
                    increment: 1,
                    rowIncrement: 1,
                    columnIncrement: 0,
                },
            },
            {
                rowColumnConfig: {
                    startPos: row - 1,
                    endPos: 0,
                    increment: -1,
                    rowIncrement: -1,
                    columnIncrement: 0,
                },
            },
        ];
    };
}
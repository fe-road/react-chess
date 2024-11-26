import { PossibleMove } from '../../services/move-validation-service';
import { CoordinateModel } from '../CoordinateModel';
import { PlayerColor } from '../PlayerModel';
import PieceModel from './PieceModel';
import { PieceType } from './PieceType';

export default class BishopPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.BISHOP, color);
    }

    getMoves = (coordinates: CoordinateModel): Array<PossibleMove> => {
        const { row } = coordinates;
        return [
            {
                rowColumnConfig: {
                    startPos: row + 1,
                    endPos: 7,
                    increment: 1,
                    rowIncrement: 1,
                    columnIncrement: -1,
                },
            },
            {
                rowColumnConfig: {
                    startPos: row + 1,
                    endPos: 7,
                    increment: 1,
                    rowIncrement: 1,
                    columnIncrement: 1,
                },
            },
            {
                rowColumnConfig: {
                    startPos: row - 1,
                    endPos: 0,
                    increment: -1,
                    rowIncrement: -1,
                    columnIncrement: -1,
                },
            },
            {
                rowColumnConfig: {
                    startPos: row - 1,
                    endPos: 0,
                    increment: -1,
                    rowIncrement: -1,
                    columnIncrement: 1,
                },
            },
        ];
    };
}
import { PossibleMove } from '../../services/move-validation-service';
import { CoordinateModel } from '../CoordinateModel';
import { MoveType } from '../MoveModel';
import { PlayerColor } from '../PlayerModel';
import PieceModel from './PieceModel';
import { PieceType } from './PieceType';

export default class KingPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.KING, color);
    }

    getMoves = (coordinates: CoordinateModel): Array<PossibleMove> => {
        const possibleMoves: Array<PossibleMove> = [];
        const { row, column } = coordinates;

        // Row and Column
        possibleMoves.push({ singleConfig: { targetCoordinate: { row, column: column + 1 } } });
        possibleMoves.push({ singleConfig: { targetCoordinate: { row, column: column - 1 } } });
        possibleMoves.push({ singleConfig: { targetCoordinate: { row: row + 1, column } } });
        possibleMoves.push({ singleConfig: { targetCoordinate: { row: row - 1, column } } });

        // Diagonal
        possibleMoves.push({ singleConfig: { targetCoordinate: { row: row + 1, column: column + 1 } } });
        possibleMoves.push({ singleConfig: { targetCoordinate: { row: row - 1, column: column + 1 } } });
        possibleMoves.push({ singleConfig: { targetCoordinate: { row: row + 1, column: column - 1 } } });
        possibleMoves.push({ singleConfig: { targetCoordinate: { row: row - 1, column: column - 1 } } });

        // Castle
        if (!this.hasMoved) {
            const kingRow = this.isWhitePiece() ? 0 : 7;

            // Castle King Side
            possibleMoves.push({
                singleConfig: {
                    targetCoordinate: { row: kingRow, column: 6 },
                    mustBeNotMovedRook: [{ row: kingRow, column: 7 }],
                    mustBeEmptyCoordinates: [
                        { row: kingRow, column: 5 },
                        { row: kingRow, column: 6 },
                    ],
                    mustNotBeInCheck: [
                        { row: kingRow, column: 4 },
                        { row: kingRow, column: 5 },
                        { row: kingRow, column: 6 },
                    ],
                    moveType: MoveType.CASTLE_KING_SIDE,
                },
            });

            // Castle Queen Side
            possibleMoves.push({
                singleConfig: {
                    targetCoordinate: { row: kingRow, column: 2 },
                    mustBeNotMovedRook: [{ row: kingRow, column: 0 }],
                    mustBeEmptyCoordinates: [
                        { row: kingRow, column: 1 },
                        { row: kingRow, column: 2 },
                        { row: kingRow, column: 3 },
                    ],
                    mustNotBeInCheck: [
                        { row: kingRow, column: 1 },
                        { row: kingRow, column: 2 },
                        { row: kingRow, column: 3 },
                        { row: kingRow, column: 4 },
                    ],
                    moveType: MoveType.CASTLE_QUEEN_SIDE,
                },
            });
        }

        return possibleMoves;
    };
}
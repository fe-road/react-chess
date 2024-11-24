import { getValidMovesForRowAndColumn } from '../../services/move-service';
import BoardModel from '../BoardModel';
import { MoveModel } from '../MoveModel';
import { PlayerColor } from '../PlayerModel';
import SquareModel from '../SquareModel';
import PieceModel from './PieceModel';
import { PieceType } from './PieceType';

export default class QueenPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.QUEEN, color);
    }

    getValidMoves = (board: BoardModel, square: SquareModel): Array<MoveModel | null> => {
        const validMoves: Array<MoveModel | null> = [];
        const { row, column } = square.coordinates;

        // Move within row
        validMoves.push(
            ...getValidMovesForRowAndColumn(board, square, {
                startPos: column + 1,
                endPos: 7,
                increment: 1,
                rowIncrement: 0,
                columnIncrement: 1,
            })
        );
        validMoves.push(
            ...getValidMovesForRowAndColumn(board, square, {
                startPos: column - 1,
                endPos: 0,
                increment: -1,
                rowIncrement: 0,
                columnIncrement: -1,
            })
        );
        // Move within column
        validMoves.push(
            ...getValidMovesForRowAndColumn(board, square, {
                startPos: row + 1,
                endPos: 7,
                increment: 1,
                rowIncrement: 1,
                columnIncrement: 0,
            })
        );
        validMoves.push(
            ...getValidMovesForRowAndColumn(board, square, {
                startPos: row - 1,
                endPos: 0,
                increment: -1,
                rowIncrement: -1,
                columnIncrement: 0,
            })
        );

        // Move within Diagonal
        validMoves.push(
            ...getValidMovesForRowAndColumn(board, square, {
                startPos: row + 1,
                endPos: 7,
                increment: 1,
                rowIncrement: 1,
                columnIncrement: -1,
            })
        );
        validMoves.push(
            ...getValidMovesForRowAndColumn(board, square, {
                startPos: row + 1,
                endPos: 7,
                increment: 1,
                rowIncrement: 1,
                columnIncrement: 1,
            })
        );
        validMoves.push(
            ...getValidMovesForRowAndColumn(board, square, {
                startPos: row - 1,
                endPos: 0,
                increment: -1,
                rowIncrement: -1,
                columnIncrement: -1,
            })
        );
        validMoves.push(
            ...getValidMovesForRowAndColumn(board, square, {
                startPos: row - 1,
                endPos: 0,
                increment: -1,
                rowIncrement: -1,
                columnIncrement: 1,
            })
        );

        return validMoves;
    };
}
import { checkValidMove } from '../../services/move-service';
import BoardModel from '../BoardModel';
import { MoveModel } from '../MoveModel';
import { PlayerColor } from '../PlayerModel';
import SquareModel from '../SquareModel';
import PieceModel from './PieceModel';
import { PieceType } from './PieceType';

export default class KnightPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.KNIGHT, color);
    }

    getValidMoves = (board: BoardModel, square: SquareModel): Array<MoveModel | null> => {
        const validMoves: Array<MoveModel | null> = [];
        const { row, column } = square.coordinates;

        validMoves.push(checkValidMove(board, square, { row: row + 2, column: column + 1 }).move);
        validMoves.push(checkValidMove(board, square, { row: row + 2, column: column - 1 }).move);
        validMoves.push(checkValidMove(board, square, { row: row - 2, column: column + 1 }).move);
        validMoves.push(checkValidMove(board, square, { row: row - 2, column: column - 1 }).move);

        validMoves.push(checkValidMove(board, square, { row: row + 1, column: column + 2 }).move);
        validMoves.push(checkValidMove(board, square, { row: row + 1, column: column - 2 }).move);
        validMoves.push(checkValidMove(board, square, { row: row - 1, column: column + 2 }).move);
        validMoves.push(checkValidMove(board, square, { row: row - 1, column: column - 2 }).move);

        return validMoves;
    };
}
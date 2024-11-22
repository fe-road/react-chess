import { PieceType } from '../../constants/piece-info';
import { checkValidMove } from '../../services/move-service';
import BoardModel from '../BoardModel';
import { CoordinateModel } from '../CoordinateModel';
import { PlayerColor } from '../PlayerModel';
import SquareModel from '../SquareModel';
import PieceModel from './PieceModel';

export default class PawnPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.PAWN, color);
    }

    getValidMoves = (board: BoardModel, square: SquareModel): Array<CoordinateModel | null> => {
        const validMoves: Array<CoordinateModel | null> = [];
        const { row, column } = square.coordinates;

        if (square.piece?.color === PlayerColor.WHITE) {
            validMoves.push(checkValidMove(board, square, { row: row + 1, column }, true).move);
            validMoves.push(checkValidMove(board, square, { row: row + 1, column: column - 1 }, false, true).move);
            validMoves.push(checkValidMove(board, square, { row: row + 1, column: column + 1 }, false, true).move);
            if (row === 1) {
                validMoves.push(checkValidMove(board, square, { row: row + 2, column }, true).move);
            }
        } else {
            validMoves.push(checkValidMove(board, square, { row: row - 1, column }, true).move);
            validMoves.push(checkValidMove(board, square, { row: row - 1, column: column - 1 }, false, true).move);
            validMoves.push(checkValidMove(board, square, { row: row - 1, column: column + 1 }, false, true).move);
            if (row === 6) {
                validMoves.push(checkValidMove(board, square, { row: row - 2, column }, true).move);
            }
        }

        return validMoves;
    };
}
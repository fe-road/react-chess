import { PieceType } from '../../constants/piece-info';
import { checkValidMove } from '../../services/move-service';
import BoardModel from '../BoardModel';
import { MoveHistoryModel, MoveModel, MoveType } from '../MoveModel';
import { PlayerColor } from '../PlayerModel';
import SquareModel from '../SquareModel';
import PieceModel from './PieceModel';

export default class PawnPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.PAWN, color);
    }

    getValidMoves = (board: BoardModel, square: SquareModel, lastMove: MoveHistoryModel | null): Array<MoveModel | null> => {
        const validMoves: Array<MoveModel | null> = [];
        const { row, column } = square.coordinates;

        if (square.piece?.color === PlayerColor.WHITE) {
            validMoves.push(checkValidMove(board, square, { row: row + 1, column }, true).move);
            validMoves.push(checkValidMove(board, square, { row: row + 1, column: column - 1 }, false, true).move);
            validMoves.push(checkValidMove(board, square, { row: row + 1, column: column + 1 }, false, true).move);
            if (row === 1) {
                validMoves.push(checkValidMove(board, square, { row: row + 2, column }, true).move);
            }
            if (
                row === 4 &&
                lastMove?.piece === PieceType.PAWN &&
                lastMove.color === PlayerColor.BLACK &&
                lastMove?.to.row === 4 &&
                (lastMove?.to.column === column - 1 || lastMove?.to.column === column + 1)
            ) {
                validMoves.push({ row: 5, column: lastMove.to.column, type: MoveType.EN_PASSANT });
            }
        } else {
            validMoves.push(checkValidMove(board, square, { row: row - 1, column }, true).move);
            validMoves.push(checkValidMove(board, square, { row: row - 1, column: column - 1 }, false, true).move);
            validMoves.push(checkValidMove(board, square, { row: row - 1, column: column + 1 }, false, true).move);
            if (row === 6) {
                validMoves.push(checkValidMove(board, square, { row: row - 2, column }, true).move);
            }
            if (
                row === 3 &&
                lastMove?.piece === PieceType.PAWN &&
                lastMove.color === PlayerColor.WHITE &&
                lastMove?.to.row === 3 &&
                (lastMove?.to.column === column - 1 || lastMove?.to.column === column + 1)
            ) {
                validMoves.push({ row: 2, column: lastMove.to.column, type: MoveType.EN_PASSANT });
            }
        }

        return validMoves;
    };
}
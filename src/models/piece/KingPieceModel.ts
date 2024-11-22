import { PieceType } from '../../constants/piece-info';
import { checkIfRookAndNotMoved, checkValidMove } from '../../services/move-service';
import BoardModel from '../BoardModel';
import { MoveModel, MoveType } from '../MoveModel';
import { PlayerColor } from '../PlayerModel';
import SquareModel from '../SquareModel';
import PieceModel from './PieceModel';

export default class KingPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.KING, color);
    }

    getValidMoves = (board: BoardModel, square: SquareModel): Array<MoveModel | null> => {
        const validMoves: Array<MoveModel | null> = [];
        const { row, column } = square.coordinates;

        validMoves.push(checkValidMove(board, square, { row, column: column + 1 }).move);
        validMoves.push(checkValidMove(board, square, { row, column: column - 1 }).move);
        validMoves.push(checkValidMove(board, square, { row: row + 1, column }).move);
        validMoves.push(checkValidMove(board, square, { row: row - 1, column }).move);

        validMoves.push(checkValidMove(board, square, { row: row + 1, column: column + 1 }).move);
        validMoves.push(checkValidMove(board, square, { row: row - 1, column: column + 1 }).move);
        validMoves.push(checkValidMove(board, square, { row: row + 1, column: column - 1 }).move);
        validMoves.push(checkValidMove(board, square, { row: row - 1, column: column - 1 }).move);

        // Castle
        if (!this.hasMoved) {
            const kingRow = this.isWhitePiece() ? 0 : 7;
            // King Side
            const squareRookKingPiece = board.getSquareOnCoordinate({ row: kingRow, column: 7 })?.piece;
            const pieceColumn5 = board.getSquareOnCoordinate({ row: kingRow, column: 5 })?.piece;
            const pieceColumn6 = board.getSquareOnCoordinate({ row: kingRow, column: 6 })?.piece;
            if (checkIfRookAndNotMoved(squareRookKingPiece) && !pieceColumn5 && !pieceColumn6) {
                validMoves.push({ row: kingRow, column: 6, type: MoveType.CASTLE_KING_SIDE });
            }
            // Queen Side
            const squareRookQueenPiece = board.getSquareOnCoordinate({ row: kingRow, column: 0 })?.piece;
            const pieceColumn1 = board.getSquareOnCoordinate({ row: kingRow, column: 1 })?.piece;
            const pieceColumn2 = board.getSquareOnCoordinate({ row: kingRow, column: 2 })?.piece;
            const pieceColumn3 = board.getSquareOnCoordinate({ row: kingRow, column: 3 })?.piece;
            if (checkIfRookAndNotMoved(squareRookQueenPiece) && !pieceColumn1 && !pieceColumn2 && !pieceColumn3) {
                validMoves.push({ row: kingRow, column: 2, type: MoveType.CASTLE_QUEEN_SIDE });
            }
        }

        return validMoves;
    };
}
import { CoordinateModel } from '../models/CoordinateModel';
import { PieceType } from '../models/PieceModel';
import { PlayerColor } from '../models/PlayerModel';
import SquareModel from '../models/SquareModel';

export const getValidMoves = (square: SquareModel | null): Array<CoordinateModel> => {
    if (!square || !square?.piece) return [];
    const validMoves: Array<CoordinateModel> = [];
    const { row, column } = square.coordinates;
    
    if (square.piece.type === PieceType.PAWN) {
        if (square.piece.color === PlayerColor.WHITE) {
            validMoves.push({ row: row + 1, column });
            if (row === 1) {
                validMoves.push({ row: row + 2, column });
            }
        } else {
            validMoves.push({ row: row - 1, column });
            if (row === 6) {
                validMoves.push({ row: row - 2, column });
            }
        }
    }

    if (square.piece.type === PieceType.ROOK || square.piece.type === PieceType.QUEEN) {
        for (let i = 0; i < 8; i++) {
            validMoves.push({ row, column: i });
            validMoves.push({ row: i, column });
        }
    }
    
    if (square.piece.type === PieceType.KNIGHT) {
        validMoves.push({ row: row + 2, column: column + 1 });
        validMoves.push({ row: row + 2, column: column - 1 });
        validMoves.push({ row: row - 2, column: column + 1 });
        validMoves.push({ row: row - 2, column: column - 1 });

        validMoves.push({ row: row + 1, column: column + 2 });
        validMoves.push({ row: row + 1, column: column - 2 });
        validMoves.push({ row: row - 1, column: column + 2 });
        validMoves.push({ row: row - 1, column: column - 2 });
    }
    
    if (square.piece.type === PieceType.BISHOP || square.piece.type === PieceType.QUEEN) {
        for (let i = 0; i < 8; i++) {
            validMoves.push({ row: row + i, column: column - i });
            validMoves.push({ row: row + i, column: column + i });
            validMoves.push({ row: row - i, column: column - i });
            validMoves.push({ row: row - i, column: column + i });
        }
    }
    
    if (square.piece.type === PieceType.KING) {
        validMoves.push({ row, column: column + 1 });
        validMoves.push({ row, column: column - 1 });
        validMoves.push({ row: row + 1, column });
        validMoves.push({ row: row - 1, column });
        
        validMoves.push({ row: row + 1, column: column + 1 });
        validMoves.push({ row: row - 1, column: column + 1 });
        validMoves.push({ row: row + 1, column: column - 1 });
        validMoves.push({ row: row - 1, column: column - 1 });
    }
    
    return validMoves.filter((move) => move.row >= 0 && move.row < 8 && move.column >= 0 && move.column < 8 && (move.row !== row || move.column !== column));
    // return board.squares
    //     .filter(
    //         (boardSquare) =>
    //             boardSquare.coordinates.column !== selectedSquare?.coordinates.column ||
    //             boardSquare.coordinates.row !== selectedSquare?.coordinates.row
    //     )
    //     .map((boardSquare) => boardSquare.coordinates);
}
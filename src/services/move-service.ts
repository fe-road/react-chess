import { CoordinateModel } from './../models/CoordinateModel';
import BoardModel from '../models/BoardModel';
import SquareModel from '../models/SquareModel';
import { MoveHistoryModel, MoveModel, MoveType } from '../models/MoveModel';
import PieceModel from '../models/piece/PieceModel';
import { PieceType } from '../constants/piece-info';

export interface MoveCheck {
    move: MoveModel | null;
    shouldBreak: boolean;
}

export interface RowColumnValidMoveCheck {
    startPos: number;
    endPos: number;
    increment: number;
    rowIncrement: number;
    columnIncrement: number;
}

export const checkIfRookAndNotMoved = (piece: PieceModel | undefined | null): boolean => {
    return !!piece && piece.type === PieceType.ROOK && !piece.hasMoved;
};

export const checkValidMove = (board: BoardModel, square: SquareModel, targetCoordinate: CoordinateModel, blockIfOppositeColor = false, blockIfEmpty = false): MoveCheck => {
    const moveCheck: MoveCheck = {
        move: null,
        shouldBreak: false,
    };

    const targetSquare = board.getSquareOnCoordinate(targetCoordinate);
    if (targetSquare?.piece) {
        if (targetSquare?.piece.color !== square.piece?.color && !blockIfOppositeColor) {
            moveCheck.move = { ...targetCoordinate, type: MoveType.NORMAL };
        }
        moveCheck.shouldBreak = true;
    } else if (!blockIfEmpty) {
        moveCheck.move = { ...targetCoordinate, type: MoveType.NORMAL };
    }

    return moveCheck;
};

export const getValidMovesForRowAndColumn = (
    board: BoardModel,
    square: SquareModel,
    { startPos, endPos, increment, rowIncrement, columnIncrement }: RowColumnValidMoveCheck
): Array<MoveModel> => {
    const validMoves: Array<MoveModel> = [];
    const { row, column } = square.coordinates;

    for (let i = startPos; increment > 0 ? i <= endPos : i >= endPos; i += increment) {
        const count = Math.abs(i - startPos) + 1;

        const newMove: MoveModel = { row, column, type: MoveType.NORMAL };
        if (columnIncrement) {
            newMove.column = column + count * columnIncrement;
        }
        if (rowIncrement) {
            newMove.row = row + count * rowIncrement;
        }

        const possibleMove = checkValidMove(board, square, newMove);
        if (possibleMove.move) {
            validMoves.push(possibleMove.move);
        }
        if (possibleMove.shouldBreak) {
            break;
        }
    }

    return validMoves;
};

export const getValidMoves = (board: BoardModel, square: SquareModel | null, lastMove: MoveHistoryModel | null): Array<MoveModel> => {
    if (!square || !square?.piece) return [];
    const { row, column } = square.coordinates;
    const validMoves: Array<MoveModel | null> = square.piece.getValidMoves(board, square, lastMove);
    return validMoves
        .filter((move) => !!move)
        .filter(
            (move) => move.row >= 0 && move.row < 8 && move.column >= 0 && move.column < 8 && (move.row !== row || move.column !== column)
        );
};
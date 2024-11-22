import { CoordinateModel } from './../models/CoordinateModel';
import BoardModel from '../models/BoardModel';
import SquareModel from '../models/SquareModel';

export interface MoveCheck {
    move: CoordinateModel | null;
    shouldBreak: boolean;
}

export interface RowColumnValidMoveCheck {
    startPos: number;
    endPos: number;
    increment: number;
    rowIncrement: number;
    columnIncrement: number;
}

export const checkValidMove = (board: BoardModel, square: SquareModel, targetCoordinate: CoordinateModel, blockIfOppositeColor = false, blockIfEmpty = false): MoveCheck => {
    const moveCheck: MoveCheck = {
        move: null,
        shouldBreak: false,
    };

    const targetSquare = board.getSquareOnCoordinate(targetCoordinate);
    if (targetSquare?.piece) {
        if (targetSquare?.piece.color !== square.piece?.color && !blockIfOppositeColor) {
            moveCheck.move = targetCoordinate;
        }
        moveCheck.shouldBreak = true;
    } else if (!blockIfEmpty) {
        moveCheck.move = targetCoordinate;
    }

    return moveCheck;
};

export const getValidMovesForRowAndColumn = (
    board: BoardModel,
    square: SquareModel,
    { startPos, endPos, increment, rowIncrement, columnIncrement }: RowColumnValidMoveCheck
): Array<CoordinateModel> => {
    const validMoves: Array<CoordinateModel> = [];
    const { row, column } = square.coordinates;

    for (let i = startPos; increment > 0 ? i <= endPos : i >= endPos; i += increment) {
        const count = Math.abs(i - startPos) + 1;

        const newCoordinates: CoordinateModel = { row, column };
        if (columnIncrement) {
            newCoordinates.column = column + count * columnIncrement;
        }
        if (rowIncrement) {
            newCoordinates.row = row + count * rowIncrement;
        }

        const possibleMove = checkValidMove(board, square, newCoordinates);
        if (possibleMove.move) {
            validMoves.push(possibleMove.move);
        }
        if (possibleMove.shouldBreak) {
            break;
        }
    }

    return validMoves;
};

export const getValidMoves = (board: BoardModel, square: SquareModel | null): Array<CoordinateModel> => {
    if (!square || !square?.piece) return [];
    const { row, column } = square.coordinates;
    const validMoves: Array<CoordinateModel | null> = square.piece.getValidMoves(board, square);
    return validMoves.filter((move) => !!move).filter((move) => move.row >= 0 && move.row < 8 && move.column >= 0 && move.column < 8 && (move.row !== row || move.column !== column));
}
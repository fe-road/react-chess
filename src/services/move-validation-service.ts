import { CoordinateModel } from './../models/CoordinateModel';
import BoardModel from '../models/BoardModel';
import SquareModel from '../models/SquareModel';
import { MoveHistoryModel, MoveModel, MoveType } from '../models/MoveModel';
import PieceModel from '../models/piece/PieceModel';
import { PlayerColor } from '../models/PlayerModel';
import { PieceType } from '../models/piece/PieceType';

export interface MoveCheck {
    move: MoveModel | null;
    shouldBreak: boolean;
}

export interface PossibleMove {
    blockCheckVerify?: boolean;
    mustNotBeInCheck?: boolean;
    singleConfig?: SingleValidMoveCheck;
    rowColumnConfig?: RowColumnValidMoveCheck;
}

export interface SingleValidMoveCheck {
    targetCoordinate: CoordinateModel;
    moveType?: MoveType;
    blockIfOppositeColor?: boolean;
    blockIfEmpty?: boolean;
    // Castle
    mustBeNotMovedRookCoordinates?: Array<CoordinateModel>;
    mustBeEmptyCoordinates?: Array<CoordinateModel>;
    mustNotBeInCheckCoordinates?: Array<CoordinateModel>;
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

export const getAllValidMovesForPlayer = (board: BoardModel, color: PlayerColor, blockCheckVerify = true): Array<MoveModel> => {
    const allMoves: Array<MoveModel> = [];
    const allPlayerSquarePieces = board.squares.filter((square: SquareModel) => square.piece && square.piece.color === color);
    allPlayerSquarePieces.forEach((square: SquareModel) => {
        allMoves.push(...getValidMoves(board, square, undefined, blockCheckVerify));
    });
    return allMoves;
};

export const wouldBeInCheck = (board: BoardModel, square: SquareModel, move: MoveModel | null): boolean => {
    const newBoard: BoardModel = new BoardModel(board);
    
    if (move) {
        newBoard.movePiece(square, newBoard.getSquareOnCoordinate({ row: move.row, column: move.column }));
    }

    const allOpponentValidMoves: Array<MoveModel> = getAllValidMovesForPlayer(
        newBoard,
        square.piece?.isWhitePiece() ? PlayerColor.BLACK : PlayerColor.WHITE
    );
    if (allOpponentValidMoves.find((elem: MoveModel) => elem.givesCheck)) {
        return true;
    }

    return false;
};

export const checkValidMoveSpecialCases = (
    board: BoardModel,
    square: SquareModel,
    possibleMove: PossibleMove,
    moveCheck: MoveCheck
): boolean => {
    if (!possibleMove.singleConfig) return true;
    let isValidMove = true;
    const { mustBeNotMovedRookCoordinates, mustBeEmptyCoordinates, mustNotBeInCheckCoordinates } = possibleMove.singleConfig;

    if (!possibleMove.blockCheckVerify) {
        if (wouldBeInCheck(board, square, moveCheck.move)) {
            isValidMove = false;
        }
        if (possibleMove.mustNotBeInCheck && wouldBeInCheck(board, square, null)) {
            isValidMove = false;
        }
        if (mustNotBeInCheckCoordinates?.length) {
            mustNotBeInCheckCoordinates.forEach((coordinate: CoordinateModel) => {
                if (wouldBeInCheck(board, square, { ...coordinate, type: MoveType.NORMAL })) {
                    isValidMove = false;
                }
            });
        }
    }
    if (mustBeNotMovedRookCoordinates?.length) {
        mustBeNotMovedRookCoordinates.forEach((coordinate: CoordinateModel) => {
            if (!checkIfRookAndNotMoved(board.getSquareOnCoordinate(coordinate)?.piece)) {
                isValidMove = false;
            }
        });
    }
    if (mustBeEmptyCoordinates?.length) {
        mustBeEmptyCoordinates.forEach((coordinate: CoordinateModel) => {
            if (board.getSquareOnCoordinate(coordinate)?.piece) {
                isValidMove = false;
            }
        });
    }

    return isValidMove;
};

export const checkValidMove = (board: BoardModel, square: SquareModel, possibleMove: PossibleMove): MoveCheck => {
    const moveCheck: MoveCheck = {
        move: null,
        shouldBreak: false,
    };
    if (!possibleMove.singleConfig) return moveCheck;

    const { targetCoordinate, blockIfOppositeColor, blockIfEmpty, moveType } = possibleMove.singleConfig;

    const targetSquare = board.getSquareOnCoordinate(targetCoordinate);
    if (targetSquare?.piece) {
        if (targetSquare?.piece.color !== square.piece?.color && !blockIfOppositeColor) {
            moveCheck.move = { ...targetCoordinate, type: moveType ?? MoveType.NORMAL };
            moveCheck.move.givesCheck = targetSquare?.piece.type === PieceType.KING;
        }
        moveCheck.shouldBreak = true;
    } else if (!blockIfEmpty) {
        moveCheck.move = { ...targetCoordinate, type: moveType ?? MoveType.NORMAL };
    }

    if (!checkValidMoveSpecialCases(board, square, possibleMove, moveCheck)) {
        moveCheck.move = null;
    }

    return moveCheck;
};

export const getValidMovesForRowAndColumn = (board: BoardModel, square: SquareModel, possibleMove: PossibleMove): Array<MoveModel> => {
    if (!possibleMove.rowColumnConfig) return [];

    const validMoves: Array<MoveModel> = [];
    const { row, column } = square.coordinates;
    const { startPos, endPos, increment, rowIncrement, columnIncrement } = possibleMove.rowColumnConfig;

    for (let i = startPos; increment > 0 ? i <= endPos : i >= endPos; i += increment) {
        const count = Math.abs(i - startPos) + 1;

        const possibleColumn = columnIncrement ? column + count * columnIncrement : column;
        const possibleRow = rowIncrement ? row + count * rowIncrement : row;

        const newPossibleMove: PossibleMove = {
            blockCheckVerify: possibleMove.blockCheckVerify,
            singleConfig: { targetCoordinate: { row: possibleRow, column: possibleColumn }, moveType: MoveType.NORMAL },
        };
        const checkedMoved = checkValidMove(board, square, newPossibleMove);
        if (checkedMoved.move) {
            validMoves.push(checkedMoved.move);
        }
        if (checkedMoved.shouldBreak) {
            break;
        }
    }

    return validMoves;
};

export const getValidMoves = (
    board: BoardModel,
    square: SquareModel | null,
    lastMove: MoveHistoryModel | undefined,
    blockCheckVerify = false
): Array<MoveModel> => {
    if (!square || !square?.piece) return [];
    const { row, column } = square.coordinates;
    const possibleMoves: Array<PossibleMove> = square.piece.getMoves(square.coordinates, lastMove);

    const validMoves: Array<MoveModel | null> = [];
    possibleMoves.forEach((move: PossibleMove) => {
        const newMove = { ...move, blockCheckVerify };
        if (newMove.singleConfig) {
            validMoves.push(checkValidMove(board, square, newMove).move);
        }
        if (newMove.rowColumnConfig) {
            validMoves.push(...getValidMovesForRowAndColumn(board, square, newMove));
        }
    });

    return validMoves
        .filter((move) => !!move)
        .filter(
            (move) => move.row >= 0 && move.row < 8 && move.column >= 0 && move.column < 8 && (move.row !== row || move.column !== column)
        );
};

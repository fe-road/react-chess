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

const getAllValidMovesForPlayer = (board: BoardModel, color: PlayerColor): Array<MoveModel> => {
    const allMoves: Array<MoveModel> = [];
    const allPlayerSquarePieces = board.squares.filter((square: SquareModel) => square.piece && square.piece.color === color);
    allPlayerSquarePieces.forEach((square: SquareModel) => {
        // allMoves.push(...getValidMoves(board, square, null));
    });
    return allMoves;
}

const isInCheck = (board: BoardModel, square: SquareModel, move: MoveModel | null): boolean => {
    if (!move) return false;

    const newBoard: BoardModel = new BoardModel(board);
    newBoard.movePiece(square, newBoard.getSquareOnCoordinate({ row: move.row, column: move.column }), move);

    const allOpponentValidMoves: Array<MoveModel> = getAllValidMovesForPlayer(
        board,
        square.piece?.isWhitePiece() ? PlayerColor.BLACK : PlayerColor.WHITE
    );
    if (allOpponentValidMoves.find((elem: MoveModel) => elem.givesCheck)) {
        return true;
    }

    return false;
}

export const checkValidMove = (
    board: BoardModel,
    square: SquareModel,
    targetCoordinate: CoordinateModel,
    blockIfOppositeColor = false,
    blockIfEmpty = false,
    shouldVerifyCheck = true,
): MoveCheck => {
    const moveCheck: MoveCheck = {
        move: null,
        shouldBreak: false,
    };

    const targetSquare = board.getSquareOnCoordinate(targetCoordinate);
    if (targetSquare?.piece) {
        if (targetSquare?.piece.color !== square.piece?.color && !blockIfOppositeColor) {
            moveCheck.move = { ...targetCoordinate, type: MoveType.NORMAL };
            moveCheck.move.givesCheck = targetSquare?.piece.type === PieceType.KING;
        }
        moveCheck.shouldBreak = true;
    } else if (!blockIfEmpty) {
        moveCheck.move = { ...targetCoordinate, type: MoveType.NORMAL };
    }

    if (shouldVerifyCheck && isInCheck(board, square, moveCheck.move)) {
        moveCheck.move = null;
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

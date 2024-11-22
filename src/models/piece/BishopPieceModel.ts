import { PieceType } from '../../constants/piece-info';
import { getValidMovesForRowAndColumn } from '../../services/move-service';
import BoardModel from '../BoardModel';
import { MoveModel } from '../MoveModel';
import { PlayerColor } from '../PlayerModel';
import SquareModel from '../SquareModel';
import PieceModel from './PieceModel';

export default class BishopPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.BISHOP, color);
    }

    getValidMoves = (board: BoardModel, square: SquareModel): Array<MoveModel | null> => {
        const validMoves: Array<MoveModel | null> = [];
        const { row } = square.coordinates;

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
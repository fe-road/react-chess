import { PossibleMove } from '../../services/move-validation-service';
import { CoordinateModel } from '../CoordinateModel';
import { MoveHistoryModel, MoveType } from '../MoveModel';
import { PlayerColor } from '../PlayerModel';
import PieceModel from './PieceModel';
import { PieceType } from './PieceType';

export default class PawnPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.PAWN, color);
    }

    getMoves = (coordinates: CoordinateModel, lastMove: MoveHistoryModel | undefined): Array<PossibleMove> => {
        const possibleMoves: Array<PossibleMove> = [];
        const { row, column } = coordinates;

        const direction = this.isWhitePiece() ? 1 : -1;
        const startingRow = this.isWhitePiece() ? 1 : 6;
        const moveType: MoveType = ((this.isWhitePiece() && row === 6) || (!this.isWhitePiece() && row === 1)) ? MoveType.PROMOTION : MoveType.NORMAL;
        
        // Normal Move
        possibleMoves.push({ singleConfig: { targetCoordinate: { row: row + (1 * direction), column }, blockIfOppositeColor: true, moveType } });
        // Capture Moves
        possibleMoves.push({
            singleConfig: {
                targetCoordinate: { row: row + 1 * direction, column: column - 1 },
                blockIfOppositeColor: false,
                blockIfEmpty: true,
                moveType,
            },
        });
        possibleMoves.push({
            singleConfig: {
                targetCoordinate: { row: row + 1 * direction, column: column + 1 },
                blockIfOppositeColor: false,
                blockIfEmpty: true,
                moveType,
            },
        });
        // Double Initial Move
        if (row === startingRow) {
            possibleMoves.push({ singleConfig: { targetCoordinate: { row: row + 2 * direction, column }, blockIfOppositeColor: true } });
        }

        // En Passant
        if (
            ((this.isWhitePiece() && row === 4 && lastMove?.color === PlayerColor.BLACK && lastMove?.to.row === 4) ||
            (!this.isWhitePiece() && row === 3 && lastMove?.color === PlayerColor.WHITE && lastMove?.to.row === 3)) &&
            lastMove?.piece === PieceType.PAWN &&
            (lastMove?.to.column === column - 1 || lastMove?.to.column === column + 1)
        ) {
            possibleMoves.push({ singleConfig: { targetCoordinate: { row: row + 1 * direction, column: lastMove.to.column }, moveType: MoveType.EN_PASSANT } });
        }

        return possibleMoves;
    }
}
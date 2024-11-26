import { pieceClasses } from '../constants/piece-info';
import { getValidMoves } from '../services/move-validation-service';
import BoardModel from './BoardModel';
import { CoordinateModel } from './CoordinateModel';
import { MoveHistoryModel, MoveModel, MoveType } from './MoveModel';
import PieceModel from './piece/PieceModel';
import { PieceType } from './piece/PieceType';
import { PlayerColor } from './PlayerModel';
import SquareModel from './SquareModel';

export default class GameModel {
    board: BoardModel;
    playerTurn: PlayerColor;
    moveHistory: Array<MoveHistoryModel>;
    promotionCoordinates: CoordinateModel | null;

    constructor() {
        this.board = new BoardModel(null);
        this.playerTurn = PlayerColor.WHITE;
        this.moveHistory = [];
        this.promotionCoordinates = null;
    }

    switchPlayerTurn = (): void => {
        this.playerTurn = this.playerTurn === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE;
    };

    getLastMove = (): MoveHistoryModel | undefined => {
        if (!this.moveHistory?.length) return undefined;
        return this.moveHistory[this.moveHistory.length - 1];
    };

    makeRookCastleMove = (piece: PieceModel, rookColumn: number, targetColumn: number): void => {
        const kingRow = piece.isWhitePiece() ? 0 : 7;
        const rookPiece = this.board.getSquareOnCoordinate({ row: kingRow, column: rookColumn })?.piece;
        rookPiece?.setHasMoved(true);
        this.board.updateSquarePiece({ row: kingRow, column: targetColumn }, rookPiece || null);
        this.board.updateSquarePiece({ row: kingRow, column: rookColumn }, null);
    };

    selectPromotionPiece = (type: PieceType): void => {
        if (this.promotionCoordinates) {
            this.board.updateSquarePiece(this.promotionCoordinates, new pieceClasses[type](this.playerTurn));
            this.promotionCoordinates = null;

            const lastMove = this.getLastMove();
            if (lastMove) {
                lastMove.type = MoveType.PROMOTION;
                lastMove.promotedTo = type;
                this.moveHistory = [...this.moveHistory.slice(0, -1), lastMove];
            }
            this.switchPlayerTurn();
        }
    };

    movePiece = (currentSquare: SquareModel, finalSquare: SquareModel, move: MoveModel | undefined): void => {
        const { piece } = currentSquare;
        const { piece: capturedPiece } = finalSquare;

        if (piece && !this.promotionCoordinates) {
            this.moveHistory.push({
                from: currentSquare.coordinates,
                to: finalSquare.coordinates,
                piece: piece.type,
                color: this.playerTurn,
                captured: capturedPiece?.type,
                type: move?.type || MoveType.NORMAL,
            });

            piece.setHasMoved(true);
            this.board.movePiece(currentSquare, finalSquare);

            if (move?.type === MoveType.CASTLE_KING_SIDE) {
                this.makeRookCastleMove(piece, 7, 5);
            }
            if (move?.type === MoveType.CASTLE_QUEEN_SIDE) {
                this.makeRookCastleMove(piece, 0, 3);
            }
            // if (move?.type === MoveType.EN_PASSANT) {
            //     const row = piece.isWhitePiece() ? finalSquare.coordinates.row - 1 : finalSquare.coordinates.row + 1;
            //     board.updateSquarePiece({ row, column: finalSquare.coordinates.column }, null);
            // }
            // if (move?.type === MoveType.PROMOTION) {
            //     setPromotionCoordinates(finalSquare.coordinates);
            //     return;
            // }
            this.switchPlayerTurn();
        }
    };

    getValidMoves = (square: SquareModel | null): Array<MoveModel> => {
        return getValidMoves(this.board, square, this.getLastMove());
    };
}
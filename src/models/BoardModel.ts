import PieceModel from './piece/PieceModel';
import SquareModel from './SquareModel';

import { initialPiecePositions } from '../constants/initial-piece-positions';
import { CoordinateModel } from './CoordinateModel';
import { isSameCoordinate } from '../services/coordinate-service';
import { pieceClasses } from '../constants/piece-info';

export default class BoardModel {
    squares: Array<SquareModel> = [];

    constructor(boardToCopy: BoardModel | null) {
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                const square = new SquareModel(row, column);

                if (boardToCopy) {
                    const squareToCopy = boardToCopy.getSquareOnCoordinate({ row, column });
                    if (squareToCopy?.piece) {
                        square.setPiece(new pieceClasses[squareToCopy?.piece.type](squareToCopy?.piece.color));
                    }
                } else {
                    initialPiecePositions.forEach((item) => {
                        if (item.rows.includes(row) && item.columns.includes(column)) {
                            square.setPiece(new pieceClasses[item.pieceType](item.playerColor));
                        }
                    });
                }

                this.squares.push(square);
            }
        }
    }

    updateSquarePiece = (coordinate: CoordinateModel, piece: PieceModel | null): void => {
        const squareIndex = this.squares.findIndex(
            (square) => square.coordinates.column === coordinate.column && square.coordinates.row === coordinate.row
        );
        this.squares[squareIndex].setPiece(piece);
    };

    getSquareOnCoordinate = (coordinate: CoordinateModel): SquareModel | undefined => {
        return this.squares.find((item) => isSameCoordinate(item.coordinates, coordinate));
    };

    movePiece = (currentSquare: SquareModel, finalSquare: SquareModel | undefined): void => {
        if (currentSquare && finalSquare) {
            const { piece } = currentSquare;
            this.updateSquarePiece(finalSquare.coordinates, piece);
            this.updateSquarePiece(currentSquare.coordinates, null);
        }
    };
}

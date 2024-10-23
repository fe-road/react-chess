import PieceModel from './PieceModel';
import SquareModel from './SquareModel';

import { initialPiecePositions } from '../constants/initial-piece-positions';

export default class BoardModel {
    squares: Array<SquareModel> = [];

    constructor() {
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                const square = new SquareModel(row, column);
                initialPiecePositions.forEach((item) => {
                    if (item.rows.includes(row) && item.columns.includes(column)) {
                        square.setPiece(new PieceModel(item.pieceType, item.playerColor));
                    }
                });
                this.squares.push(square);
            }
        }
    }
}

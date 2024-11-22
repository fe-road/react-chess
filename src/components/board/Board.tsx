import { useCallback, useMemo, useState } from 'react';

import BoardModel from '../../models/BoardModel';
import SquareModel from '../../models/SquareModel';
import { PlayerColor } from '../../models/PlayerModel';

import Square from './Square';
import { getValidMoves } from '../../services/move-service';
import { MoveHistoryModel, MoveModel } from '../../models/MoveModel';

interface Props {
    board: BoardModel;
    playerTurn: PlayerColor;
    playingAsWhite: boolean;
    moveHistoryList: Array<MoveHistoryModel>;
    movePiece: (currentSquare: SquareModel, finalSquare: SquareModel, move: MoveModel | undefined) => void;
}

const Board = ({ board, playerTurn, playingAsWhite, moveHistoryList, movePiece }: Props) => {
    const [selectedSquare, setSelectedSquare] = useState<SquareModel | null>(null);

    const validMoves: Array<MoveModel> = useMemo(() => {
        return getValidMoves(board, selectedSquare, moveHistoryList.length ? moveHistoryList[moveHistoryList.length - 1] : null);
    }, [board, selectedSquare, moveHistoryList]);

    const isValidMove = useCallback(
        (square: SquareModel): boolean => {
            return validMoves.some(
                (validMoveCoordinates) =>
                    validMoveCoordinates.column === square.coordinates.column && validMoveCoordinates.row === square.coordinates.row
            );
        },
        [validMoves]
    );

    const getMove = useCallback(
        (square: SquareModel): MoveModel | undefined => {
            return validMoves.find(
                (validMoveCoordinates) =>
                    validMoveCoordinates.column === square.coordinates.column && validMoveCoordinates.row === square.coordinates.row
            );
        },
        [validMoves]
    );

    const isSameAsSelectedSquare = (square: SquareModel): boolean => {
        return (
            square?.coordinates.row === selectedSquare?.coordinates.row && square?.coordinates.column === selectedSquare?.coordinates.column
        );
    };

    const selectSquare = (square: SquareModel) => {
        if (selectedSquare && isValidMove(square)) {
            if (!isSameAsSelectedSquare(square)) {
                movePiece(selectedSquare, square, getMove(square));
            }
            setSelectedSquare(null);
        } else {
            setSelectedSquare(square);
        }
    };

    return (
        <section className='grid grid-rows-8 grid-cols-8 w-100 mx-auto my-2 aspect-square border shadow'>
            {board.squares.map((square: SquareModel) => (
                <div
                    key={`square_${square.coordinates.row}_${square.coordinates.column}`}
                    className={`w-full h-full col-start-${playingAsWhite ? square.coordinates.column + 1 : 8 - square.coordinates.column} row-start-${playingAsWhite ? 8 - square.coordinates.row : square.coordinates.row + 1}`}
                >
                    <Square
                        square={square}
                        showCoordinateColumn={square.coordinates.row === 0}
                        showCoordinateRow={square.coordinates.column === 0}
                        showAsValidMove={isValidMove(square)}
                        isSelected={isSameAsSelectedSquare(square)}
                        canSelect={square.piece?.color === playerTurn || isValidMove(square)}
                        select={selectSquare}
                    />
                </div>
            ))}
        </section>
    );
};

export default Board;

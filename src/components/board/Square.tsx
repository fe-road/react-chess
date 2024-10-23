import { PlayerColor } from '../../models/PlayerModel';
import SquareModel from '../../models/SquareModel';
import { getPieceIcon } from '../../services/piece-service';
import { getSquareCoordinates, isLightSquare } from '../../services/square-service';

import './square.css';

interface Props {
    square: SquareModel;
}

const Board = ({ square }: Props) => {
    return (
        <div className={`w-full h-full ${isLightSquare(square) ? 'bg-white' : 'bg-orange-700'}`}>
            <span>{getSquareCoordinates(square)}</span>
            {square.piece && (
                <i
                    className={`fa-solid ${getPieceIcon(square.piece)} ${square.piece.color === PlayerColor.WHITE ? 'text-white icon-shadow-black' : 'text-black icon-shadow-white'}`}
                ></i>
            )}
        </div>
    );
};

export default Board;

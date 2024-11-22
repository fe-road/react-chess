import { pieceNotation } from '../constants/piece-info';
import { MoveHistoryModel, MoveType } from '../models/MoveModel';
import { columnNotation } from '../models/SquareModel';

interface Props {
    moveList: Array<MoveHistoryModel>;
}

const MoveHistory = ({ moveList }: Props) => {

    const getMoveNotation = (move: MoveHistoryModel): string => {
        if (move.type === MoveType.CASTLE_KING_SIDE) {
            return 'O-O';
        }
        if (move.type === MoveType.CASTLE_QUEEN_SIDE) {
            return 'O-O-O';
        }
        return `${pieceNotation[move.piece]}${move.captured ? 'x' : ''}${columnNotation[move.to.column]}${move.to.row + 1}`;
    };

    return (
        <section className='w-100 flex flex-wrap'>
            {moveList.map((move, index) => (
                <span key={index} className='text-xs mx-0.5'>
                    {index % 2 === 0 && <span className='mr-1 ml-2 text-gray-400'>{index / 2 + 1}.</span>}
                    <span>{getMoveNotation(move)}</span>
                </span>
            ))}
        </section>
    );
}

export default MoveHistory;
import { pieceIcons } from '../constants/piece-info';
import { PieceType } from '../models/piece/PieceType';

interface Props {
    isWhitePiece: boolean;
    select: (piece: PieceType) => void;
}

const PromotionChoice = ({ isWhitePiece, select }: Props) => {
    const possiblePieceTypes: Array<PieceType> = [PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP, PieceType.QUEEN];

    return (
        <section className='w-100 py-2 flex justify-center items-center gap-2'>
            {possiblePieceTypes.map((pieceType) => (
                <span key={pieceType} onClick={() => select(pieceType)}>
                    <i
                        className={`fa-solid fa-2xl ${pieceIcons[pieceType]} ${isWhitePiece ? 'text-white icon-shadow-black' : 'text-black icon-shadow-white'}`}
                    ></i>
                </span>
            ))}
        </section>
    );
};

export default PromotionChoice;
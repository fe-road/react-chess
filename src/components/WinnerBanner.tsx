import { PlayerColor } from '../models/PlayerModel';

interface Props {
    color: PlayerColor;
}

const WinnerBanner = ({ color }: Props) => {
    return <h3 className='text-2xl text-center w-full'>{color} WINS</h3>;
};

export default WinnerBanner;
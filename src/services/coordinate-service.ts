import { CoordinateModel } from '../models/CoordinateModel';

export const isSameCoordinate = (coordinate1: CoordinateModel, coordinate2: CoordinateModel): boolean => {
    return coordinate1.row === coordinate2.row && coordinate1.column === coordinate2.column;
};
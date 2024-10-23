import SquareModel from '../models/SquareModel';

const columnNotation: Record<number, string> = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
};

export const getSquareCoordinates = (square: SquareModel): string => {
    return `${columnNotation[square.column]}${square.row + 1}`;
};

export const isLightSquare = (square: SquareModel): boolean => {
    return (square.column + square.row) % 2 !== 0;
};

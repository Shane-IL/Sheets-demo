import { atom } from 'recoil';

const sheetStateAtom = atom({
    key: 'sheetStateAtom',
    default: {
        rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'Q'],
        columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
});


export default sheetStateAtom

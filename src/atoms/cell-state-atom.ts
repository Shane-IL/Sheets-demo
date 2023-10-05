import type { CellState } from '../types/cell-state';

import { atomFamily } from 'recoil';

const cellStateFamily = atomFamily({
    key: 'cellStateFamily',
    default: ({
        value: '',
        formula: '',
        dependencies: [],
    } as CellState)
});

export default cellStateFamily;
import { useRecoilValue } from 'recoil';
import sheetStateAtom from '../atoms/sheet-state-atom';

import Cell from './cell';

export default function Sheet() {
    const { rows, columns } = useRecoilValue(sheetStateAtom);

    // Create a flat list of cells where each cell knows its row and column
    const cells = rows.flatMap((row) =>
        columns.map((col) => ({
            row,
            col,
            id: `${row}${col}`,
        }))
    );

    return (
        <div
            className="grid grid-cols-[repeat(16,minmax(100px,1fr))] gap-2 p-2"
            style={{ gridTemplateRows: `repeat(${rows.length}, 1fr)` }}
        >
            {cells.map(({ id }) => (
                <Cell key={id} id={id} />
            ))}
        </div>
    );
}
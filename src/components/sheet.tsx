import { useRecoilValue } from 'recoil';
import sheetStateAtom from '../atoms/sheet-state-atom';
import Cell from './cell';
import Label from './label';

export default function Sheet() {
    const { rows, columns } = useRecoilValue(sheetStateAtom);

    const cells = rows.flatMap((row, rowIndex) =>
        columns.map((col, colIndex) => ({
            row: rowIndex + 1,
            col: colIndex + 1,
            id: `${row}${col}`,
        }))
    );

    return (
        <div className="relative">
            {/* Row Labels */}
            <div 
                className="absolute top-4 left-0 flex flex-col items-center gap-2 p-2" 
                style={{ paddingTop: '3rem', gap: '0.5rem' }}
            >
                {rows.map((_, rowIndex) => (
                    <Label key={`rowId-${rowIndex}`} labelFor="Row" index={rowIndex} />
                ))}
            </div>

            {/* Column Labels */}
            <div 
                className="absolute top-0 left-4 flex flex-row items-center gap-2 p-2"
                style={{ paddingLeft: '6rem', gap: '0.5rem' }}
            >
                {columns.map((_, colIndex) => (
                    <Label key={`colId-${colIndex}`} labelFor="Col" index={colIndex} />
                ))}
            </div>

            {/* Cells */}
            <div 
                className="grid grid-cols-[repeat(16,minmax(6rem,1fr))] gap-2 p-2 pl-28 pt-16" 
            >
                {cells.map(({ id }) => (
                    <Cell key={id} id={id} />
                ))}
            </div>
        </div>
    );
}

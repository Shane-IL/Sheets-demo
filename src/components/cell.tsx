import type { CellState } from '../types/cell-state';
import type { ChangeEvent } from 'react';

import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { computedCellStateFamily, setCellFormulaSelector, setCellValueSelector } from '../selectors/cell-state-selectors';

export default function Cell({ id }: { id: string }) {
    const computedCellState: CellState = useRecoilValue(computedCellStateFamily(id));
    const setFormula = useSetRecoilState(setCellFormulaSelector(id));
    const setValue = useSetRecoilState(setCellValueSelector(id));
    const [isEditing, setIsEditing] = useState(false);

    // When the user changes the value of the cell, we need to update the cell state
    const handleCellChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if(newValue === '') setValue({
            ...computedCellState,
            value: ''
        });

        // If the user didn't change the value, don't do anything
        if (newValue === computedCellState.value || newValue === computedCellState.formula) {
            return;
        }

        // If the user entered a formula, update the formula
        if (newValue.startsWith('=')) {
            setFormula({
                ...computedCellState,
                formula: newValue
            });
            return;
        }


        // If the user entered a value, update the value
        setValue({
            ...computedCellState,
            value: newValue
        });
    }

    const handleToggleEditing = () => {
        setIsEditing(!isEditing);
    }

    useEffect(() => {
        if (computedCellState.error) {
            setHasError(true);
        }
    }
        , [computedCellState.error]
    );


    return (
        <div onDoubleClick={handleToggleEditing} className={`w-24 h-12 border-gray-300 text-white grid place-content-center ${isEditing ? 'border-2' : 'border'}`}>
            {
                isEditing ? (
                    <input
                        className="w-full h-full bg-transparent m-0 p-0 text-center outline-none text-white "
                        defaultValue={computedCellState.formula || computedCellState.value}
                        onBlur={(e) => {
                            handleCellChange(e);
                            setIsEditing(false)
                        }
                        }
                    />
                ) : (
                    computedCellState.value || <span className='text-blue-300'>{id}</span>
                )
            }

        </div>
    );

}
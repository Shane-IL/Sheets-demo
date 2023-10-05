import type { CellState } from '../types/cell-state';
import type { ChangeEvent } from 'react';

import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {computedCellStateFamily, setCellFormulaSelector, setCellValueSelector } from '../selectors/cell-state-selectors';

export default function Cell({id}:{id:string}) {
    const computedCellState:CellState = useRecoilValue(computedCellStateFamily(id));
    const setFormula = useSetRecoilState(setCellFormulaSelector(id));
    const setValue = useSetRecoilState(setCellValueSelector(id));
    const [isEditing, setIsEditing] = useState(false);

    const handleCellChange = (e:ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if(newValue === '') {
            return;
        }

        if(newValue === computedCellState.value) {
            return;
        }

        if(newValue.startsWith('=')) {
            setFormula({
                ...computedCellState,
                formula: newValue
            });
            return;
        }

        setValue({
            ...computedCellState,
            value: newValue
        });
    }

    const handleToggleEditing = () => {
        setIsEditing(!isEditing);
    }


    return (
        <div onDoubleClick={handleToggleEditing} className="w-24 h-12 bg-red-500 grid place-content-center">
            {
                isEditing ? (
                    <input
                        className="w-full h-full bg-transparent text-right"
                        defaultValue={computedCellState.formula || computedCellState.value}
                        onBlur={(e) => {
                            handleCellChange(e);
                            setIsEditing(false)}
                        }
                    />
                ) : (
                    computedCellState.value || <span className='text-blue-300'>{id}</span>
                )
            }

        </div>
    );

}
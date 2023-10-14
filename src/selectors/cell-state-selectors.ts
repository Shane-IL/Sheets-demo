import { selectorFamily, DefaultValue } from 'recoil';

import cellStateFamily from '../atoms/cell-state-atom';
import { evaluateFormula } from '../helpers/formula-helpers';
import { CellState } from '../types/cell-state';

export const computedCellStateFamily = selectorFamily({
  key: 'computedCellStateFamily',
  get: (cellId) => ({ get }) => {
    const cell = get(cellStateFamily(cellId));

    if (cell.formula) {
      const { value, dependencies, hasError } = evaluateFormula(cell.formula, get);
      return {
        ...cell,
        value,
        dependencies,
        hasError
      };
    } else {
      return cell;
    }
  },
});

export const setCellFormulaSelector = selectorFamily<CellState, string>({
  key: 'setCellFormulaSelector',
  get: (cellId) => ({ get }) => get(cellStateFamily(cellId)),
  set: (cellId) => ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(cellStateFamily(cellId), newValue);
      return;
    }
    const { formula } = newValue;
    const dependencies = formula.slice(1).match(/[A-Z][0-9]+/g) || [];
    set(cellStateFamily(cellId), {
      value: '',
      formula,
      dependencies,
    });
  },
});

export const setCellValueSelector = selectorFamily<CellState, string>({
  key: 'setCellValueSelector',
  get: (cellId) => ({ get }) => get(cellStateFamily(cellId)),
  set: (cellId) => ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(cellStateFamily(cellId), newValue);
      return;
    }
    const { value } = newValue;
    set(cellStateFamily(cellId), {
      value,
      formula: '',
      dependencies: [],
    });
  },
});
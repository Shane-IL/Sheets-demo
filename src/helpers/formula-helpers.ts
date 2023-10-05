import { GetRecoilValue } from 'recoil';

import cellStateFamily from '../atoms/cell-state-atom';

export const evaluateFormula = (formula: string, cellStateGetter: GetRecoilValue) => {
  const dependencies = formula.slice(1).match(/[A-Z][0-9]+/g) || [];
  let evalString = formula.slice(1);
  const invalidDependencies = [];

  for (const dependency of dependencies) {
    const dependencyValue = cellStateGetter(cellStateFamily(dependency)).value;

    if (isNaN(Number(dependencyValue))) {
      invalidDependencies.push(dependency);
      continue;
    }

    evalString = evalString.replace(new RegExp(dependency, 'g'), dependencyValue);
  }

  if (invalidDependencies.length > 0) {
    return {
      value: `Error: Unsupported value(s) in ${invalidDependencies.join(', ')}`,
      dependencies,
    };
  }

  try {
    return {
      value: eval(evalString),
      dependencies,
    };
  } catch (error) {
    console.error('Error evaluating formula: ', error);
    return {
      value: 'Error',
      dependencies,
    };
  }
};

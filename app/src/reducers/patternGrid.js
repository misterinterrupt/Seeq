import {
  TOGGLE_PATTERN_CELL
} from '../actions';

const patternGrid = (state, action) => {
  switch (action.type) {
    case TOGGLE_PATTERN_CELL:

      const patternCells = [...state.patterns];
      const {x, y} = action;

      const val = patternCells[y * state.width + x];

      patternCells[y * state.width + x] = val === 1 ? 0 : 1;

      return {
        ...state,
        patterns: patternCells
      };
    default:
      return state;
  }
};

export default patternGrid;

import {
  ADD_SELECT_PATTERN
} from '../actions';

const selectablePatternGrid = (state, action) => {
  switch (action.type) {
    case ADD_SELECT_PATTERN:

      let newPattern = [];
      let patternExists = state.patterns.filter(pattern => pattern.id === action.id).length === 1;

      if(!patternExists) {
        newPattern = [{id:action.id}];
      }

      return {
        ...state,
        editorData: {
          selectedPatterns: [action.id]
        },
        patterns: newPattern.concat(state.patterns).sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
      };
    default:
      return state;
  }
};

export default selectablePatternGrid;

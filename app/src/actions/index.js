// action types for patternGrid

export const ADD_SELECT_PATTERN = 'ADD_SELECT_PATTERN';

// create action for selecting a pattern slot in the pattern grid
// (adds a new pattern if one does not exist at that index)

export const addSelectPattern = (id) => ({ type: ADD_SELECT_PATTERN, id })

// action types

export const TOGGLE_PATTERN_CELL = 'TOGGLE_PATTERN_CELL';

// action creators

export const togglePatternCell = ({x, y}) => ({
  type: TOGGLE_PATTERN_CELL,
  x,
  y
})

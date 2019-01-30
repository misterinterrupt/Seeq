// action types for sectionGrid

export const ADD_SELECT_SECTION = 'ADD_SELECT_SECTION';

// create action for selecting a section slot in the section grid
// (adds a new section if one does not exist at that index)

export const addSelectSection = (id) => ({ type: ADD_SELECT_SECTION, id })

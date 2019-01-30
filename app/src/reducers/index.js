import {
  ADD_SELECT_SECTION
} from '../actions';

const selectableSectionGrid = (state, action) => {
  switch (action.type) {
    case ADD_SELECT_SECTION:

      let newSection = [];
      let sectionExists = state.sections.filter(section => section.id === action.id).length === 1;

      if(!sectionExists) {
        newSection = [{id:action.id}];
      }

      return {
        ...state,
        editorData: {
          selectedSections: [action.id]
        },
        sections: newSection.concat(state.sections).sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
      };
    default:
      return state;
  }
};

export default selectableSectionGrid;

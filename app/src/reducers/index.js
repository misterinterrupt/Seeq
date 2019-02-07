import { combineReducers } from 'redux';

import {
  ADD_SELECT_SECTION,
  INCREMENT_SEQUENCE_SLOT_SEQUENCE,
  DECREMENT_SEQUENCE_SLOT_SEQUENCE,
  ADD_SEQUENCE_TO_SECTION,
  DELETE_SEQUENCE_FROM_SECTION
} from '../actions';

const rootReducer = (state={}, action) => {

  let sortById = (listOfObjectsWithIds) => {
    return listOfObjectsWithIds.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  }

  let determineNextId = (listOfObjectsWithIds, currentId, direction) => {
    let sortedList = sortById(listOfObjectsWithIds);
    let modifier = direction=="UP"?1:-1;
    let nextId;
    let currentItemIndex = sortedList.findIndex((item) => {
      return item.id === currentId;
    });
    let nextItemIndex = currentItemIndex + modifier;
    if(nextItemIndex<0) {
      nextItemIndex = sortedList.length-1;
    } else if(nextItemIndex>=sortedList.length) {
      nextItemIndex = 0;
    }
    return sortedList[nextItemIndex].id;
  }

  const addSelectSection = () => {
    let newSection = [];
    let sectionExists = state.sections.filter(section => section.id === action.id).length === 1;
    if(!sectionExists) {
      newSection = [{
        id: action.id,
        name: "section " + action.id.toString(),
        selectedSequenceSlot: 0,
        sequenceSlots: []
      }];
    }

    return {
      ...state,
      editorData: {
        selectedSections: [action.id]
      },
      sections: sortById(newSection.concat(state.sections))
    };
  };

  const incrementSequenceSlotId = (state, action) => {
    let nextSequenceId = determineNextId(state.sequences, action.sequenceId, "UP");
    return updateSequenceSlotId(state, action, nextSequenceId);
  }

  const decrementSequenceSlotId = (state, action) => {
    let previousSequenceId = determineNextId(state.sequences, action.sequenceId, "Down");
    return updateSequenceSlotId(state, action, previousSequenceId);
  }

  const updateSequenceSlotId = (state={}, action, nextSequenceId) => {
    if(action.sequenceId === nextSequenceId) {
      return {...state};
    }
    let updatedSectionIndex = state.sections.findIndex(section => {
      return section.id === state.editorData.selectedSections[0];
    });
    let updatedSections = [...state.sections];
    updatedSections[updatedSectionIndex] = {
      ...updatedSections[updatedSectionIndex],
      sequenceslots: [
        ...updatedSections[updatedSectionIndex].sequenceSlots.splice(action.slotIndex, 1, nextSequenceId)
      ]
    };
    return {
      ...state,
      sections: sortById(updatedSections)
    };
  };

  const addSequenceToSection = (state={}, action) => {
    let updatedSections = [...state.sections];
    let sectionIndex = updatedSections.findIndex(section => {
      return section.id === state.editorData.selectedSections[0]
    });
    let newSequenceId = state.sequences.length + 0;
    updatedSections[sectionIndex].sequenceSlots.push(newSequenceId);
    // add new sequence
    let updatedSequences = [
      ...state.sequences,
      {
        id: newSequenceId,
        noteData: []
      }
    ];
    return {
      ...state,
      sections: sortById(updatedSections),
      sequences: sortById(updatedSequences)
    };
  };

  const deleteSequenceFromSection = (state, action) => {
    let updatedSections = [...state.sections];
    let sectionIndex = updatedSections.findIndex(section => {
      return section.id === state.editorData.selectedSections[0]
    });
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      sequenceslots: [...updatedSections[sectionIndex].sequenceSlots.splice(action.slotIndex, 1)]
    }
    return {
      ...state,
      sections: sortById(updatedSections)
    };
  }

  switch (action.type) {
    case ADD_SELECT_SECTION:
      return addSelectSection(state, action);

    case INCREMENT_SEQUENCE_SLOT_SEQUENCE:
      return incrementSequenceSlotId(state, action);

    case DECREMENT_SEQUENCE_SLOT_SEQUENCE:
      return decrementSequenceSlotId(state, action);

    case ADD_SEQUENCE_TO_SECTION:
      return addSequenceToSection(state, action);

    case DELETE_SEQUENCE_FROM_SECTION:
      return deleteSequenceFromSection(state, action);

    default:
      return {...state};
  }

};

export default rootReducer;

import { combineReducers } from 'redux';

import {
  ADD_SELECT_SECTION,
  SELECT_SEQUENCE_SLOT,
  INCREMENT_SEQUENCE_SLOT_SEQUENCE,
  DECREMENT_SEQUENCE_SLOT_SEQUENCE,
  ADD_SEQUENCE_TO_SECTION,
  DELETE_SEQUENCE_FROM_SECTION,
  ADD_NOTE_TO_SEQUENCE
} from '../actions';

const rootReducer = (state={}, action) => {

  let sortById = (listOfObjectsWithIds) => {
    return listOfObjectsWithIds.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  }

  let determineSequentialId  = (listOfObjectsWithIds, currentId, direction) => {
    let sortedList = sortById(listOfObjectsWithIds);
    let modifier = direction=="NEXT"?1:-1;
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

  let determineSelectedSectionIndex = (state) => {
    return state.sections.findIndex(section => {
      return section.id === state.editorData.selectedSections[0];
    });
  }

  const addSelectSection = () => {
    let newSection = [];
    let sectionExists = state.sections.filter(section => section.id === action.id).length === 1;
    if(!sectionExists) {
      newSection = [{
        id: action.id,
        label: "section " + action.id.toString(),
        selectedSequenceSlot: [0],
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

  const selectSequenceSlot = (state, action) => {
    let updatedSectionIndex = determineSelectedSectionIndex(state);
    let updatedSections = [...state.sections];
    updatedSections[updatedSectionIndex] = {
      ...updatedSections[updatedSectionIndex],
      selectedSequenceSlot: [action.sequenceSlotIndex]
    }
    return {
      ...state,
      sections: sortById(updatedSections)
    };
  }

  const incrementSequenceSlotId = (state, action) => {
    let nextSequenceId = determineSequentialId (state.sequences, action.sequenceId, "NEXT");
    return updateSequenceSlotId(state, action, nextSequenceId);
  }

  const decrementSequenceSlotId = (state, action) => {
    let previousSequenceId = determineSequentialId (state.sequences, action.sequenceId, "PREVIOUS");
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
      sequenceSlots: [
        ...updatedSections[updatedSectionIndex].sequenceSlots
      ]
    };
    updatedSections[updatedSectionIndex].sequenceSlots.splice(action.sequenceSlotIndex, 1, nextSequenceId)
    return {
      ...state,
      sections: sortById(updatedSections)
    };
  };

  const addSequenceToSection = (state={}, action) => {
    let updatedSections = [...state.sections];
    let sectionIndex = updatedSections.findIndex(section => {
      return section.id === state.editorData.selectedSections[0];
    });
    let newSequenceId = state.sequences.length;
    updatedSections[sectionIndex].sequenceSlots.push(newSequenceId);
    // now select the new sequence, always at the end of the list
    updatedSections[sectionIndex].selectedSequenceSlot = [updatedSections[sectionIndex].sequenceSlots.length-1]
    let updatedSequences = [
      ...state.sequences,
      {
        id: newSequenceId,
        label: "seq " + newSequenceId,
        noteData: Array(16).fill(0).map(x => [])
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
      sequenceSlots: [...updatedSections[sectionIndex].sequenceSlots]
    }
    // maintain the selected slot index unless that slot disappears
    let newlySelectedSlot = updatedSections[sectionIndex].selectedSequenceSlot[0];
    if(action.sequenceSlotIndex < updatedSections[sectionIndex].selectedSequenceSlot[0]
      || updatedSections[sectionIndex].selectedSequenceSlot[0] === updatedSections[sectionIndex].sequenceSlots.length - 1) {
      newlySelectedSlot = updatedSections[sectionIndex].selectedSequenceSlot[0] - 1;
    }
    updatedSections[sectionIndex].selectedSequenceSlot = [newlySelectedSlot]
    updatedSections[sectionIndex].sequenceSlots.splice(action.sequenceSlotIndex, 1)
    return {
      ...state,
      sections: sortById(updatedSections)
    };
  }

  const addNoteToSequence = (state, action) => {
    let updatedNotes = [...state.notes];
    let newNoteId = updatedNotes.length;
    let newNote = {
      id: newNoteId,
      pitch: 'C3',
      velocity: 100
    };
    updatedNotes.push(newNote);
    // TODO:: factor these array accesses into nested functions for readability

    let selectedSequenceSlotIndex = state.sections[state.editorData.selectedSections[0]].selectedSequenceSlot[0];
    let selectedSequenceId = state.sections[state.editorData.selectedSections[0]].sequenceSlots[selectedSequenceSlotIndex];
    let updatedSequences = [...state.sequences];
    let updatedSequenceIndex = updatedSequences.findIndex((sequence=>sequence.id===selectedSequenceId));
    let updatedSequence = {
      ...updatedSequences[updatedSequenceIndex],
      noteData: [...updatedSequences[updatedSequenceIndex].noteData]
    };
    updatedSequence.noteData[action.notePosition].push(newNoteId);
    updatedSequences[updatedSequenceIndex] = updatedSequence;
    return {
      ...state,
      sequences: updatedSequences,
      notes: updatedNotes
    }
  }

  switch (action.type) {
    case ADD_SELECT_SECTION:
      return addSelectSection(state, action);

    case SELECT_SEQUENCE_SLOT:
      return selectSequenceSlot(state, action);

    case INCREMENT_SEQUENCE_SLOT_SEQUENCE:
      return incrementSequenceSlotId(state, action);

    case DECREMENT_SEQUENCE_SLOT_SEQUENCE:
      return decrementSequenceSlotId(state, action);

    case ADD_SEQUENCE_TO_SECTION:
      return addSequenceToSection(state, action);

    case DELETE_SEQUENCE_FROM_SECTION:
      return deleteSequenceFromSection(state, action);

    case ADD_NOTE_TO_SEQUENCE:
      return addNoteToSequence(state, action);

    default:
      return {...state};
  }

};

export default rootReducer;

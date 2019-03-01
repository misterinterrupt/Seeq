import { combineReducers } from 'redux';
import { MusicalConstants, TimingConstants } from '../constants'

import {
  ADD_SELECT_SECTION,
  SELECT_SEQUENCE_SLOT,
  INCREMENT_SEQUENCE_SLOT_SEQUENCE,
  DECREMENT_SEQUENCE_SLOT_SEQUENCE,
  ADD_SEQUENCE_TO_SECTION,
  DELETE_SEQUENCE_FROM_SECTION,
  TOGGLE_NOTE_IN_SEQUENCE,
  REGISTER_TRANSPORT
} from '../actions';

export const sortById = (listOfObjectsWithIds) => {
  return listOfObjectsWithIds.sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
};

const rootReducer = (state={}, action) => {


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
  };

  let determineSelectedSectionIndex = (state) => {
    return state.sections.findIndex(section => {
      return section.id === state.editorData.selectedSections[0];
    });
  };

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
        ...state.editorData,
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
  };

  const incrementSequenceSlotId = (state, action) => {
    let nextSequenceId = determineSequentialId(state.sequences, action.sequenceId, "NEXT");
    return updateSequenceSlotId(state, action, nextSequenceId);
  };

  const decrementSequenceSlotId = (state, action) => {
    let previousSequenceId = determineSequentialId (state.sequences, action.sequenceId, "PREVIOUS");
    return updateSequenceSlotId(state, action, previousSequenceId);
  };

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
        zoomNoteValue: '1/16',
        length: '1.0.000',
        noteData: {}
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
  };

  const toggleNoteInSequence = (state, action) => {
    let selectedSectionId = state.editorData.selectedSections[0];
    let selectedSection = state.sections.find(section => section.id === selectedSectionId);
    let selectedSequenceSlotIndex = selectedSection.selectedSequenceSlot[0];
    let selectedSequenceId = selectedSection.sequenceSlots[selectedSequenceSlotIndex];
    let updatedSequences = [...state.sequences];
    let updatedSequenceIndex = updatedSequences.findIndex((sequence=>sequence.id===selectedSequenceId));
    let updatedSequence = {
      ...updatedSequences[updatedSequenceIndex],
      noteData: {...updatedSequences[updatedSequenceIndex].noteData}
    };
    let pulsePositionOn = '' + action.noteTicks;
    let M = MusicalConstants;
    let T = TimingConstants;
    let noteLength = (M.note[updatedSequence.zoomNoteValue].noteValueToTickMultiplier * T.ppqn) - 4;
    let pulsePositionOff = '' + (action.noteTicks + noteLength);
    let newNoteOn = {
      type: 'on',
      pitch: 'C3',
      velocity: 127
    };
    let newNoteOff = {
      type: 'off',
      pitch: 'C3',
      velocity: 0
    };
    console.log('pulsePositionOn', pulsePositionOn);
    console.log('pulsePositionOff', pulsePositionOff);
    if(updatedSequence.noteData[pulsePositionOn] === undefined) {
      updatedSequence.noteData[pulsePositionOn] = [];
    }
    if(updatedSequence.noteData[pulsePositionOff] === undefined) {
      updatedSequence.noteData[pulsePositionOff] = [];
    }
    updatedSequence.noteData[pulsePositionOn].push(newNoteOn);
    updatedSequence.noteData[pulsePositionOff].push(newNoteOff);

    updatedSequences[updatedSequenceIndex] = updatedSequence;
    return {
      ...state,
      sequences: updatedSequences
    }
  };

  const registerTransport = (state, action) => {
    let newTransport = {
      id: action.transportId,
      tempo: action.tempo,
      startTime: 0,
      currentPosition: 0,
      playing: false
    };
    let updatedTransports = [
      ...state.transports,
      newTransport
    ];
    return {
      ...state,
      transports: updatedTransports
    }
  };

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

    case TOGGLE_NOTE_IN_SEQUENCE:
      return toggleNoteInSequence(state, action);

    case REGISTER_TRANSPORT:
      return registerTransport(state, action);

    default:
      return {...state};
  }

};

export default rootReducer;

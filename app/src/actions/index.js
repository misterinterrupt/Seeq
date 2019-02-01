// action types for sectionGrid

export const ADD_SELECT_SECTION = 'ADD_SELECT_SECTION';
export const INCREMENT_SEQUENCE_SLOT_SEQUENCE = 'INCREMENT_SEQUENCE_SLOT_SEQUENCE';
export const DECREMENT_SEQUENCE_SLOT_SEQUENCE = 'DECREMENT_SEQUENCE_SLOT_SEQUENCE';
export const ADD_SEQUENCE_TO_SECTION = 'ADD_SEQUENCE_TO_SECTION';

// create action for selecting a section slot in the section grid
// (adds a new section if one does not exist at that index)

export const addSelectSection = (id) => ({
  type: ADD_SELECT_SECTION,
  id
});

export const incrementSequenceSlotId = (sectionId, sequenceId, slotIndex) => ({
  type: INCREMENT_SEQUENCE_SLOT_SEQUENCE,
  sectionId,
  sequenceId,
  slotIndex
});

export const decrementSequenceSlotId = (sectionId, sequenceId, slotIndex) => ({
  type: DECREMENT_SEQUENCE_SLOT_SEQUENCE,
  sectionId,
  sequenceId,
  slotIndex
});

export const addSequenceToSection = () => ({
  type: ADD_SEQUENCE_TO_SECTION
});

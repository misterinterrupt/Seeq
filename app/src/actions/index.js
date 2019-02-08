export const ADD_SELECT_SECTION = 'ADD_SELECT_SECTION';
export const INCREMENT_SEQUENCE_SLOT_SEQUENCE = 'INCREMENT_SEQUENCE_SLOT_SEQUENCE';
export const DECREMENT_SEQUENCE_SLOT_SEQUENCE = 'DECREMENT_SEQUENCE_SLOT_SEQUENCE';
export const ADD_SEQUENCE_TO_SECTION = 'ADD_SEQUENCE_TO_SECTION';
export const DELETE_SEQUENCE_FROM_SECTION = 'DELETE_SEQUENCE_FROM_SECTION';

export const addSelectSection = (id) => ({
  type: ADD_SELECT_SECTION,
  id
});

export const incrementSequenceSlotId = (sectionId, sequenceSlotIndex, sequenceId) => ({
  type: INCREMENT_SEQUENCE_SLOT_SEQUENCE,
  sectionId,
  sequenceId,
  sequenceSlotIndex
});

export const decrementSequenceSlotId = (sectionId, sequenceSlotIndex, sequenceId) => ({
  type: DECREMENT_SEQUENCE_SLOT_SEQUENCE,
  sectionId,
  sequenceId,
  sequenceSlotIndex
});

export const addSequenceToSection = () => ({
  type: ADD_SEQUENCE_TO_SECTION
});

export const deleteSequenceFromSection = (sequenceSlotIndex) => ({
  type: DELETE_SEQUENCE_FROM_SECTION,
  sequenceSlotIndex
})

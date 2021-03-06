export const ADD_SELECT_SECTION = 'ADD_SELECT_SECTION';
export const SELECT_SEQUENCE_SLOT = 'SELECT_SEQUENCE_SLOT';
export const INCREMENT_SEQUENCE_SLOT_SEQUENCE = 'INCREMENT_SEQUENCE_SLOT_SEQUENCE';
export const DECREMENT_SEQUENCE_SLOT_SEQUENCE = 'DECREMENT_SEQUENCE_SLOT_SEQUENCE';
export const ADD_SEQUENCE_TO_SECTION = 'ADD_SEQUENCE_TO_SECTION';
export const DELETE_SEQUENCE_FROM_SECTION = 'DELETE_SEQUENCE_FROM_SECTION';
export const ADD_NOTE_TO_SEQUENCE = 'ADD_NOTE_TO_SEQUENCE';

export const addSelectSection = (id) => ({
  type: ADD_SELECT_SECTION,
  id
});

export const selectSequenceSlot = (sequenceSlotIndex) => ({
  type: SELECT_SEQUENCE_SLOT,
  sequenceSlotIndex
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
});

export const addNoteToSequence = (notePosition) => ({
  type: 'ADD_NOTE_TO_SEQUENCE',
  notePosition
})

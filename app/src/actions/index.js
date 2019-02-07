export const ADD_SELECT_SECTION = 'ADD_SELECT_SECTION';
export const INCREMENT_SEQUENCE_SLOT_SEQUENCE = 'INCREMENT_SEQUENCE_SLOT_SEQUENCE';
export const DECREMENT_SEQUENCE_SLOT_SEQUENCE = 'DECREMENT_SEQUENCE_SLOT_SEQUENCE';
export const ADD_SEQUENCE_TO_SECTION = 'ADD_SEQUENCE_TO_SECTION';
export const DELETE_SEQUENCE_FROM_SECTION = 'DELETE_SEQUENCE_FROM_SECTION';

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

export const deleteSequenceFromSection = (slotIndex) => ({
  type: DELETE_SEQUENCE_FROM_SECTION,
  slotIndex
})

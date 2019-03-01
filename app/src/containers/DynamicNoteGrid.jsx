import React from 'react';
import { connect } from 'react-redux';

import { toggleNoteInSequence } from '../actions';

import NoteGrid from '../components/NoteGrid';

const mapStateToProps = (state, ownProps) => {
  let selectedSectionId = state.editorData.selectedSections[0];
  let selectedSection = state.sections.find(section => section.id === selectedSectionId);
  let showingSequenceSlotIndex = selectedSection.selectedSequenceSlot[0];
  let showingSequenceId = selectedSection.sequenceSlots[showingSequenceSlotIndex];
  return {
    showingSequence: state.sequences.find(sequence => sequence.id === showingSequenceId)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onNoteCellClick: noteIndex => dispatch(toggleNoteInSequence(noteIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteGrid)

import React from 'react';
import { connect } from 'react-redux';

import { addNoteToSequence } from '../actions';

import NoteGrid from '../components/NoteGrid';

const mapStateToProps = (state, ownProps) => {
  let showingSequenceIndex = state.sections[state.editorData.selectedSections[0]].selectedSequenceSlot[0];
  let showingSequenceId = state.sections[state.editorData.selectedSections[0]].sequenceSlots[showingSequenceIndex];
  return {
    showingSequence: state.sequences.find(sequence => sequence.id === showingSequenceId)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onNoteCellClick: notePosition => dispatch(addNoteToSequence(notePosition))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteGrid)

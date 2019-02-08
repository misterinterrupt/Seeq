import React from 'react';
import { connect } from 'react-redux';

import { addSequenceToSection } from '../actions';
import SequenceSlotGrid from '../components/SequenceSlotGrid';

const mapStateToProps = (state, ownProps) => {
  let section = state.sections.find((section) => section.id === state.editorData.selectedSections[0])
  let selectedSequenceSlot = section.selectedSequenceSlot[0];
  let sectionSequences = [];
  section.sequenceSlots.forEach((sequenceId, sequenceSlotIndex) => {
    sectionSequences.push({
      id: sequenceId,
      label: state.sequences.find((sequence) => sequence.id === sequenceId).label,
      sequenceSelected: sequenceSlotIndex === selectedSequenceSlot
    });
  });
  return {
    sectionSequences: sectionSequences
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddSequenceToSection: () => dispatch(addSequenceToSection())
});

export default connect(mapStateToProps, mapDispatchToProps)(SequenceSlotGrid);

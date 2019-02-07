import React from 'react';
import { connect } from 'react-redux';

import { addSequenceToSection } from '../actions';
import SequenceSlotGrid from '../components/SequenceSlotGrid';

const mapStateToProps = (state, ownProps) => {
  let section = state.sections.find((section) => section.id === state.editorData.selectedSections[0])
  return {
    sectionSequences: [...section.sequenceSlots]
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAddSequenceToSection: () => dispatch(addSequenceToSection())
});

export default connect(mapStateToProps, mapDispatchToProps)(SequenceSlotGrid);

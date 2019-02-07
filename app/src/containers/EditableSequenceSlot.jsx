import React from 'react';
import {connect} from 'react-redux';

import { incrementSequenceSlotId, decrementSequenceSlotId, deleteSequenceFromSection } from '../actions';

const EditableSequenceSlot = ({onDecrementClick, onIncrementClick, onDeleteSequenceClick, sectionId, sequenceSlotIndex, sequenceId}) => (
  <div key={sequenceSlotIndex} className="incrementableSequenceSlot">
    <p>{sequenceId}</p>
    <button
      className="incUp"
      onClick={() => onIncrementClick(sectionId, sequenceSlotIndex, sequenceId)}>
      +
    </button>
    <button
      className="incDown"
      onClick={() => onDecrementClick(sectionId, sequenceSlotIndex, sequenceId)}>
      -
    </button>
    <button
      className="deleteSequence"
      onClick={() => onDeleteSequenceClick(sequenceSlotIndex)}>
      x
    </button>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  sectionId: state.editorData.selectedSections[0],
  sequenceSlotIndex: ownProps.sequenceSlotIndex,
  sequenceId: ownProps.sequenceId
});

const mapDispatchToProps = (dispatch, ownprops) => ({
  onIncrementClick: (sectionId, sequenceSlotIndex, sequenceId) => dispatch(incrementSequenceSlotId(sectionId, sequenceId, sequenceSlotIndex)),
  onDecrementClick: (sectionId, sequenceSlotIndex, sequenceId) => dispatch(decrementSequenceSlotId(sectionId, sequenceId, sequenceSlotIndex)),
  onDeleteSequenceClick: (sequenceSlotIndex) => dispatch(deleteSequenceFromSection(sequenceSlotIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableSequenceSlot);

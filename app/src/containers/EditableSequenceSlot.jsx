  // combines two buttons for incrementing of a state variable which defined in props
import React from 'react';
import {connect} from 'react-redux';

import { incrementSequenceSlotId, decrementSequenceSlotId } from '../actions';

const EditableSequenceSlot = ({onDecrementClick, onIncrementClick, sectionId, sequenceSlotIndex, sequenceId}) => (
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
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  sectionId: state.editorData.selectedSections[0],
  sequenceSlotIndex: ownProps.sequenceSlotIndex,
  sequenceId: ownProps.sequenceId
});

const mapDispatchToProps = (dispatch, ownprops) => ({
  onIncrementClick: (sectionId, sequenceSlotIndex, sequenceId) => dispatch(incrementSequenceSlotId(sectionId, sequenceId, sequenceSlotIndex)),
  onDecrementClick: (sectionId, sequenceSlotIndex, sequenceId) => dispatch(decrementSequenceSlotId(sectionId, sequenceId, sequenceSlotIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableSequenceSlot);

import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import { selectSequenceSlot, incrementSequenceSlotId, decrementSequenceSlotId, deleteSequenceFromSection } from '../actions';

const EditableSequenceSlot = ({onSelectSequenceSlot, onDecrementClick, onIncrementClick, onDeleteSequenceClick, sectionId, sequenceSlotIndex, sequenceId, sequenceLabel, sequenceSelected}) => (
  <div
    key={sequenceSlotIndex}
    className={classNames({
      'incrementableSequenceSlot': true,
      'sequenceSelected': sequenceSelected
    })}
    onClick={() => onSelectSequenceSlot(sequenceSlotIndex, sequenceId)}
  >
    <div className="sequenceLabel">
      <p>{sequenceLabel}</p>
    </div>
    <div className="sequenceEditButtons">
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
        onClick={(e) => onDeleteSequenceClick(e, sequenceSlotIndex)}>
        x
      </button>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  sectionId: state.editorData.selectedSections[0],
  sequenceSlotIndex: ownProps.sequenceSlotIndex,
  sequenceId: ownProps.sequenceId,
  sequenceLabel: ownProps.sequenceLabel,
  sequenceSelected: ownProps.sequenceSelected
});

const mapDispatchToProps = (dispatch, ownprops) => ({
  onSelectSequenceSlot: (sequenceSlotIndex) => dispatch(selectSequenceSlot(sequenceSlotIndex)),
  onIncrementClick: (sectionId, sequenceSlotIndex, sequenceId) => dispatch(incrementSequenceSlotId(sectionId, sequenceSlotIndex, sequenceId)),
  onDecrementClick: (sectionId, sequenceSlotIndex, sequenceId) => dispatch(decrementSequenceSlotId(sectionId, sequenceSlotIndex, sequenceId)),
  onDeleteSequenceClick: (e, sequenceSlotIndex) =>  {
    e.stopPropagation();
    dispatch(deleteSequenceFromSection(sequenceSlotIndex));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableSequenceSlot);

import React from 'react';

import EditableSequenceSlot from '../containers/EditableSequenceSlot';

const SequenceSlotGrid = ({ sectionSequences, onAddSequenceToSection }) => {
  const sequenceSlots = [];
  sectionSequences.forEach((sequence, sequenceSlotIndex) => {
    sequenceSlots.push(
      <EditableSequenceSlot
        sequenceSlotIndex={sequenceSlotIndex}
        key={sequenceSlotIndex}
        sequenceId={sequence.id}
        sequenceLabel={sequence.label}
        sequenceSelected={sequence.sequenceSelected}
      />
    );
  });
  return (
    <div id='sequenceSlotGrid'>
    <button className="addSequenceButton" onClick={onAddSequenceToSection}>
    new sequence
    </button>
      {sequenceSlots}
    </div>
  );
}

export default SequenceSlotGrid;

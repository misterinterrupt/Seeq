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
      />
    );
  });
  return (
    <div id='sequenceSlotGrid'>
      {sequenceSlots}
      <button className="addSequenceButton" onClick={onAddSequenceToSection}>
      new sequence
      </button>
    </div>
  );
}

export default SequenceSlotGrid;

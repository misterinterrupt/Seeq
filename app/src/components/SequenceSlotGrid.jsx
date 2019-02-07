import React from 'react';

import EditableSequenceSlot from '../containers/EditableSequenceSlot';

const SequenceSlotGrid = ({ sectionSequences, onAddSequenceToSection }) => {
  const sequenceSlots = [];
  sectionSequences.forEach((sequenceId, sequenceSlotIndex) => {
    sequenceSlots.push(
      <EditableSequenceSlot
        sequenceSlotIndex={sequenceSlotIndex}
        key={sequenceSlotIndex}
        sequenceId={sequenceId}
      />
    );
  });
  return (
    <div id='sequenceSlotGrid'>
      {sequenceSlots}
      <button className="addSequenceButton" onClick={onAddSequenceToSection} />
    </div>
  );
}

export default SequenceSlotGrid;

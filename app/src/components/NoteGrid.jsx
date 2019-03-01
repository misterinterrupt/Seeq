import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { MusicalConstants } from '../constants';
import { noteValueToTicks, sequenceLengthToTicks } from '../conversions';

const NoteGrid = ({ showingSequence, onNoteCellClick }) => {

  let noteCells = [];

  if(showingSequence) {
    let gridLengthInTicks = sequenceLengthToTicks(showingSequence.length);
    let [gridBars, gridBeats, gridTicks] = showingSequence.length.split('.');
    let numSteps = parseInt(gridBars, 10) * MusicalConstants.note[showingSequence.zoomNoteValue].stepsPerBar;
    let ticksPerNoteIndex = noteValueToTicks(showingSequence.zoomNoteValue);
    for(let noteIndex=0; noteIndex<numSteps; noteIndex++) {
      let noteSteptick = noteIndex * ticksPerNoteIndex;
      noteCells.push(<div className={classNames({
        noteCell: true,
        noteExists: !!showingSequence.noteData[noteSteptick]
      })}
      key={noteIndex}
      onClick={() => onNoteCellClick(noteSteptick)}
      />);
    }
  } else {
    return(<div className='messageBox'><p className='messageText'>Create a New Sequence</p></div>);
  }

  return (
    <div id="noteGrid">
      {noteCells}
    </div>
  );
};

export default NoteGrid;

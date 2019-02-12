import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

const NoteGrid = ({ showingSequence, onNoteCellClick }) => {

  let gridLength = 16;
  let noteCells = [];

  if(showingSequence) {
    for(let noteIndex=0; noteIndex<gridLength; noteIndex++) {
      let showNote = showingSequence.noteData[noteIndex][0] > -1;
      noteCells.push(<div className={classNames({
        noteCell: true,
        noteExists: showNote
      })}
      key={noteIndex}
      onClick={() => onNoteCellClick(noteIndex)}
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

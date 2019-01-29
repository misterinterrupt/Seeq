import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import addSelectPattern from '../actions';

const PatternGrid = ({patternData, onPatternCellClick}) => {
  let patternsPerPage = 16;
  let cells = [];
    for (let x=0; x < patternsPerPage; x++) {
      let patternSelected = patternData.selected.includes(x);
      let patternExists = patternData.existing.filter(id => id === x).length === 1;
      cells.push(
        <div
          className={classNames({
            'patternCell': true,
            'patternSelected': patternSelected,
            'patternExists': patternExists
          })}
          key={x}
          onClick={() => onPatternCellClick(x)}
        />
      );
    }
  return <div id="patternGrid">{cells}</div>;
}

export default PatternGrid;

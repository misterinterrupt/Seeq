import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import addSelectSection from '../actions';

const SectionGrid = ({sectionData, onSectionCellClick}) => {
  let sectionsPerPage = 16;
  let cells = [];
    for (let x=0; x < sectionsPerPage; x++) {
      let sectionSelected = sectionData.selected.includes(x);
      let sectionExists = sectionData.existing.filter(id => id === x).length === 1;
      cells.push(
        <div
          className={classNames({
            'sectionCell': true,
            'sectionSelected': sectionSelected,
            'sectionExists': sectionExists
          })}
          key={x}
          onClick={() => onSectionCellClick(x)}
        />
      );
    }
  return <div id="sectionGrid">{cells}</div>;
}

export default SectionGrid;

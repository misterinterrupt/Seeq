import React from 'react';

import SelectableSectionGrid from '../containers/SelectableSectionGrid';
import ExpandableSequenceSlotGrid from '../containers/ExpandableSequenceSlotGrid';
import DynamicNoteGrid from '../containers/DynamicNoteGrid';

const App = () => (
  <div id="sectionEditor">
    <p>sections</p>
    <SelectableSectionGrid />
    <div className="sectionInfo" />
    <p>sequence slots</p>
    <ExpandableSequenceSlotGrid />
    <p>note editor</p>
    <DynamicNoteGrid />
  </div>
);

export default App;

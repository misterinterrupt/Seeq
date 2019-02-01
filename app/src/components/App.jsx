import React from 'react';

import SelectableSectionGrid from "../containers/SelectableSectionGrid";
import ExpandableSequenceSlotGrid from "../containers/ExpandableSequenceSlotGrid";


const App = () => (
  <div id="sectionEditor">
    <p>sections</p>
    <SelectableSectionGrid />
    <div className="sectionInfo" />
    <p>sequence slots</p>
    <ExpandableSequenceSlotGrid />
  </div>
);

export default App;

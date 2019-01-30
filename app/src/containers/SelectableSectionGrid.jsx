import React from 'react';
import {connect} from 'react-redux';

import SectionGrid from '../components/SectionGrid';
import { addSelectSection } from '../actions';

const getSectionGridData = (sections, editorData) => ({
  existing: sections.map(section => section.id),
  selected: editorData.selectedSections
})

const mapStateToProps = (state) => ({
  sectionData: getSectionGridData(state.sections, state.editorData)
});

const mapDispatchToProps = (dispatch) => ({
  onSectionCellClick: id => dispatch(addSelectSection(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionGrid);

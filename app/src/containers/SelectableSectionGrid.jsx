import React from 'react';
import {connect} from 'react-redux';

import SectionGrid from '../components/SectionGrid';
import { addSelectSection } from '../actions';

const mapStateToProps = (state) => ({
  sectionData:
    {
      existing: state.sections.map(section => section.id),
      selected: state.editorData.selectedSections,
      sections: state.sections
    }
});

const mapDispatchToProps = (dispatch) => ({
  onSectionCellClick: id => dispatch(addSelectSection(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionGrid);

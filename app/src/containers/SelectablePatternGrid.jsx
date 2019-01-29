import React from 'react';
import {connect} from 'react-redux';

import PatternGrid from '../components/PatternGrid';
import { addSelectPattern } from '../actions';

const getPatternGridData = (patterns, editorData) => ({
  existing: patterns.map(pattern => pattern.id),
  selected: editorData.selectedPatterns
})

const mapStateToProps = (state) => ({
  patternData: getPatternGridData(state.patterns, state.editorData)
});

const mapDispatchToProps = (dispatch) => ({
  onPatternCellClick: id => dispatch(addSelectPattern(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatternGrid);

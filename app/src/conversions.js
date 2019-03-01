import { TimingConstants, MusicalConstants } from './constants';

export const noteValueToTicks = (zoomNoteValue) => {
  return MusicalConstants.note[zoomNoteValue].noteValueToTickMultiplier * TimingConstants.ppqn;
}

export const noteValueToGridStepsPerBar = (zoomNoteValue) => {
  return MusicalConstants.note[zoomNoteValue].stepsPerBar;
}

export const sequenceLengthToTicks = (sequenceLength) => {
  let [gridBars, gridBeats, gridTicks] = sequenceLength.split('.');
  let tickLength = (((parseInt(gridBars, 10) * 4) + parseInt(gridBeats, 10)) * TimingConstants.ppqn) + parseInt(gridTicks, 10);
  return tickLength;
}

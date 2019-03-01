import NanoTimer from 'nanotimer';
import { sortById } from '../reducers';
import { TimingConstants, SharedMemoryConstants } from '../constants';
import { Disruptor } from 'shared-memory-disruptor';
import midi from 'midi';

process.on('message', (msg) =>  {
  console.log(msg);
  process.send('clock thread waking up');
});

const initSharedMemory = false;
const spinSharedMemory = false;
const consumerIndexSharedMemory = 0;

const sharedMem = new Disruptor(
  SharedMemoryConstants.shm_name,
  SharedMemoryConstants.num_elements,
  SharedMemoryConstants.element_size,
  SharedMemoryConstants.num_consumers,
  consumerIndexSharedMemory,
  initSharedMemory,
  spinSharedMemory
);

let systemClockStartTime = BigInt(0);
let lastClockTime = BigInt(0);
// array to hold "position" arrays full of events from all sequences that can be played in the next 48 ticks
const playableEvents = [];

const bufferEvents = (store, baseElapsedTime) => {
  // read ahead 480 ticks for every sequence for all playing updatedTransports
  // put the nodeData array of notes for the sequence at that position into playableEvents
  // remove the noteData arrays for sequences whose transports are no longer playing
  let state = store.getState();
  let systemTransport = state.transports[0] || null;
  if(null !== systemTransport) {
    let tempo = systemTransport.tempo;

  }

};

const playEvents = (state, baseElapsedTime, midiOut) => {
  // play all notes in playableEvents arrays
  // construct a note on message
  let noteOnBaseHex = '0x9';
  let noteOffBaseHex = '0x8';
  let channelDec = 0;
  let channelHexOn = parseInt('0x' + (parseInt(noteOnBaseHex, 16) + channelDec.toString(16)), 16).toString(10);
  let channelHexOff = parseInt('0x' + (parseInt(noteOffBaseHex, 16) + channelDec.toString(16)), 16).toString(10);
  // console.log(channelDec.toString(16));
  // console.log(channelHexOff);
  let ticksPerBar = TimingConstants.ppqn * 4;
  if(state.transports && state.transports.length > 0) {
    let clockPosition = '' + Math.floor(determineClockPosition(state.transports[0], baseElapsedTime) % ticksPerBar);
    let selectedSectionId = state.editorData.selectedSections[0];
    let selectedSection = state.sections.find(section => section.id === selectedSectionId);
    if(selectedSection) {
      let selectedSequenceSlot = selectedSection.selectedSequenceSlot[0];
      let currentSequenceId = selectedSection.sequenceSlots[selectedSequenceSlot];
      let currentSequence = state.sequences[currentSequenceId];
      if(currentSequence && currentSequence.noteData[clockPosition] !== undefined) {
        // console.log('clockPosition', clockPosition);
        // Send a MIDI message
        let notes = currentSequence.noteData[clockPosition];
        // console.log(notes);
        for(let note of notes) {
          if(note.type === 'on') {
            midiOut.sendMessage([channelHexOn, 60, 127]);
          } else {
            midiOut.sendMessage([channelHexOff, 60, 0]);
          }
        }
      }
    }
  }
};

const updateUI = (baseElapsedTime) => {
  const interval = BigInt(1000);
  const variance = BigInt(10);
  const relativeTime = baseElapsedTime%interval;
  if(relativeTime < variance || relativeTime > interval - variance) {

  }
  lastClockTime = baseElapsedTime;
};

// calculate the # of ticks at the clock tempo
const determineClockPosition = (transport, currentTime) => {
  // let timeSincePlayPressed = currentTime - transport.timePlayPressed; // BigInt
  let secondsPerQuarterNote = (60 / transport.tempo);
  // console.log('secondsPerQuarterNote', secondsPerQuarterNote);
  // console.log('currentTime', currentTime);
  let numQuarterNotesPastPlayPressed = bigIntToDecimal(currentTime) / secondsPerQuarterNote;
  // console.log('numQuarterNotesPastPlayPressed', numQuarterNotesPastPlayPressed);
  let numTicksPastPlayPressed = numQuarterNotesPastPlayPressed * (TimingConstants.ppqn);
  // console.log('numTicksPastPlayPressed', numTicksPastPlayPressed);
  return numTicksPastPlayPressed;
};

const SystemClock = () => {
  // play the notes at the current position in time for all sequences in currently selected sections
  const systemClock = new NanoTimer();

  var midiOut = new midi.output();
  midiOut.getPortCount();
  console.log(midiOut.getPortName(0));
  console.log(midiOut.getPortName(1));
  midiOut.openPort(1);

  systemClockStartTime = process.hrtime.bigint();

  let currentSharedState;

  let systemClockInterval = 60000 / (TimingConstants.maxbpm * TimingConstants.ppqn) + 'ms';
  console.log('System Clock started at:', bigIntToDecimal(systemClockStartTime));
  console.log('systemClockInterval', systemClockInterval);
  console.log('currentTime', bigIntToDecimal(process.hrtime.bigint()));
  console.log('time passed since systemClockStartTime', bigIntToDecimal(process.hrtime.bigint() - systemClockStartTime));

  const systemClockCallback = () => {
    // console.log('system clock thread');
    let buf = sharedMem.consumeNewSync();
    if(buf[0] && buf[0].length > 0) {
      process.nextTick(()=>{
        let dataLength = buf[0].lastIndexOf(125);
        // console.log('dataLength:', dataLength);
        let json = buf[0].slice(0, dataLength +1);
        currentSharedState = JSON.parse(json);
        sharedMem.consumeCommit();
      });
    }
    if(currentSharedState) {
      // console.log('currentSharedState', currentSharedState);
      let systemTransport = currentSharedState.transports[0];
      let currentHRTime = process.hrtime.bigint();
      let baseElapsedTime = currentHRTime - systemClockStartTime;
      // bufferEvents(store, currentHRTime);
      playEvents(currentSharedState, baseElapsedTime, midiOut);
      // updateUI(currentHRTime);
    }
  }

  systemClock.setInterval(systemClockCallback, '', '1u');
};

const bigIntToDecimal = (bi) => parseInt(bi, 10) * 0.000000001;

const floatSafeRemainder = (val, step) => {
  var valDecCount = (val.toString().split('.')[1] || '').length;
  var stepDecCount = (step.toString().split('.')[1] || '').length;
  var decCount = valDecCount > stepDecCount? valDecCount : stepDecCount;
  var valInt = parseInt(val.toFixed(decCount).replace('.',''));
  var stepInt = parseInt(step.toFixed(decCount).replace('.',''));
  return (valInt % stepInt) / Math.pow(10, decCount);
}

SystemClock();

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import { Disruptor } from 'shared-memory-disruptor';
import { SharedMemoryConstants } from './constants';
import App from './components/App';
import rootReducer from './reducers';
import { registerTransport } from './actions';
import './global.scss';

const logger = createLogger();

const defaultTempo = 150;
const systemTransportId = 0;

const initSharedMemory = true;
const spinSharedMemory = false;
const consumerIndexSharedMemory = -1;

const sharedMem = new Disruptor(
  SharedMemoryConstants.shm_name,
  SharedMemoryConstants.num_elements,
  SharedMemoryConstants.element_size,
  SharedMemoryConstants.num_consumers,
  consumerIndexSharedMemory,
  initSharedMemory,
  spinSharedMemory
);

const initialState = {
  editorData: {
    selectedSections: [0],
    noteGrid: {
      zoomNoteValue: 16
    }
  },
  sections: [
    {
      id: 0,
      label: "section 0",
      selectedSequenceSlot: [0],
      sequenceSlots: [0]
    }
  ],
  sequences: [
    {
      id: 0,
      label: "seq 0",
      zoomNoteValue: '1/16',
      length: '1.0.000',
      noteData: {}
    }
  ],
  transports: []
};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(logger),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// register a transport representing the system clock
store.dispatch(registerTransport(systemTransportId, defaultTempo));

store.subscribe(() => {
  console.log('store subscription updated', sharedMem);
  let json = JSON.stringify(store.getState());
  let buf = sharedMem.produceClaimSync();
  buf.write(json);
  sharedMem.produceCommitSync();
});

const rootElement = document.getElementById('root');

render (
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

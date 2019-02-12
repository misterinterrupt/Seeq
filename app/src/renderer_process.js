import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import './global.scss';

import App from './components/App';
import rootReducer from './reducers';

const logger = createLogger();

const initialState = {
  editorData: {
    selectedSections: [0],
    selectedSequences: [0]
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
      noteData: Array(16).fill(0).map(x=>[])
    }
  ],
  notes: []
};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const rootElement = document.getElementById('root');

render (
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

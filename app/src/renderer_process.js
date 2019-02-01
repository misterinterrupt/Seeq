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
    selectedSections: [0]
  },
  sections: [
    {
      id: 0,
      name: "section 0",
      selectedSequenceSlot: 0,
      sequenceSlots: [0]
    }
  ],
  sequences: [
    {
      id: 0,
      noteData: []
    }
  ]
};

const store = createStore(rootReducer, initialState, applyMiddleware(logger));

const rootElement = document.getElementById('root');

render (
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

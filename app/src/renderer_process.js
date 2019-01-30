import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import './global.scss';

import App from './components/App';
import sectionGrid from './reducers';

const logger = createLogger();

const initialState = {
  editorData: {
    selectedSections: [0]
  },
  sections: [{id:0}, {id:1}, {id:2}]
};

const store = createStore(sectionGrid, initialState, applyMiddleware(logger));

const rootElement = document.getElementById('root');

render (
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

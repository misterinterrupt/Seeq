import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import './global.scss';

import App from './components/App';
import patternGrid from './reducers/patternGrid';

const logger = createLogger();

const initialState = {
  pattern: [[], []]
};

const store = createStore(patternGrid, initialState, applyMiddleware(logger));

const rootElement = document.getElementById('root');

render (
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

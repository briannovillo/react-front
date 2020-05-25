import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from '../universal/routes';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle

hydrate(
  <BrowserRouter>
    <Router initialState={preloadedState} />
  </BrowserRouter>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider'
import App from './App';
import { API_WS_ROOT } from './constants';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css';

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ActionCableProvider>,
  document.getElementById('root')
);


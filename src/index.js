import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { StrictMode } from 'react';
import './index.css';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

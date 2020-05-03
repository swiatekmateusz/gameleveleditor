import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LevelState } from './levelContext/LevelContext'

ReactDOM.render(
  <LevelState><App /></LevelState>
  ,
  document.getElementById('root')
);


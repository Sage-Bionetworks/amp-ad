import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import runAllQueries from './queryForData';

runAllQueries().then( data => {
  ReactDOM.render(<App 
    humanData = {data.humanData}
    mouseData = {data.mouseData}
    ratData = {data.ratData}
    flyData = {data.flyData}
    allSpeciesData = {data.allSpeciesData}
    />, document.getElementById('root'));
})

registerServiceWorker();

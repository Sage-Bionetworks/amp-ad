import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import runAllQueries from './queryForData';

import defaultData from './defaultData/DefaultData.js'
import defaultFlyData from './defaultData/DefaultFlyData.js'
import defaultHumanData from './defaultData/DefaultHumanData.js'
import defaultMouseData from './defaultData/DefaultMouseData.js'
import defaulRatData from './defaultData/DefaultRatData.js'

 //for production fetch the data
//runAllQueries().then( data => {
  //ReactDOM.render(<App 
    //humanData = {data.humanData}
    //mouseData = {data.mouseData}
    //ratData = {data.ratData}
    //flyData = {data.flyData}
    //allSpeciesData = {data.allSpeciesData}
    ///>, document.getElementById('root'));
//})

// for testing use the local data 
ReactDOM.render(
		<App 
			humanData = {defaultHumanData}
			mouseData = {defaultMouseData}
			ratData = {defaulRatData}
			flyData = {defaultFlyData}
			allSpeciesData = {defaultData}
		/>
	, document.getElementById('root'));

registerServiceWorker();

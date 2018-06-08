import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js';

import defaultData from '../defaultData/DefaultData.js'
import defaultFlyData from '../defaultData/DefaultFlyData.js'
import defaultHumanData from '../defaultData/DefaultHumanData.js'
import defaultMouseData from '../defaultData/DefaultMouseData.js'
import defaulRatData from '../defaultData/DefaultRatData.js'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App 
    humanData = {defaultHumanData}
    mouseData = {defaultMouseData}
    ratData = {defaulRatData}
    flyData = {defaultFlyData}
    allSpeciesData = {defaultData}
    />, div);
  ReactDOM.unmountComponentAtNode(div);
});

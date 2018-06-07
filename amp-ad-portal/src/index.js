import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import getToken from './Token.js'
import getStudyData from './GetStudyData.js'

let tokens = {};
let allSpeciesData = {};
let flyData = {};
let humanData = {};
let mouseData = {};
let ratData = {};

const setUpQueryToken = (searchBool, columnName, facetValue, queryString, tokenName = "allSpecies") => {
  return getToken(searchBool, columnName, facetValue, queryString)
  .then(response => response.json())
  .then(result => {
    let dataStateObject = {...tokens}
    dataStateObject[tokenName] = result.token
    tokens = dataStateObject;
  });
}

const runStudyDataQuery = (TOKEN, LIMIT) => {
  return getStudyData(TOKEN).then( 
    response => { 
      if( response !== undefined ){
        return response
      }
    }
  )
}
  
const getSpeciesStudiesMetaData = (species, columnName, tokenName) => {
  return setUpQueryToken(true, columnName, [species], "SELECT * FROM syn11346063", tokenName)
    .then( data => {
      columnName = columnName.charAt(0).toUpperCase() + columnName.substr(1);
      species = species.charAt(0).toLowerCase() + species.substr(1);
      species = species.replace(/\s/g, '');
      return runStudyDataQuery(tokens[tokenName], 10, species+'Data')
    });
}

const runAllQueries = () => {
  return Promise.all([
    getSpeciesStudiesMetaData('Human', 'assay', 'humanToken').then( response => { humanData = response }),
    getSpeciesStudiesMetaData('Mouse', 'assay', 'mouseToken').then( response => { mouseData = response }),
    getSpeciesStudiesMetaData('Rat', 'assay', 'ratToken').then( response => { ratData = response }),
    getSpeciesStudiesMetaData('Drosophila melanogaster', 'assay', 'flyToken').then( response => { flyData = response }),
    setUpQueryToken().then(token => { 
      runStudyDataQuery(tokens.allSpecies, 1)
      .then( response => { allSpeciesData = response })
    })
  ])
}

runAllQueries().then( run => {
  ReactDOM.render(<App 
    humanData = {humanData}
    mouseData = {mouseData}
    ratData = {ratData}
    flyData = {flyData}
    allSpeciesData = {allSpeciesData}
    />, document.getElementById('root'));
})

registerServiceWorker();

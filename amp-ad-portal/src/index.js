import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "./style.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
//import runAllQueries from "./queryForData";

//runAllQueries()
let data = fetch("http://159.65.104.204/AllData.json");
let data2 = fetch("http://159.65.104.204/AllData2.json");
data2
  .then(rawDataResponse => {
    return rawDataResponse.json();
  })
  .then(processedJSON => {
    data2 = processedJSON;
  });

data
  .then(rawDataResponse => {
    return rawDataResponse.json();
  })
  .then(processedJSON => {
    data = processedJSON;
    ReactDOM.render(
      <App
        data2={data2}
        speciesSelection={data.speciesList}
        allSpeciesData={data.allspeciesData}
        humanData={data.humanData}
        humancelllineData={data.humancelllineData}
        flyData={data.flyData}
        mouseData={data.mouseData}
        ratData={data.ratData}
        //humanData = {data.humanData}
        //mouseData = {data.mouseData}
        //ratData = {data.ratData}
        //flyData = {data.flyData}
        //allSpeciesData = {data.allSpeciesData}
        wikiNewsData={data.wikiNewsData}
        wikiProgramData={data.wikiProgramData}
        wikiContributorsData={data.wikiContributorsData}
        wikiDataUseData={data.wikiDataUseData}
      />,
      document.getElementById("root")
    );
  });

// for testing use the local data
//ReactDOM.render(
//<App
//humanData = {defaultHumanData}
//mouseData = {defaultMouseData}
//ratData = {defaultRatData}
//flyData = {defaultFlyData}
//allSpeciesData = {defaultData}
//wikiData = { String(defaultWikiData) }
//wikiProgramData = { String(defaultWikiProgramData) }
//wikiContributorsData = { String(defaultWikiContributorsData) }
///>
//, document.getElementById('root')
//);

registerServiceWorker();

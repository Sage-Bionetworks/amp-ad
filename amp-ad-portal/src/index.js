import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

let data = fetch("https://americandurablegoods.com/AllData.json");
let data2 = fetch("https://americandurablegoods.com/AllData2.json");

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
        wikiNewsData={data.wikiNewsData}
        wikiProgramData={data.wikiProgramData}
        wikiContributorsData={data.wikiContributorsData}
        wikiDataUseData={data.wikiDataUseData}
      />,
      document.getElementById("root")
    );
  });

registerServiceWorker();

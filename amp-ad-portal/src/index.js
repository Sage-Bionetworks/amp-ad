import React from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import "./style/style.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

import * as SynapseClient from "./synapse/SynapseClient"
//import * as SynapseConstants from "./synapse/SynapseConstants"

let data
let data2
const login = () => {
  return SynapseClient.login("mikeybkats", "guinness")
}

const rawData = fetch("https://americandurablegoods.com/AllData.json")
  .then(rawDataResponse => rawDataResponse.json())
  .then((processedJSON) => {
    data = processedJSON
  })

const rawData2 = fetch("http://localhost:3030/response2.json")
  .then(responseRaw => responseRaw.json())
  .then((response) => {
    console.log(response)
    data2 = response
  })
  .catch(error => console.log("Request has failed: ", error))

Promise.all([login(), rawData, rawData2]).then(() => ReactDOM.render(
  <App
    appData={data2}
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
  document.getElementById("root"),
))

registerServiceWorker()

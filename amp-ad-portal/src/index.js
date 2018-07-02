import React from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import "./style/style.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
// const data2 = await fetch("https://americandurablegoods.com/AllData2.json")
//

import { gatherCounts } from "./controller/PrepRawSynapseData"

const rawData = fetch("https://americandurablegoods.com/AllData.json")

fetch("http://localhost:3030/response2.json")
  .then(responseRaw => responseRaw.json())
  .then((response) => {
    console.log(response)
    const humanData = gatherCounts(response, "Human", "assay")
    const humanDataTissue = gatherCounts(response, "Human", "diagnoses")
    console.log(humanData, humanDataTissue)
  })
  .catch(error => console.log("Request has failed: ", error))

// data2
// .then(rawDataResponse => rawDataResponse.json())
// .then((processedJSON) => {
// data2 = processedJSON
// })

rawData.then(rawDataResponse => rawDataResponse.json()).then((processedJSON) => {
  const data = processedJSON
  ReactDOM.render(
    <App
      // data2={data2}
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
  )
})

registerServiceWorker()

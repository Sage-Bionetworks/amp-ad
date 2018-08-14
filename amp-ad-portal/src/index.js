import React from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import "./style/style.css"
import { BarLoader } from "react-spinners"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import * as SynapseClient from "./synapse/SynapseClient"
import { queryTable } from "./queries/queryForData"

let rawSynapseData
let loginKey

const login = async () => SynapseClient.login("mikeybkats", "guinness").then((keys) => {
  loginKey = keys
  return keys
})

//const getRawData = fetch("https://americandurablegoods.com/response2.json")
//.then(responseRaw => responseRaw.json())
//.then((response) => {
//rawSynapseData = response
////console.log(response)
//})
//.catch(error => console.log("Request has failed: ", error))

const table = "syn12532774"
const speciesQuery = `SELECT species, assay, tissue, diagnosis, specimenID, COUNT(*) FROM ${table} GROUP BY assay, tissue, species, diagnosis`

login()
  .then((token) => {
    ReactDOM.render(
      <div className="front-page-bar">
        <BarLoader color="#47357B" loading />
      </div>,
      document.getElementById("root"),
    )
    return queryTable(table, speciesQuery, token)
  })
  .then((response) => {
    rawSynapseData = JSON.parse(response)
  })
  .then(() => ReactDOM.render(
    <App loginToken={loginKey} appData={rawSynapseData} />,
    document.getElementById("root"),
  ))

registerServiceWorker()

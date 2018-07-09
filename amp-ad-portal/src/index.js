import React from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import "./style/style.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import response2Data from "./defaultData/response2"

import * as SynapseClient from "./synapse/SynapseClient"

console.log(JSON.parse(response2Data))

let rawSynapseData
let loginKey

const login = SynapseClient.login("mikeybkats", "guinness").then((keys) => {
  loginKey = keys
  return keys
})

const getRawData = fetch("https://americandurablegoods.com/response2.json")
  .then(responseRaw => responseRaw.json())
  .then((response) => {
    console.log(response)
    rawSynapseData = response
  })
  .catch(error => console.log("Request has failed: ", error))

Promise.all([login, getRawData]).then(() => ReactDOM.render(
  <App loginToken={loginKey} appData={rawSynapseData} />,
  document.getElementById("root"),
))

registerServiceWorker()

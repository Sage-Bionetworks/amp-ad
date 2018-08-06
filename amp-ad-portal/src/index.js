import React from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import "./style/style.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import * as SynapseClient from "./synapse/SynapseClient"

let rawSynapseData
let loginKey

const login = SynapseClient.login("mikeybkats", "guinness").then((keys) => {
  loginKey = keys
  return keys
})

const getRawData = fetch("https://americandurablegoods.com/response2.json")
  .then(responseRaw => responseRaw.json())
  .then((response) => {
    rawSynapseData = response
    console.log(response)
  })
  .catch(error => console.log("Request has failed: ", error))

Promise.all([login, getRawData]).then(() => ReactDOM.render(
  <App loginToken={loginKey} appData={rawSynapseData} />,
  document.getElementById("root"),
))

registerServiceWorker()

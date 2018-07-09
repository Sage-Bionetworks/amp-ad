import React from "react"
import ReactDOM from "react-dom"
import App from "../App"

import * as SynapseClient from "../synapse/SynapseClient"

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

it("renders without crashing", () => {
  const div = document.createElement("div")
  Promise.all([login, getRawData]).then(() => ReactDOM.render(
    <App loginToken={loginKey} appData={rawSynapseData} />,
    document.getElementById("root"),
  ))
  ReactDOM.unmountComponentAtNode(div)
})

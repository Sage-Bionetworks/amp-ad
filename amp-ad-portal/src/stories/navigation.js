import React from "react"

import { storiesOf } from "@storybook/react"
import { State, Store } from "@sambego/storybook-state"

import { HashRouter as Router } from "react-router-dom"
import Header from "../components/Header"
import "../style/style.css"

const logoImage = require("../images/amp-ad-logo.svg")

const store = new Store({
  active: false,
})

const handleChanges = (KEY, NEWSTATE) => {
  store.set({
    [KEY]: NEWSTATE,
  })
}

storiesOf("AMP-AD", module)
  .add("navigation header", () => (
    <Router>
      <Header handleChanges={handleChanges} hash="#/" />
    </Router>
  ))
  .add("logoImage", () => {
    return (
      <div>
        <img src={logoImage} alt="test svg" />
      </div>
    )
  })

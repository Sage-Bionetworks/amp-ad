import React from "react"

import { storiesOf } from "@storybook/react"
import { State, Store } from "@sambego/storybook-state"

import { HashRouter as Router } from "react-router-dom"
import Donuts from "../components/PiesBelowHeader"
import "../style/style.css"

const store = new Store({
  biosamplesLoading: false,
  diagnosesSelection: "All diagnoses",
  speciesSelection: "All species",
  pageData: {
    biosamplesassayCount: 11664,
  },
})

const handleChanges = (KEY, NEWSTATE) => {
  store.set({
    [KEY]: NEWSTATE,
  })
}

storiesOf("AMP-AD", module).add("donuts", () => (
  <Router>
    <Donuts
      biosamplesLoading={store.get("biosamplesLoading")}
      pageData={store.get("pageData")}
    />
  </Router>
))

import React from "react"

import { storiesOf } from "@storybook/react"
import { State, Store } from "@sambego/storybook-state"

import { HashRouter as Router } from "react-router-dom"
//import { SynapseComponents } from "synapse-react-client"
import Publications from "../components/Research-Publications"
import "../style/style.css"

const markdown = {
  581933: "<div class=\"row publication\"><div class=\"col-xs-12\"><div class=\"row publication\"><div class=\"col-xs-12\"><h2>Integrated biology approach reveals molecular and pathological interactions among Alzheimer's Aβ42, Tau, TREM2, and TYROBP in Drosophila models.</h2><h4>2018   l   Genome Med, 10: 26.   l   <a href=\"https://doi.org/10.1186/s13073-018-0530-9\">doi: 10.1186/s13073-018-0530-9</a></h4><p class=\"publication-description\">Sekiya M, Wang M, Fujisaki N, Sakakibara Y, Quan X, Ehrlich ME, De Jager PL,Bennett DA, Schadt EE, Gandy S, Ando K, Zhang B, Iijima KM </p></div><div class=\"border-bottom\"></div></div>",
}

const store = new Store({
  pageData: {
    token: "",
  },
})

const handleChanges = (KEY, NEWSTATE) => {
  store.set({
    [KEY]: NEWSTATE,
  })
}

storiesOf("AMP-AD", module).add("publications", () => (
  <div>
    <Publications
      handleChanges={handleChanges}
      token={this.token.sessionToken}
      markdown={[markdown]}
    />
  </div>
))

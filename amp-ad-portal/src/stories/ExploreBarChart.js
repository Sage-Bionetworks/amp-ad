import React from "react"

import { storiesOf } from "@storybook/react"
import "../style/style.css"

import { action, configureActions } from "@storybook/addon-actions"

import { HashRouter as Router, Route } from "react-router-dom"
import Explore from "../components/HomeExplore"

storiesOf("AMP-AD", module).add("HomeExplore", () => (
  <div>
    <Router>
      <Explore  />
    </Router>
  </div>
))

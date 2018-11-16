import React from "react"

import { storiesOf } from "@storybook/react"
import "../style/style.css"

import { HashRouter as Router, Route } from "react-router-dom"
import ExplorePage from "../components/Explore.jsx"

storiesOf("AMP-AD", module).add("Explore Page", () => (
  <div>
    <Router>
      <ExplorePage token={this.token.sessionToken} />
    </Router>
  </div>
))

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { HashRouter as Router } from "react-router-dom"
import Header from "../components/Header"
import "../style/style.css"

storiesOf("AMP-AD", module).add("navigation header", () => (
  //<Welcome showApp={linkTo("Button")} />
  <Router>
    <Header />
  </Router>
))

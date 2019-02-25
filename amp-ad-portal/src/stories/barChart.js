import React from "react"

import { storiesOf } from "@storybook/react"
import BarChart from "../components/SynapseBarChart.jsx"
import "../style/style.css"

storiesOf("AMP-AD", module).add("BarChart", () => (
  <div>
    <BarChart
      synId="syn12532774"
      filter="species"
      rgbIndex={1}
      barChart
    />
  </div>
))

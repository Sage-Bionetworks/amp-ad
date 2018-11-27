import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents } from "synapse-react-client"
import SynapseChart from "./SynapseBarChart.jsx"
import {
  clone,
  synapseObjects,
  returnSynapseValue,
} from "../library/synapseObjects"
import ButtonExplore from "./Button-Explore"

import Selectors from "./SelectorRow"

let loadedObject = []

class ExploreContent extends Component {
  state = {
    activeId: "",
    activeFilter: "",
    color: 0,
    hash: "",
    name: "",
    sql: "",
  };

  componentDidMount() {
    loadedObject = clone(synapseObjects)
    this.handleButtonPress(
      "syn17024112",
      "id",
      loadedObject,
      this.handleChanges,
    )
  }

  handleChanges = (stateObject) => {
    this.setState(stateObject)
  };

  handleButtonPress = (value, key = "id", synObjectArray, handleChanges) => {
    const activeFilter = returnSynapseValue(
      synObjectArray,
      key,
      value,
      "filter",
    )
    const color = returnSynapseValue(synObjectArray, key, value, "color")
    const hash = returnSynapseValue(synObjectArray, key, value, "hash")
    const name = returnSynapseValue(synObjectArray, key, value, "name")
    const sql = returnSynapseValue(synObjectArray, key, value, "sql")

    handleChanges({
      activeId: value,
      activeFilter,
      color,
      hash,
      name,
      sql,
    })
    return ""
  };

  returnButtonClass = (id) => {
    return `btn-control ${this.state.activeId === id ? "active" : ""}`
  };

  returnSynapseChart = (hash = window.location.hash) => {
    if (this.state.activeId === "syn2580853") {
      return (
        <div>
          <SynapseComponents.Markdown
            token={this.props.token}
            ownerId="syn2580853"
            wikiId="409850"
            sql={this.state.sql}
          />
        </div>
      )
    }
    return (
      <div className="synapse-chart">
        <SynapseChart
          token={this.props.token}
          synId={this.state.activeId}
          filter={this.state.activeFilter}
          name={this.state.name}
          rgbindex={this.state.color}
          sql={this.state.sql}
          barChart
        />
      </div>
    )
  };

  barChartStyle = () => {
    return {
      height: this.state.activeId === "syn2580853" ? "100%" : "220px",
      position: "relative",
    }
  };

  render() {
    return (
      <section className="row explore-content">
        <div className="container">
          <div className="row">
            <h2 className="header">Explore Content</h2>
          </div>
          <div className="row bar-chart" style={this.barChartStyle()}>
            <div className="center-block selectors-container">
              <Selectors
                synapseObject={loadedObject}
                returnButtonClass={this.returnButtonClass}
                handleChanges={this.handleChanges}
                handleButtonPress={this.handleButtonPress}
              />
            </div>
            {this.returnSynapseChart()}
            <div className="row explore-button-row">
              <div className="col-xs-12">
                <ButtonExplore url={this.state.hash} label={this.state.name} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ExploreContent.propTypes = {
  token: PropTypes.string.isRequired,
}

export default ExploreContent

import React, { Component } from "react"
import PropTypes from "prop-types"
import SynapseChart from "./SynapseBarChart.jsx"

import {
  synapseObjects,
  returnSynapseValue,
  setSynapseValue,
} from "../library/synapseObjects"

let loadedObjects

class Explore extends Component {
  state = {
    name: "",
    activeButton: "",
    activeFilter: "",
    color: 0,
    limit: 0,
    columns: 0,
    table: false,
    type: "",
    hideLink: false,
  };

  componentDidMount() {
    loadedObjects = synapseObjects.clone()
    // studies
    setSynapseValue(loadedObjects, "syn16787123", "filter", "projectStatus")
    // publications
    setSynapseValue(loadedObjects, "syn16857542", "filter", "id")

    //if (window.location.hash !== "#/Explore") {
    ////this.setActiveValues(window.location.hash)
    //this.setActiveValues("syn16859580", "id")
    //} else this.handleButtonPress("syn16859580", undefined)
    this.handleButtonPress("syn16859580", undefined)
  }

  setActiveValues = (hash) => {
    let id
    switch (hash) {
    case "#/Explore/Studies":
      id = "syn16787123"
      break
    case "#/Explore/Publications":
      id = "syn16857542"
      break
    case "#/Explore/Datasets":
      id = "syn16859580"
      break
    case "#/Explore/Funder":
      id = "syn16858699"
      break
    case "#/Explore/Files":
      id = "syn16858331"
      break
    default:
      id = ""
    }

    this.handleButtonPress(id, undefined)
  };

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  handleButtonPress = (value, key = "id") => {
    const activeFilter = returnSynapseValue(
      loadedObjects,
      key,
      value,
      "filter",
    )
    const color = returnSynapseValue(loadedObjects, key, value, "color")
    const limit = returnSynapseValue(loadedObjects, key, value, "limit")
    const table = returnSynapseValue(loadedObjects, key, value, "table")
    const columns = returnSynapseValue(loadedObjects, key, value, "columns")
    const type = returnSynapseValue(loadedObjects, key, value, "type")
    const name = returnSynapseValue(loadedObjects, key, value, "name")
    const hideLink = returnSynapseValue(loadedObjects, key, value, "hidLink")

    this.setState({
      activeButton: value,
      activeFilter,
      color,
      limit,
      table,
      columns,
      type,
      name,
      hideLink: hideLink !== undefined ? hideLink : false,
    })
    return ""
  };

  returnButtonClass = (id) => {
    return `btn-control ${this.state.activeButton === id ? "active" : ""}`
  };

  fundersButton = () => {
    return (
      <button
        className={this.returnButtonClass("syn16858699")}
        type="button"
        onClick={() => this.handleButtonPress("syn16858699")}
      >
        <h5>FUNDERS</h5>
      </button>
    )
  };

  hideBarSection = () => {
    const hash = window.location.hash

    if (hash === "#/Explore") {
      return ""
    }
    if (hash !== "#/") {
      return "hide"
    }
    return ""
  };

  render() {
    return (
      <section className="page explore">
        <div className="container">
          <div className="row">
            <h1 className="header">
              Explore
              {this.state.name}
            </h1>
          </div>
          <div className="row explore-content">
            <div
              className={`center-block selectors-container ${this.hideBarSection()}`}
            >
              <div className="selectors">
                <button
                  className={this.returnButtonClass("syn16858699")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16858699")}
                >
                  <h5>FUNDERS</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn16859580")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16859580")}
                >
                  <h5>DATASETS</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn16858331")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16858331")}
                >
                  <h5>FILES</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn16787123")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16787123")}
                >
                  <h5>STUDIES</h5>
                </button>
                <button
                  className={this.returnButtonClass("")}
                  type="button"
                  onClick={() => this.handleButtonPress("")}
                >
                  <h5>ANALYSIS</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn16857542")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn16857542")}
                >
                  <h5>PUBLICATIONS</h5>
                </button>
              </div>
            </div>
            <SynapseChart
              token={this.props.token}
              synId={this.state.activeButton}
              filter={this.state.activeFilter}
              rgbIndex={this.state.color}
              showMenu
              facets
              barChart
              table={this.state.table}
              columns={this.state.columns}
              json={this.props[this.state.activeButton]}
              limit={this.state.limit}
              type={this.state.type}
              hideOrganizationlink={this.state.hideLink}
            />
          </div>
        </div>
      </section>
    )
  }
}

Explore.propTypes = {
  token: PropTypes.string.isRequired,
}

export default Explore

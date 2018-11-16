import React, { Component } from "react"
import PropTypes from "prop-types"
import SynapseChart from "./SynapseBarChart.jsx"
import {
  synapseClinicalTable,
  returnSynapseValue,
} from "../library/synapseObjects"
import ButtonExplore from "./Button-Explore"

let loadedObject

class ExploreContent extends Component {
  state = {
    activeId: "syn17024112",
    activeFilter: "diagnosis",
    color: 0,
    hash: "/Explore/Datasets",
    name: "Data",
  };

  componentDidMount() {
    loadedObject = synapseClinicalTable.clone()
    this.handleButtonPress("filter", "diagnosis")
  }

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  handleButtonPress = (key, value) => {
    //const activeFilter = returnSynapseValue(loadedObject, key, value, "filter")
    console.log(key, value, loadedObject)
    const color = returnSynapseValue(loadedObject, key, value, "color")
    const hash = returnSynapseValue(loadedObject, key, value, "hash")
    const name = returnSynapseValue(loadedObject, key, value, "name")

    this.setState({
      activeFilter: value,
      color,
      hash,
      name,
    })
    return ""
  };

  returnButtonClass = (filter) => {
    return `btn-control ${this.state.activeFilter === filter ? "active" : ""}`
  };

  render() {
    return (
      <section className="row explore-content">
        <div className="container">
          <div className="row">
            <h2 className="header">Explore Content</h2>
          </div>
          <div className="row bar-chart">
            <div className="center-block selectors-container">
              <div className="selectors">
                <button
                  className={this.returnButtonClass("diagnosis")}
                  type="button"
                  onClick={() => this.handleButtonPress("filter", "diagnosis")}
                >
                  <h5>Diagnosis</h5>
                </button>
                <button
                  className={this.returnButtonClass("species")}
                  type="button"
                  onClick={() => this.handleButtonPress("filter", "species")}
                >
                  <h5>Organism</h5>
                </button>
                <button
                  className={this.returnButtonClass("dataType")}
                  type="button"
                  onClick={() => this.handleButtonPress("filter", "dataType")}
                >
                  <h5>Data Type</h5>
                </button>
                <button
                  className={this.returnButtonClass("assay")}
                  type="button"
                  onClick={() => this.handleButtonPress("filter", "assay")}
                >
                  <h5>Assay</h5>
                </button>
                <button
                  className={this.returnButtonClass("tissue")}
                  type="button"
                  onClick={() => this.handleButtonPress("filter", "tissue")}
                >
                  <h5>Tissue</h5>
                </button>
              </div>
            </div>
            <div className="synapse-chart">
              <SynapseChart
                token={this.props.token}
                synId={this.state.activeId}
                filter={this.state.activeFilter}
                rgbIndex={this.state.color}
                barChart
              />
            </div>
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

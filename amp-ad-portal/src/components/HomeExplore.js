import React, { Component } from "react"
import PropTypes from "prop-types"
import SynapseChart from "./SynapseBarChart.jsx"
import { synapseObjects, returnSynapseValue } from "../library/synapseObjects"
import ButtonExplore from "./Button-Explore.js"

let loadedObject

class ExploreContent extends Component {
  state = {
    activeButton: "syn12532774",
    activeFilter: "diagnosis",
    color: 0,
    hash: "/Explore/Datasets",
    name: "Data",
  };

  componentDidMount() {
    this.handleButtonPress("syn12532774")
    loadedObject = synapseObjects.clone()
  }

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  handleButtonPress = (id) => {
    const activeFilter = returnSynapseValue(loadedObject, id, "filter")
    const color = returnSynapseValue(loadedObject, id, "color")
    const hash = returnSynapseValue(loadedObject, id, "hash")
    const name = returnSynapseValue(loadedObject, id, "name")

    this.setState({
      activeButton: id,
      activeFilter,
      color,
      hash,
      name,
    })
    return ""
  };

  returnButtonClass = (id) => {
    return `btn-control ${this.state.activeButton === id ? "active" : ""}`
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
                  className={this.returnButtonClass("syn12532774")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn12532774", this.props.token)
                  }
                >
                  <h5>Data</h5>
                </button>
              </div>
            </div>
            <div className="synapse-chart">
              <SynapseChart
                token={this.props.token}
                synId={this.state.activeButton}
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

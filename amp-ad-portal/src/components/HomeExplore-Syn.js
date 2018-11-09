import React, { Component } from "react"
import PropTypes from "prop-types"
import SynapseChart from "./SynapseBarChart.jsx"
import { synapseObjects, returnSynapseValue } from "../library/synapseObjects"
import ButtonExplore from "./Button-Explore"

let loadedObject

class ExploreContent extends Component {
  state = {
    activeId: "",
    activeFilter: "",
    color: 0,
    hash: "",
    name: "",
  };

  componentDidMount() {
    loadedObject = synapseObjects.clone()
    this.handleButtonPress("syn17024112", "id")
  }

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  handleButtonPress = (value, key = "id") => {
    const activeFilter = returnSynapseValue(loadedObject, key, value, "filter")
    const color = returnSynapseValue(loadedObject, key, value, "color")
    const hash = returnSynapseValue(loadedObject, key, value, "hash")
    const name = returnSynapseValue(loadedObject, key, value, "name")

    this.setState({
      activeId: value,
      activeFilter,
      color,
      hash,
      name,
    })
    return ""
  };

  returnButtonClass = (id) => {
    return `btn-control ${this.state.activeId === id ? "active" : ""}`
  };

  returnSynapseChart = (hash = window.location.hash) => {
    if (hash === "#/Explore/Publications") {
      return (
        <div>
          <h2>Publications Cards</h2>
        </div>
      )
    }
    return (
      <div className="synapse-chart">
        <SynapseChart
          token={this.props.token}
          synId={this.state.activeId}
          filter={this.state.activeFilter}
          rgbIndex={this.state.color}
          barChart
        />
      </div>
    )
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
                  className={this.returnButtonClass("syn17024173")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn17024173")}
                >
                  <h5>CONSORTIA</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn17024229")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn17024229")}
                >
                  <h5>PROJECTS</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn9886254")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn9886254")}
                >
                  <h5>STUDIES</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn17024112")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn17024112")}
                >
                  <h5>DATA</h5>
                </button>
                <button
                  className={this.returnButtonClass("syn13897207")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn13897207")}
                >
                  <h5>PEOPLE</h5>
                </button>
              </div>
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

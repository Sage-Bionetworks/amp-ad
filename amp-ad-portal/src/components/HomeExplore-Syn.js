import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents } from "synapse-react-client"
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
    if (this.state.activeId === "syn2580853") {
      return (
        <div>
          <SynapseComponents.Markdown
            token={this.props.token}
            ownerId="syn2580853"
            wikiId="409850"
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
          rgbIndex={this.state.color}
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
                  className={this.returnButtonClass("syn2580853")}
                  type="button"
                  onClick={() => this.handleButtonPress("syn2580853")}
                >
                  <h5>PUBLICATIONS</h5>
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

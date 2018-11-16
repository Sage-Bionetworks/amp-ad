import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents } from "synapse-react-client"
//import { withRouter } from "react-router-dom"
import SynapseChart from "./SynapseBarChart.jsx"

import {
  synapseObjects,
  returnSynapseValue,
  setSynapseValue,
} from "../library/synapseObjects"

let loadedObjects
let history
let location
let unlisten

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
    history = this.props.history
    location = history.location

    if (this.setActiveValues(window.location.hash) !== "studyPage") {
      loadedObjects = synapseObjects.clone()
      // studies
      setSynapseValue(loadedObjects, "syn16787123", "filter", "projectStatus")
      // publications
      setSynapseValue(loadedObjects, "syn16857542", "filter", "id")

      if (window.location.hash !== "#/Explore") {
        this.setActiveValues(window.location.hash, "id")
      } else this.handleButtonPress("syn17024112", undefined)
    }
  }

  componentDidUpdate() {
    unlisten = history.listen((location, action) => {
      const pathHash = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1,
        location.pathname.length,
      )

      if (this.state.name !== pathHash) {
        if (!window.location.hash.includes("/Studies/")) {
          this.setActiveValues(window.location.hash)
        }
        this.setState({
          name: pathHash,
        })
      }
      return true
    })
  }

  componentWillUnmount() {
    unlisten()
  }

  setActiveValues = (hash) => {
    let id
    switch (hash) {
    case "#/Explore/Data":
      id = "syn17024112"
      break
    case "#/Explore/Studies":
      id = "syn9886254"
      break
    case "#/Explore/Publications":
      id = "syn2580853"
      break
    case "#/Explore/Programs":
      id = "syn17024173"
      break
    case "#/Explore/Projects":
      id = "syn17024229"
      break
    case "#/Explore/People":
      id = "syn13897207"
      break
    case hash.includes("/Studies/"):
      id = "studyPage"
      break
    default:
      id = "syn17024112"
    }

    this.handleButtonPress(id, undefined)
  };

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  changeRoute = (url) => {
    this.props.history.push(url)
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
    const hideLink = returnSynapseValue(loadedObjects, key, value, "hideLink")
    const hash = returnSynapseValue(loadedObjects, key, value, "hash")

    this.setState(
      {
        activeButton: value,
        activeFilter,
        color,
        limit,
        table,
        columns,
        type,
        name,
        hideLink: hideLink !== undefined ? hideLink : false,
      },
      () => {
        this.changeRoute(hash)
      },
    )
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
      //return "hide"
      return ""
    }
    return ""
  };

  returnSynapseChart = (hash = window.location.hash) => {
    if (hash === "#/Explore/Publications") {
      return (
        <div>
          <h1>Publications</h1>
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
    )
  };

  SelectorsAndCharts = () => {
    if (
      !window.location.hash.includes("/Studies/")
      && !window.location.hash.includes("/Projects/")
      && !window.location.hash.includes("/Programs/")
    ) {
      return (
        <div>
          <div
            className={`center-block selectors-container ${this.hideBarSection()}`}
          >
            <div className="selectors">
              <button
                className={this.returnButtonClass("syn17024173")}
                type="button"
                onClick={() => this.handleButtonPress("syn17024173")}
              >
                <h5>PROGRAMS</h5>
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
        </div>
      )
    }
    return <div />
  };

  render() {
    return (
      <section className="page explore">
        <div className="container">
          <div className="row">
            <h1 className="header">
              Explore
              {` ${this.state.name}`}
            </h1>
          </div>
          <div className="row explore-content">
            <this.SelectorsAndCharts />
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

import React, { Component } from "react"
import PropTypes from "prop-types"
//import { withRouter } from "react-router-dom"
import SynapseChart from "./SynapseBarChart.jsx"
import Selectors from "./SelectorRow"

import {
  clone,
  synapseObjects,
  returnSynapseObject,
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
    activeObject: {},
  };

  componentDidMount() {
    history = this.props.history
    location = history.location

    if (this.setActiveValues(window.location.hash) !== "studyPage") {
      loadedObjects = clone(synapseObjects)

      // studies
      setSynapseValue(loadedObjects, "syn17083367", "filter", "projectStatus")
      // publications
      setSynapseValue(loadedObjects, "syn2580853", "filter", "id")

      if (window.location.hash !== "#/Explore") {
        this.setActiveValues(window.location.hash, "id")
      } else this.handleButtonPress("syn17024112")
    }
  }

  componentDidUpdate() {
    unlisten = history.listen((historyLocation = location) => {
      const pathHash = historyLocation.pathname.substring(
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
      id = "syn11346063"
      break
    case "#/Explore/Studies":
      //syn9886254
      id = "syn17083367"
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
      id = "syn11346063"
    }

    this.handleButtonPress(id)
  };

  changeRoute = (url) => {
    this.props.history.push(url)
  };

  handleChanges = (newState) => {
    this.setState(newState)
  };

  handleButtonPress = (value) => {
    const activeObject = returnSynapseObject(loadedObjects, value)

    this.setState(
      {
        activeButton: value,
        activeObject,
      },
      () => {
        this.changeRoute(activeObject.hash)
      },
    )
    return ""
  };

  returnButtonClass = (id) => {
    return `btn-control ${this.state.activeButton === id ? "active" : ""}`
  };

  hideBarSection = () => {
    const hash = window.location.hash
    if (hash === "#/Explore") {
      return ""
    }
    if (hash !== "#/") {
      return ""
    }
    return ""
  };

  returnSynapseChart = (hash = window.location.hash) => {
    if (hash === "#/Explore/Publications") {
      return (
        <div className="explore-publications">
          <this.props.SynapseComponents.Markdown
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
          activeObject={this.state.activeObject}
          SynapseConstants={this.props.SynapseConstants}
          SynapseComponents={this.props.SynapseComponents}
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
            <Selectors
              returnButtonClass={this.returnButtonClass}
              handleChanges={this.handleChanges}
              handleButtonPress={this.handleButtonPress}
            />
          </div>
          {this.returnSynapseChart()}
        </div>
      )
    }
    return <div />
  };

  style = () => {
    if (window.location.hash.includes("/Programs/")) {
      return { display: "none" }
    }
    return { display: "block" }
  };

  render() {
    return (
      <section className="page explore" style={this.style()}>
        <div className="container">
          <div className="row">
            <h2 className="header">
              Explore
              {` ${this.state.activeObject.name}`}
            </h2>
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
  token: PropTypes.string,
  SynapseConstants: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}
Explore.defaultProps = {
  token: "",
}

export default Explore

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SynapseChart from './SynapseChartAndCards.jsx'
import Selectors from './SelectorRow'

import {
  clone,
  synapseObjects,
  returnSynapseObject,
  setSynapseValue,
} from '../library/synapseObjects'

let loadedObjects

class Explore extends Component {
  state = {
    activeButton: '',
    activeObject: {},
  };

  componentDidMount() {
    if (!this.props.hash.includes('/Explore/Programs/')) {
      this.loadDefaultComponent()
    }
  }

  componentDidUpdate() {
    if (!this.props.hash.includes('/Explore/Programs/')) {
      if (
        Object.keys(this.state.activeObject).length === 0
        && this.state.activeObject.constructor === Object
      ) {
        this.loadDefaultComponent()
      }
    }
    return true
  }

  loadDefaultComponent = () => {
    if (!this.props.hash.includes('/Explore/Programs/')) {
      console.log(window.location.hash)
      loadedObjects = clone(synapseObjects)
      // studies
      setSynapseValue(loadedObjects, 'syn17083367', 'filter', 'projectStatus')
      // publications
      setSynapseValue(loadedObjects, 'syn2580853', 'filter', 'id')

      if (window.location.hash !== '#/Explore') {
        this.setActiveValues(window.location.hash, 'id')
      } else this.handleButtonPress('syn17024112')
    }
  };

  setActiveValues = (hash) => {
    let id
    switch (hash) {
    case '#/Explore':
      id = 'syn11346063'
      break
    case '#/Explore/Data':
      id = 'syn11346063'
      break
    case '#/Explore/Studies':
      //syn9886254
      id = 'syn17083367'
      break
    case '#/Explore/Publications':
      id = 'syn2580853'
      break
    case '#/Explore/Programs':
      id = 'syn17024173'
      break
    case '#/Explore/Projects':
      id = 'syn17024229'
      break
    case '#/Explore/People':
      id = 'syn13897207'
      break
    case hash.includes('/Studies/'):
      id = 'lowerPage'
      break
    case hash.includes('/Programs/'):
      id = 'lowerPage'
      break
    default:
      id = 'syn11346063'
    }

    if (!this.props.hash.includes('/Programs/')) {
      this.handleButtonPress(id)
    }
    return id
  };

  changeRoute = (url) => {
    this.props.history.push(url)
  };

  replaceRoute = (url) => {
    this.props.history.replace(url)
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
        this.replaceRoute(activeObject.hash)
      },
    )
    return ''
  };

  returnButtonClass = (id) => {
    return `btn-control ${this.state.activeButton === id ? 'active' : ''}`
  };

  hideBarSection = () => {
    const hash = window.location.hash
    if (hash === '#/Explore') {
      return ''
    }
    if (hash !== '#/') {
      return ''
    }
    return ''
  };

  returnWikiData = (synId, wikiId) => {
    if (this.props.token) {
      return (
        <div className="explore-publications">
          <this.props.SynapseComponents.Markdown
            token={this.props.token}
            ownerId={synId}
            wikiId={wikiId}
          />
        </div>
      )
    }
    if (this.props.defaultData.explorePublications) {
      return (
        <div className="explore-publications">
          <this.props.SynapseComponents.Markdown
            ownerId={synId}
            wikiId={wikiId}
            markdown={this.props.defaultData.explorePublications.markdown}
          />
        </div>
      )
    }
    return <div />
  };

  returnSynapseChart = (hash = window.location.hash) => {
    if (!window.location.hash.includes('/Explore/Programs/')) {
      if (hash === '#/Explore/Publications') {
        return this.returnWikiData('syn2580853', '409850')
      }
      if (
        this.props.synapseLoaded
        || window.location.hash === '#/Explore/Programs'
      ) {
        return (
          <div className="synapse-chart">
            <SynapseChart
              token={this.props.token}
              activeObject={this.state.activeObject}
              SynapseConstants={this.props.SynapseConstants}
              SynapseComponents={this.props.SynapseComponents}
              synapseLoaded={this.props.synapseLoaded}
              defaultData={this.props.defaultData}
            />
          </div>
        )
      }
      if (!this.props.synapseLoaded) {
        return (
          <div className="synapse-chart">
            <p>Synapse is offline right now</p>
          </div>
        )
      }
    }
    return <div />
  };

  SelectorsAndCharts = () => {
    if (
      !window.location.hash.includes('/Studies/')
      && !window.location.hash.includes('/Projects/')
      && !window.location.hash.includes('/Programs/')
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
    if (window.location.hash.includes('/Programs/')) {
      return { display: 'none' }
    }
    return { display: 'block' }
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
  hash: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  synapseLoaded: PropTypes.bool.isRequired,
}
Explore.defaultProps = {
  token: '',
}

export default Explore

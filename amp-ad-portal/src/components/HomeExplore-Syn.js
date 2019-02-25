import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SynapseChart from './SynapseChartAndCards.jsx'
import {
  clone,
  synapseObjects,
  returnSynapseObject
} from '../library/synapseObjects'
import ButtonExplore from './Button-Explore'

import Selectors from './SelectorRow'

let loadedObject = []

class ExploreContent extends Component {
  state = {
    activeId: '',
    synObject: {},
    name: '',
  };

  componentDidMount() {
    loadedObject = clone(synapseObjects)
    this.handleButtonPress('syn11346063', this.handleChanges)
  }

  handleChanges = (stateObject) => {
    this.setState(stateObject)
  };

  handleButtonPress = (value, handleChanges) => {
    const synObject = returnSynapseObject(loadedObject, value)
    const name = synObject.name

    synObject.table = false
    synObject.cards = false
    synObject.barChart = true
    synObject.homescreen = true

    handleChanges({
      activeId: value,
      synObject,
      name,
    })
    return ''
  };

  returnButtonClass = (id) => {
    return `btn-control ${this.state.activeId === id ? 'active' : ''}`
  };

  returnSynapseChart = () => {
    if (this.state.activeId === 'syn2580853') {
      return (
        <div>
          <this.props.SynapseComponents.Markdown
            ownerId="syn2580853"
            wikiId="409850"
            sql={this.state.sql}
          />
        </div>
      )
    }
    if (this.state.synObject) {
      return (
        <div className="synapse-chart">
          <SynapseChart
            filter={this.state.synObject.filter}
            activeObject={this.state.synObject}
            SynapseConstants={this.props.SynapseConstants}
            SynapseComponents={this.props.SynapseComponents}
          />
        </div>
      )
    }
    return (
      <div className="synapse-chart">
        <p>Synapse is offline right now</p>
      </div>
    )
  };

  barChartStyle = () => {
    return {
      height: this.state.activeId === 'syn2580853' ? '100%' : '220px',
      position: 'relative',
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
                returnButtonClass={this.returnButtonClass}
                handleChanges={this.handleChanges}
                handleButtonPress={this.handleButtonPress}
              />
            </div>
            {this.returnSynapseChart()}
            <div className="row explore-button-row">
              <div className="col-xs-12">
                <ButtonExplore
                  url={this.state.synObject.hash}
                  label={this.state.name}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ExploreContent.propTypes = {
  token: PropTypes.string,
  SynapseComponents: PropTypes.object.isRequired,
  SynapseConstants: PropTypes.object.isRequired,
}

ExploreContent.defaultProps = {
  token: '',
}

export default ExploreContent

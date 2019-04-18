import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BarLoader } from 'react-spinners'

class SynapseChartAndCards extends Component {
  state = {};

  buildQuery = (sql = this.props.activeObject.sql) => {
    return {
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      query: {
        isConsistent: false,
        includeEntityEtag: true,
        sql,
        limit: 100,
        offset: 0,
      },

      partMask:
        this.props.SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
        | this.props.SynapseConstants.BUNDLE_MASK_QUERY_FACETS
        | this.props.SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
    }
  };

  returnStackedRow = () => {
    if (
      this.props.activeObject.homescreen
      || this.props.activeObject.barChart
      ) {
      return (
        <div className={this.props.activeObject.name}>
          <this.props.SynapseComponents.QueryWrapper
            initQueryRequest={this.buildQuery()}
            token={this.props.token}
            facetName={this.props.activeObject.filter}
            rgbIndex={this.props.activeObject.color}
            unitDescription={this.props.activeObject.description}
          >
            <this.props.SynapseComponents.StackedBarChart
              loadingScreen={(
                <div
                  className="bar-loader"
                  style={{
                    textAlign: 'center',
                    width: '100px',
                    margin: '0px auto',
                  }}
                >
                  <BarLoader color="#4DB7AD" loading />
                </div>
              )}
            />
            {this.returnFacets()}
          </this.props.SynapseComponents.QueryWrapper>
        </div>
      )
    }
    return <div />
  };

  returnFacets = () => {
    if (this.props.activeObject.facets && !this.props.activeObject.homescreen) {
      return <this.props.SynapseComponents.Facets />
    }
    return <div />
  };

  returnSynapseCards = () => {
    if (this.props.activeObject.cards && !this.props.activeObject.homescreen) {
      return (
        <div className="program-card-container col-xs-12">
          <this.props.SynapseComponents.CardContainerLogic
            sql={this.props.activeObject.sql}
            type={this.props.SynapseConstants[this.props.activeObject.type]}
            unitDescription="programs"
          />
        </div>
      )
    }
    return <div />
  };

  returnType = () => {
    const typeString = this.props.SynapseConstants[
      this.props.activeObject.type
    ]
    return typeString
  };

  returnQueryWrapperMenu = () => {
    if (!this.props.activeObject.homescreen && this.props.activeObject.menu) {
      return (
        <div>
          <this.props.SynapseComponents.QueryWrapperMenu
            token={this.props.token}
            menuConfig={this.props.activeObject.menuConfig}
            rgbIndex={this.props.activeObject.color}
            type={this.returnType()}
            loadingScreen={(
              <div
                className="bar-loader"
                style={{
                  textAlign: 'center',
                  width: '100px',
                  margin: '0px auto',
                }}
              >
                <BarLoader color="#4DB7AD" loading />
              </div>
            )}
          />
        </div>
      )
    }
    return <div className="no-bar-chart" />
  };

  render() {
    if (this.props.activeObject.id !== undefined) {
      return (
        <div>
          <div className="bar-section">
            {this.returnStackedRow()}
            {this.returnQueryWrapperMenu()}
            {this.returnSynapseCards()}
          </div>
        </div>
      )
    }
    return <div />
  }
}

SynapseChartAndCards.propTypes = {
  token: PropTypes.string,
  activeObject: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
  SynapseConstants: PropTypes.object.isRequired,
  defaultData: PropTypes.object.isRequired,
}

SynapseChartAndCards.defaultProps = {
  token: '',
}

export default SynapseChartAndCards

import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents, SynapseConstants } from "synapse-react-client"
import { BarLoader } from "react-spinners"

class SynapseBarChart extends Component {
  state = {};

  shouldComponentUpdate(nextProps) {
    if (this.props.activeObject.id !== nextProps.activeObject.id) {
      return true
    }
    return true
  }

  buildQuery = (sql = this.props.activeObject.sql) => {
    return {
      concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
      query: {
        isConsistent: false,
        includeEntityEtag: true,
        sql,
        limit: 100,
        offset: 0,
      },

      partMask:
        SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
        | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
        | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
    }
  };

  hideBarSection = () => {
    const hash = window.location.hash
    if (hash === "#/Explore" || hash === "#/") {
      return "bar-section"
    }
    return "bar-section"
  };

  returnStackedRow = () => {
    if (this.props.activeObject.barChart) {
      return (
        <SynapseComponents.QueryWrapper
          initQueryRequest={this.buildQuery()}
          token={this.props.token}
          facetName={this.props.activeObject.filter}
          rgbIndex={this.props.activeObject.color}
        >
          <SynapseComponents.StackedRowHomebrew
            loadingScreen={(
              <div className="bar-loader" style={{ paddingLeft: "33%" }}>
                <BarLoader color="#4DB7AD" loading />
              </div>
            )}
          />
        </SynapseComponents.QueryWrapper>
      )
    }
    return <div />
  };

  returnFacets = () => {
    if (this.props.activeObject.facets && !this.props.activeObject.homescreen) {
      return <SynapseComponents.Facets />
    }
    return <div />
  };

  returnSynapseCards = () => {
    if (this.props.activeObject.cards && !this.props.activeObject.homescreen) {
      return (
        <SynapseComponents.StaticQueryWrapper
          sql={this.props.activeObject.sql}
          token={this.props.token}
        >
          <SynapseComponents.SynapseTableCardView
            type={SynapseConstants[this.props.activeObject.type]}
          />
        </SynapseComponents.StaticQueryWrapper>
      )
    }
    return <div />
  };

  returnQueryWrapperMenu = () => {
    if (!this.props.activeObject.homescreen && this.props.activeObject.menu) {
      return (
        <div>
          <SynapseComponents.QueryWrapperMenu
            token={this.props.token}
            menuConfig={this.props.activeObject.menuConfig}
            rgbIndex={this.props.activeObject.color}
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
          <div className={`${this.hideBarSection()}`}>
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

SynapseBarChart.propTypes = {
  token: PropTypes.string,
  activeObject: PropTypes.object.isRequired,
}

SynapseBarChart.defaultProps = {
  token: "",
}

export default SynapseBarChart

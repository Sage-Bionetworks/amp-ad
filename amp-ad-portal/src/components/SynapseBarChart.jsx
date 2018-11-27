import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents, SynapseConstants } from "synapse-react-client"
import { BarLoader } from "react-spinners"

class SynapseBarChart extends Component {
  state = {};

  buildQuery = (sql = this.props.sql) => {
    return {
      concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
      partMask:
        SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
        | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
        | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
      query: {
        isConsistent: false,
        sql,
        limit: 25,
        offset: 0,
      },
    }
  };

  hideBarSection = () => {
    const hash = window.location.hash
    if (hash === "#/Explore" || hash === "#/") {
      return "bar-section"
    }
    return "bar-section"
  };

  returnQueryBarChart = () => {
    if (this.props.sql && this.props.barChart) {
      const query = this.buildQuery()
      console.log(this.props.token, this.props.filter)
      return (
        <SynapseComponents.QueryWrapper
          initQueryRequest={query}
          token={this.props.token}
          filter={this.props.filter}
          rgbIndex={this.props.rgbindex}
          showMenu={false}
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
    return <div className="no-bar-chart" />
  };

  returnQueryWrapperMenu = () => {
    if (this.props.table) {
      return (
        <div>
          <SynapseComponents.QueryWrapperMenu
            token={this.props.token}
            menuConfig={[
              {
                sql: this.props.sql,
                title: this.props.name,
                synapseId: this.props.synId,
                facetName: this.props.filter,
                unitDescription: "data types",
              },
            ]}
            rgbIndex={this.props.rgbindex}
          />
        </div>
      )
    }
    return <div className="no-bar-chart" />
  };

  render() {
    if (this.props.synId !== undefined) {
      return (
        <div>
          <div className={`${this.hideBarSection()}`}>
            {this.returnQueryBarChart()}
            {this.returnQueryWrapperMenu()}
          </div>
        </div>
      )
    }
    return <div />
  }
}

SynapseBarChart.propTypes = {
  token: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  rgbindex: PropTypes.number,
  synId: PropTypes.string.isRequired,
  barChart: PropTypes.bool,
  facets: PropTypes.bool,
  table: PropTypes.bool,
  columns: PropTypes.number,
  limit: PropTypes.number,
  json: PropTypes.object,
  type: PropTypes.string,
  hideOrganizationLink: PropTypes.bool,
  sql: PropTypes.string,
  name: PropTypes.string,
}

SynapseBarChart.defaultProps = {
  barChart: false,
  facets: false,
  table: false,
  columns: 1,
  limit: 0,
  rgbindex: 0,
  sql: "",
  name: "",
  json: {},
  type: "STUDY",
  hideOrganizationLink: false,
}

export default SynapseBarChart

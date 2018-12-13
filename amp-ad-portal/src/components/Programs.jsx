import React, { Component } from "react"
import PropTypes from "prop-types"
//import { BarLoader } from "react-spinners"
//import { getTable } from "../queries/queryForData"

class Programs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleChanges = (stateKey, updatedState) => {
    this.setState({
      [stateKey]: updatedState,
    })
  };

  //updateLoadState={() => this.handleChanges("loading", false)}
  QueryWrapper = () => {
    let json
    let sql
    let token
    if (this.props.token) {
      token = this.props.token
      sql = "SELECT * FROM syn17024173"
      json = false
      return (
        <div className="query-wrapper">
          <this.props.SynapseComponents.StaticQueryWrapper
            sql={sql}
            token={token}
          >
            <this.props.SynapseComponents.SynapseTableCardView
              type={this.props.SynapseConstants.AMP_CONSORTIUM}
            />
          </this.props.SynapseComponents.StaticQueryWrapper>
        </div>
      )
    }
    if (!this.props.token) {
      token = false
      sql = false
      json = this.props.defaultData.syn17024173
      return (
        <div className="query-wrapper">
          <this.props.SynapseComponents.StaticQueryWrapper
            sql={sql}
            token={token}
            json={json}
          >
            <this.props.SynapseComponents.SynapseTableCardView
              type={this.props.SynapseConstants.AMP_CONSORTIUM}
            />
          </this.props.SynapseComponents.StaticQueryWrapper>
        </div>
      )
    }
    return <div />
  };

  //<BarLoader color="#5BB0B5" loading={this.state.loading} />
  render() {
    return (
      <section className="programs flex-row">
        <div className="flex-col-full content-row-width">
          <div className="title-row between-xs">
            <div className="">
              <h2 className="header">Programs</h2>
            </div>
          </div>
          <this.QueryWrapper />
        </div>
      </section>
    )
  }
}

Programs.propTypes = {
  token: PropTypes.string,
  SynapseConstants: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}
Programs.defaultProps = {
  token: "",
}

export default Programs

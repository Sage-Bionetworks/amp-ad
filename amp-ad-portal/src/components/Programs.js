import React, { Component } from "react"
import { SynapseComponents, SynapseConstants } from "synapse-react-client"
import PropTypes from "prop-types"
import { BarLoader } from "react-spinners"

import { getTable } from "../queries/queryForData"

class Programs extends Component {
  state = {
    json: "",
    loading: true,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.state.json === "") {
      getTable(
        "syn17024173",
        this.props.token,
        "SELECT * FROM syn17024173",
      ).then((json) => {
        this.setState({
          json,
          loading: false,
        })
      })
      return false
    }
    return true
  }

  QueryWrapper = () => {
    if (this.state.json) {
      return (
        <SynapseComponents.StaticQueryWrapper json={this.state.json}>
          <SynapseComponents.SynapseTableCardView
            type={SynapseConstants.AMP_CONSORTIUM}
          />
        </SynapseComponents.StaticQueryWrapper>
      )
    }
    return (
      <div className="bar-loader" style={{ paddingLeft: "33%" }}>
        <BarLoader color="#4DB7AD" loading={this.state.loading} />
      </div>
    )
  };

  render() {
    return (
      <section className="programs flex-row">
        <div className="flex-col-full content-row-width">
          <div className="title-row between-xs">
            <div className="">
              <h2>Programs</h2>
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
}
Programs.defaultProps = {
  token: "",
}

export default Programs

import React, { Component } from "react"
import { SynapseComponents, SynapseConstants } from "synapse-react-client"
import PropTypes from "prop-types"
import { BarLoader } from "react-spinners"

import { getTable } from "../queries/queryForData"

class Programs extends Component {
  QueryWrapper = () => {
    return (
      <SynapseComponents.StaticQueryWrapper
        sql="SELECT * FROM syn17024173"
        token={this.props.token}
      >
        <SynapseComponents.SynapseTableCardView
          type={SynapseConstants.AMP_CONSORTIUM}
        />
      </SynapseComponents.StaticQueryWrapper>
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

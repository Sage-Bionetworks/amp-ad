import React, { Component } from "react"
import PropTypes from "prop-types"
//import { SynapseComponents } from "synapse-react-client"
import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class WhatIsAmpAD extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581940")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>AMP-AD Knowledge Portal</h2>
            </div>
          </section>
              <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
          <section className="row around-xs page-content">
            <div className="col-xs-12 col-sm-9">
            </div>
          </section>
        </div>
      </div>
    )
  }
}

WhatIsAmpAD.propTypes = {
  markdown: PropTypes.string.isRequired,
  token: PropTypes.object.isRequired,
}

export default WhatIsAmpAD

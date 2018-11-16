import React, { Component } from "react"
import PropTypes from "prop-types"
//import { SynapseComponents } from "synapse-react-client"
import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class WhatIsAmpAD extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581939")
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  render() {
    return (
      <div className="container about research-page">
        <div className="">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-8 col-centered content-row-width">
              <h2>AMP-AD Knowledge Portal</h2>
            </div>
          </section>
          <section className="row">
            <div className="col-xs-12 col-sm-8 col-centered">
              <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

WhatIsAmpAD.propTypes = {
  markdown: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
  //token: PropTypes.object.isRequired,
}

export default WhatIsAmpAD

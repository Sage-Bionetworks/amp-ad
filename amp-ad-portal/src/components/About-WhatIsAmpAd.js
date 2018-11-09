import React, { Component } from "react"
import PropTypes from "prop-types"
//import { SynapseComponents } from "synapse-react-client"
import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class WhatIsAmpAD extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581940")
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  render() {
    return (
      <div className="flex-row about research-page">
        <div className="flex-row">
          <section className="container flex-row center-xs child-page-hero">
            <div className="flex-col-9 between-xs content-row-width">
              <h2>AMP-AD Knowledge Portal</h2>
            </div>
          </section>
          <div className="container old-markdown">
            <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
          </div>
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

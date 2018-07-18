import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class DataUse extends Component {
  componentDidMount() {
    getMarkdown(this.props, "576286")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
Data Use Requirements
              </h2>
              <p>
                Data is stored in Synapse, a collaborative research platform. To
                access the data you&apos;ll create an account on Synapse, accept
                the data&apos;s terms of use, and agree to acknowledge the data
                contributors.
              </p>
            </div>
          </section>
          <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
        </div>
      </div>
    )
  }
}

DataUse.propTypes = {
  markdown: PropTypes.string.isRequired,
}

export default DataUse

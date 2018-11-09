import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class DataUse extends Component {
  componentDidMount() {
    getMarkdown(this.props, "576286")
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="flex-row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>Data Access and Use Requirements</h2>
              <p>
                AMP-AD Knowledge Portal data and analyses are stored in Synapse,
                a collaborative research platform. Please follow the
                instructions below in order to gain access.
              </p>
            </div>
          </section>
          <div className="old-markdown container">
            <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
          </div>
        </div>
      </div>
    )
  }
}

DataUse.propTypes = {
  markdown: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default DataUse

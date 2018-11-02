import React, { Component } from "react"
import PropTypes from "prop-types"
import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class AcknowledgementStatements extends Component {
  componentDidMount() {
    getMarkdown(this.props, "584597", undefined, "syn2580853")
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>Acknowledgement Statements</h2>
              <p />
            </div>
          </section>
          <section className="row center-xs content-section">
            <div className="col-xs-12 col-sm-9">
              <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

AcknowledgementStatements.propTypes = {
  markdown: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default AcknowledgementStatements

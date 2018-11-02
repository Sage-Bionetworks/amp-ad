import React, { Component } from "react"
import PropTypes from "prop-types"
import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class ConsortiaGenetics extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581927")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>Collaborative Genetics Projects</h2>
              <p>
                This page provides a summary of cross-consortia studies on
                genetic and expression quantitative trait locus (eQTL) analyses.
              </p>
            </div>
          </section>
          <section className="row center-xs content-section page-content">
            <div className="col-xs-12 col-sm-9">
              <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

ConsortiaGenetics.propTypes = {
  markdown: PropTypes.string.isRequired,
}

export default ConsortiaGenetics

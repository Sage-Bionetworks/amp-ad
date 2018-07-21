import React, { Component } from "react"
import PropTypes from "prop-types"
import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class ConsortiaDifferentialEx extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581928")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
Collaborative Differential Expression Projects
              </h2>
              <p>
                This page provides a summary of cross-consortia RNA-seq
                differential expression meta-analysis efforts.
              </p>
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

ConsortiaDifferentialEx.propTypes = {
  markdown: PropTypes.array.isRequired,
}

export default ConsortiaDifferentialEx

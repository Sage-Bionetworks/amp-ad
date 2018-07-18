import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class ProgramsResilienceAD extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581898")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
Resilience Program
              </h2>
              <p>
                Understand the mechanisms by which gene-environment interactions
                lead to cognitive resilience in the presence of high risk for
                disease.
              </p>
            </div>
          </section>
          <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
        </div>
      </div>
    )
  }
}

ProgramsResilienceAD.propTypes = {
  markdown: PropTypes.string.isRequired,
}

export default ProgramsResilienceAD

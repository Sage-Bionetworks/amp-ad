import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class ProgramsAmpAd extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581895")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
                AMP-AD Target Discovery and Preclinical Validation Program
              </h2>
              <p>
                Reduce time to discovery of drugs and potential drug targets for
                AD treatment and prevention through analyses, network modeling,
                and experimental validation of large-scale molecular data from
                human brain samples.
              </p>
            </div>
          </section>
          <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
        </div>
      </div>
    )
  }
}

ProgramsAmpAd.propTypes = {
  markdown: PropTypes.string.isRequired,
}

export default ProgramsAmpAd

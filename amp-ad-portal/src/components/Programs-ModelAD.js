import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class ProgramsModelAd extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581896")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row around-xs breadcrumbs">
            <div className="col-xs-10">
              <p>
Research &gt; Modal AD Program
              </p>
            </div>
          </section>
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
Modal AD Program
              </h2>
              <p>
                Bridge the preclinical to clinical development gap by developing
                AD animal models and a process for rigorous preclinical efficacy
                testing of biomarkers.
              </p>
            </div>
          </section>
          <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
        </div>
      </div>
    )
  }
}

ProgramsModelAd.propTypes = {
  markdown: PropTypes.string.isRequired,
}

export default ProgramsModelAd

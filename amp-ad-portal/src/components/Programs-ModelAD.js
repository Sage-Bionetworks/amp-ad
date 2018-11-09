import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown, getWikiMarkdownSegments } from "../queries/getWikiData"
import { printShowHideSections } from "../model/HandleMarkdown"

const ReactMarkdown = require("react-markdown")

class ProgramsModelAd extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581896")
    if (this.props.markdownSegs.length === 0) {
      getWikiMarkdownSegments(
        "581896",
        "syn12666371",
        "programsModelAd",
        this.props.token.sessionToken,
        this.props.handleNestedChanges,
        false,
      )
    }
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  render() {
    return (
      <div className="row about research-page program">
        <div className="flex-row">
          <section className="flex-row center-xs child-page-hero">
            <div className="flex-col-9 between-xs content-row-width">
              <h2>Model AD Program</h2>
              <p>
                Bridge the preclinical to clinical development gap by developing
                AD animal models and a process for rigorous preclinical efficacy
                testing of biomarkers.
              </p>
            </div>
          </section>
          <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
          <section className="row center-xs content-row">
            <div className="col-xs-12 col-sm-9">
              <h2>Projects</h2>
              {printShowHideSections(this.props.markdownSegs)}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

ProgramsModelAd.propTypes = {
  markdown: PropTypes.string.isRequired,
  markdownSegs: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default ProgramsModelAd

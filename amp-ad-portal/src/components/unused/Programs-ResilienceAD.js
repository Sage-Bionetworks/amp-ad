import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown, getWikiMarkdownSegments } from "../queries/getWikiData"
import { printShowHideSections } from "../model/HandleMarkdown"

const ReactMarkdown = require("react-markdown")

class ProgramsResilienceAD extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581898")
    if (this.props.markdownSegs.length === 0) {
      getWikiMarkdownSegments(
        "581898",
        "syn12666371",
        "programsResilienceAD",
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
      <div className="flex-row about research-page">
        <div className="flex-row">
          <section className="container flex-row center-xs child-page-hero">
            <div className="flex-col-9 between-xs content-row-width">
              <h2>Resilience-AD Program</h2>
              <p>
                Understand the mechanisms by which gene-environment interactions
                lead to cognitive resilience in the presence of high risk for
                disease.
              </p>
            </div>
          </section>
          <div className="container old-markdown">
            <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
          </div>
          <section className="about-section flex-row">
            <div className="flex-col-full content-row">
              <div className="between-xs title-row">
                <h2>Projects</h2>
              </div>
              <div className="flex-col-9">
                {printShowHideSections(this.props.markdownSegs)}
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

ProgramsResilienceAD.propTypes = {
  markdown: PropTypes.string.isRequired,
  markdownSegs: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default ProgramsResilienceAD

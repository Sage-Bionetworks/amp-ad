import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown, getWikiMarkdownSegments } from "../queries/getWikiData"
import { printShowHideSections } from "../model/HandleMarkdown"

const ReactMarkdown = require("react-markdown")

class ProgramsM2OVE extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581894")
    if (this.props.markdownSegs.length === 0) {
      getWikiMarkdownSegments(
        "581894",
        "syn12666371",
        "programsM2OVE",
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
              <h2>M2OVE-AD</h2>
              <p>
                Generate a deeper understanding of the phenotypes of risk and
                the molecular mechanisms linking vascular risk factors,
                cerebrovascular disease and AD.
              </p>
            </div>
          </section>
          <div className="container">
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

ProgramsM2OVE.propTypes = {
  markdown: PropTypes.string.isRequired,
  markdownSegs: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default ProgramsM2OVE

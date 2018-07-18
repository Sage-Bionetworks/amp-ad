import React, { Component } from "react"
import PropTypes from "prop-types"

import {
  getMarkdownSegment,
  getWikiMarkdownSegments,
} from "../queries/getWikiData"
import { printSections, printShowHideSections } from "../model/HandleMarkdown"

class ExperimentalResources extends Component {
  componentDidMount() {
    getWikiMarkdownSegments(
      "576287",
      "experimentalResources",
      this.props,
      "syn12666371",
    )
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
ExperimentalResources
              </h2>
              <p>
Content...
              </p>
            </div>
          </section>
          <section className="row center-xs researchers-content">
            <div className="col-xs-12 col-sm-9">
              {printSections(this.props.markdown, this.props)}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

ExperimentalResources.propTypes = {
  markdown: PropTypes.array.isRequired,
}

export default ExperimentalResources

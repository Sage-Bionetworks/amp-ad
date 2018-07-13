import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdownSegment } from "../queries/getWikiData"
import { printSections } from "../model/HandleMarkdown"

class Studies extends Component {
  componentDidMount() {
    getMarkdownSegment(this.props, "581938", "studies")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
Studies
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

Studies.propTypes = {
  markdown: PropTypes.array.isRequired,
}

export default Studies

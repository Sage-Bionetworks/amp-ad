import React, { Component } from "react"

import { getMarkdownSegment } from "../queries/getWikiData"
import { buildSection } from "../model/HandleMarkdown"

class People extends Component {
  componentDidMount() {
    getMarkdownSegment(this.props, "581933", "researchPublications")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
People
              </h2>
              <p>
Content...
              </p>
            </div>
          </section>
          <section className="row center-xs researchers-content">
            <div className="col-xs-12 col-sm-9" />
          </section>
        </div>
      </div>
    )
  }
}

export default People

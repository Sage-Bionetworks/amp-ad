import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdownSegment } from "../queries/getWikiData"
import { printSections } from "../model/HandleMarkdown"

class ResearchPublications extends Component {
  componentDidMount() {
    getMarkdownSegment(
      this.props.handleNestedChanges,
      this.props.token.sessionToken,
      "409850",
      "syn2580853",
      "researchPublications",
    )
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  render() {
    return (
      <div className="row about research-publications">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <p>
                Below are selected publications stemming from grants from the
                AMP-AD, MODEL-AD, M2OVE-AD, and Resilience-AD programs. For a
                full list of publications resulting from these grants see
                {" "}
                <a href="https://www.ncbi.nlm.nih.gov/pubmed?term=((AG046152%5BGrant%20Number%5D%20OR%20AG046170%5BGrant%20Number%5D%20OR%20AG046139%5BGrant%20Number%5D%20OR%20AG046161%5BGrant%20Number%5D%20OR%20AG046174%5BGrant%20Number%5D%20OR%20AG046171%5BGrant%20Number%5D%20OR%20AG051556%5BGrant%20Number%5D%20OR%20AG051504%5BGrant%20Number%5D%20OR%20AG051633%5BGrant%20Number%5D%20OR%20AG051550%5BGrant%20Number%5D%20OR%20AG051554%5BGrant%20Number%5D%20OR%20NS096730%5BGrant%20Number%5D%20OR%20AG054345%5BGrant%20Number%5D%20OR%20AG057907%5BGrant%20Number%5D%20OR%20AG057909%5BGrant%20Number%5D%20OR%20AG057911%5BGrant%20Number%5D%20OR%20AG057912%5BGrant%20Number%5D%20OR%20AG057914%5BGrant%20Number%5D%20OR%20AG054349%5BGrant%20Number%5D))">
                  {" "}
                  PubMed.
                </a>
              </p>
            </div>
          </section>
          <section className="row center-xs researchers-content page-content">
            <div className="col-xs-12 col-sm-9 hide-first-child-h4 hide-first-child">
              {printSections(this.props.markdown)}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

ResearchPublications.propTypes = {
  markdown: PropTypes.array.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default ResearchPublications

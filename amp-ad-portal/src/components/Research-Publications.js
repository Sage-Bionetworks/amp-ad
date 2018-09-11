import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdownSegment } from "../queries/getWikiData"
import { printSections } from "../model/HandleMarkdown"

class ResearchPublications extends Component {
  componentDidMount() {
    getMarkdownSegment(this.props, "581933", "researchPublications")
  }

  render() {
    return (
      <div className="row about research-publications">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>Publications</h2>
              <p>
                Below are selected publications stemming from grants from the
                AMP-AD, MODEL-AD, M2OVE-AD, and Resilience programs. For a full
                list of publications resulting from these grants see
                {" "}
                <a href="https://www.ncbi.nlm.nih.gov/pubmed?term=((AG046152%5BGrant%20Number%5D%20OR%20AG046170%5BGrant%20Number%5D%20OR%20AG046139%5BGrant%20Number%5D%20OR%20AG046161%5BGrant%20Number%5D%20OR%20AG046174%5BGrant%20Number%5D%20OR%20AG046171%5BGrant%20Number%5D%20OR%20AG051556%5BGrant%20Number%5D%20OR%20AG051504%5BGrant%20Number%5D%20OR%20AG051633%5BGrant%20Number%5D%20OR%20AG051550%5BGrant%20Number%5D%20OR%20AG051554%5BGrant%20Number%5D%20OR%20NS096730%5BGrant%20Number%5D%20OR%20AG054345%5BGrant%20Number%5D%20OR%20AG057907%5BGrant%20Number%5D%20OR%20AG057909%5BGrant%20Number%5D%20OR%20AG057911%5BGrant%20Number%5D%20OR%20AG057912%5BGrant%20Number%5D%20OR%20AG057914%5BGrant%20Number%5D%20OR%20AG054349%5BGrant%20Number%5D))">
                  {" "}
                  PubMed.
                </a>
              </p>
            </div>
          </section>
          <section className="row center-xs researchers-content">
            <div className="col-xs-12 col-sm-9">
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
}

export default ResearchPublications

import React, { Component } from "react"
import PropTypes from "prop-types"

import { getTable } from "../queries/queryForData"
import {
  //getWikiMarkdownSegments,
  //getSubPageHeaders,
  //getWikiHeaderTree,
  getEntityHeader,
} from "../queries/getWikiData"
import { printSections } from "../model/HandleMarkdown"
//import { getColumnNameIndex } from "../controller/PrepRawSynapseData"

class Studies extends Component {
  componentDidMount() {
    //getMarkdownSegment(this.props, "409848", "studies")
    //getWikiMarkdownSegments("581938", "studies", this.props, "syn12666371")
    getTable("syn9886254", this.props.token, "SELECT * FROM syn9886254").then(
      (response) => {
        //getColumnNameIndex(response, "Study")
        console.log(response)
      },
    )
    //getWikiHeaderTree(this.props.token.sessionToken, "syn12666371")
    getEntityHeader(this.props.token.sessionToken, "syn9702085")
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
  token: PropTypes.object.isRequired,
}

export default Studies

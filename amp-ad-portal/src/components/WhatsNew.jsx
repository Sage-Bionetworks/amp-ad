import React, { Component } from "react"
import PropTypes from "prop-types"
import { getWikiMarkdownSegments } from "../queries/getWikiData"
import { printSections } from "../model/HandleMarkdown"

class WhatsNew extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    getWikiMarkdownSegments(
      "582408",
      "whatsNew",
      this.props,
      "syn12666371",
      131,
      50,
    )
  }

  render() {
    return (
      <section className="what-new row">
        <div className="content col-xs-12 col-sm-10">
          <div className="row title-row">
            <div className="col-xs-12">
              <h2>What&apos;s New</h2>
            </div>
          </div>

          {printSections(this.props.markdown, undefined, 3)}
        </div>
      </section>
    )
  }
}

WhatsNew.propTypes = {
  markdown: PropTypes.array.isRequired,
}

export default WhatsNew

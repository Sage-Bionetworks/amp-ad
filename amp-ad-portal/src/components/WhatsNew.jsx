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
      "syn12666371",
      "whatsNew",
      this.props.token.sessionToken,
      this.props.handleNestedChanges,
      131,
      50,
    )
  }

  render() {
    return (
      <section className="what-new flex-row">
        <div className="content-row-width flex-col-full">
          <div className="title-row between-xs">
            <div className="">
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
  token: PropTypes.object.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
}

export default WhatsNew

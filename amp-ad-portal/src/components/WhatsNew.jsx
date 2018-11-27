import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents } from "synapse-react-client"
import { getWikiMarkdownSegments } from "../queries/getWikiData"
import { printSections } from "../model/HandleMarkdown"

//const newsIds = ["582438", "582442", "582439"]

class WhatsNew extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (this.props.token) {
      getWikiMarkdownSegments(
        "582408",
        "syn12666371",
        "whatsNew",
        this.props.token,
        this.props.handleNestedChanges,
        131,
        50,
      )
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.token !== nextProps.token) {
      return true
    }
    if (this.props.markdown.length !== nextProps.markdown.length) {
      return true
    }
    return true
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      getWikiMarkdownSegments(
        "582408",
        "syn12666371",
        "whatsNew",
        this.props.token,
        this.props.handleNestedChanges,
        131,
        50,
      )
    }
    return true
  }

  printMarkdown = (synId, wikiIds) => {
    return wikiIds.map((id) => {
      return (
        <SynapseComponents.Markdown
          token={this.props.token}
          wikiId={id}
          ownerId={synId}
        />
      )
    })
  };

  //{this.printMarkdown("syn12666371", newsIds)}
  render() {
    return (
      <section className="what-new flex-row">
        <div className="content-row-width flex-col-full">
          <div className="title-row between-xs">
            <div className="">
              <h2>What&apos;s New</h2>
            </div>
            {printSections(this.props.markdown, undefined, 3)}
          </div>
        </div>
      </section>
    )
  }
}

WhatsNew.propTypes = {
  markdown: PropTypes.array,
  token: PropTypes.string.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
}

WhatsNew.defaultProps = {
  markdown: ["The data has failed to load"],
}

export default WhatsNew

import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "../queries/getWikiData"

//const ReactMarkdown = require("react-markdown")

class Welcome extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581935", "welcomeHeaderMarkdown")
    getMarkdown(this.props, "581936", "welcomeHeaderMarkdownText")
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  removeMarkdownDivWrapper = (markdown) => {
    let markdownString = markdown
    markdownString = markdownString.substr(10)
    markdownString = markdownString.substr(0, markdownString.length - 12)
    return markdownString
  };

  openUrl = (event, link) => {
    event.preventDefault()
    window.open(link, "_self")
  };

  //<ReactMarkdown
  //source={this.props.markdownText}
  //escapeHtml={false}
  ///>
  render() {
    return (
      <section className="row hero">
        <div className="container flex">
          <div className="row hero-message">
            <div className="col-sm-9">
              <h1>Welcome to the AMP-AD Knowledge Portal</h1>
              <p>
                Discover and download data, analyses, and tools for the study of
                Alzheimer's disease generated through the National Institute on
                Aging-led AD Translational Research Program.
              </p>
            </div>
          </div>
        </div>
        <div className="hero-background" />
      </section>
    )
  }
}

Welcome.propTypes = {
  markdown: PropTypes.string.isRequired,
  markdownText: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default Welcome

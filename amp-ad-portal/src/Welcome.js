import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "./queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class Welcome extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581935", "welcomeHeaderMarkdown")
    getMarkdown(this.props, "581936", "welcomeHeaderMarkdownText")
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

  render() {
    return (
      <section className="row welcome center-xs middle-xs">
        <div className="col-xs-12 col-sm-8 col-md-6 welcome-message">
          <h1>
Welcome to the AMP-AD Knowledge Portal
          </h1>
          <ReactMarkdown source={this.props.markdownText} escapeHtml={false} />
        </div>
        <ReactMarkdown
          source={this.props.markdown}
          className="col-xs-12 col-sm-3 welcome-data markdown-div"
          escapeHtml={false}
        />
      </section>
    )
  }
}

Welcome.propTypes = {
  markdown: PropTypes.string.isRequired,
  markdownText: PropTypes.string.isRequired,
}

export default Welcome

import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "./queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class Welcome extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581935", "welcomeHeaderMarkdown")
  }

  removeMarkdownDivWrapper = (markdown) => {
    let markdownString = markdown
    markdownString = markdownString.substr(10)
    markdownString = markdownString.substr(0, markdownString.length - 12)
    return markdownString
  };

  render() {
    return (
      <section className="row welcome center-xs middle-xs">
        <div className="col-xs-12 col-sm-8 col-md-7 welcome-message">
          <h1>
Welcome to the AMP-AD Knowledge Portal
          </h1>
          <h3>
            This portal shares data, analysis, and tools, relevant to the study
            of Alzheimer’s disease, contributed by grants funded through the
            AMP-AD, M²OVE-AD, MODEL-AD, and Resilience-AD Consortia. These are
            interconnected National Institue of Aging funded programs aiming to
            accelerate novel target and biomarker discovery and to identify
            mechanisms of disease risk and resilience.
          </h3>
          <h3>
            Use the Wall of Targets interactive results explorer to view
            information about Alzheimer’s targets nominated by AMP-AD Knowledge
            Portal investigators.
          </h3>
          <button type="button" className="btn-light">
            Explore Wall of Targets
          </button>
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
}

export default Welcome

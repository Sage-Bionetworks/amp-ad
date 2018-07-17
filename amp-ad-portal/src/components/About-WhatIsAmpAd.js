import React, { Component } from "react"
import PropTypes from "prop-types"
import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class WhatIsAmpAD extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581940")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
AMP-AD Knowledge Portal
              </h2>
              <p>
                AMP-AD is a precompetitive public private partnership led by the
                National Institutes for Health’s (NIH) National Institute on
                Aging (NIA) and managed by the Foundation for the NIH (FNIH).
                AMP-AD brings together the government, industry and non-profit
                sectors to transform the way disease-relevant therapeutic
                targets are discovered and validated.
              </p>
            </div>
          </section>
          <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
        </div>
      </div>
    )
  }
}

WhatIsAmpAD.propTypes = {
  markdown: PropTypes.string.isRequired,
}

export default WhatIsAmpAD

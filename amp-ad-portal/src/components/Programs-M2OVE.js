import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class ProgramsM2OVE extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581894")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row around-xs breadcrumbs">
            <div className="col-xs-10">
              <p>
Research &gt; M2OVE-AD
              </p>
            </div>
          </section>
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
M2OVE-AD
              </h2>
              <p>
                Generate a deeper understanding of the phenotypes of risk and
                the molecular mechanisms linking vascular risk factors,
                cerebrovascular disease and AD.
              </p>
            </div>
          </section>
          <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
        </div>
      </div>
    )
  }
}

ProgramsM2OVE.propTypes = {
  markdown: PropTypes.string.isRequired,
}

export default ProgramsM2OVE

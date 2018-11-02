import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown, getWikiMarkdownSegments } from "../queries/getWikiData"
import { printShowHideSections } from "../model/HandleMarkdown"

const ReactMarkdown = require("react-markdown")

class ProgramsAmpAd extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    getMarkdown(this.props, "581895")
    if (this.props.markdownSegs.length === 0) {
      getWikiMarkdownSegments(
        "581895",
        "syn12666371",
        "programsAmpAd",
        this.props.token.sessionToken,
        this.props.handleNestedChanges,
        false,
      ).then(() => {
        this.setState({
          loading: false,
        })
      })
    }
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  render() {
    return (
      <div
        className={
          !this.state.loading
            ? "row about research-page program"
            : "row about research-page program hide-section"
        }
      >
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
                AMP-AD Target Discovery and Preclinical Validation Program
              </h2>
              <p>
                Reduce time to discovery of drugs and potential drug targets for
                AD treatment and prevention through analyses, network modeling,
                and experimental validation of large-scale molecular data from
                human brain samples.
              </p>
            </div>
          </section>
          <ReactMarkdown source={this.props.markdown} escapeHtml={false} />
          <section className="row center-xs content-row">
            <div className="col-xs-12 col-sm-9">
              <h2>Projects</h2>
              {printShowHideSections(this.props.markdownSegs)}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

ProgramsAmpAd.propTypes = {
  markdown: PropTypes.string.isRequired,
  markdownSegs: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default ProgramsAmpAd

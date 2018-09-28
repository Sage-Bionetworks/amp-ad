import React, { Component } from "react"
import PropTypes from "prop-types"

import { BarLoader } from "react-spinners"
import { getWikiMarkdownSegments } from "../queries/getWikiData"
import { printShowHideSections } from "../model/HandleMarkdown"
import { detectIfUserHasScrolledToBottom } from "../view/domScripts"

class ExternalResearchers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      bottom: false,
      page: 45,
    }
  }

  componentDidMount() {
    getWikiMarkdownSegments(
      "581934",
      "externalResearchers",
      this.props,
      "syn12666371",
      45,
      30,
    ).then(() => {
      const pageCount = this.state.page + 10
      this.setState({
        loading: false,
        page: pageCount,
      })
    })

    window.addEventListener("scroll", this.handleScroll)
  }

  loadMoreMarkdownSegments = (
    atBottom = this.state.bottom,
    loading = this.state.loading,
  ) => {
    if (atBottom && !loading) {
      this.setState({
        loading: true,
      })
      const pageCount = this.state.page + 10
      getWikiMarkdownSegments(
        "581934",
        "externalResearchers",
        this.props,
        "syn12666371",
        this.state.page,
      ).then(() => {
        this.setState({
          page: pageCount,
          loading: false,
        })
      })
    }
  };

  handleScroll = () => {
    const bottomState = detectIfUserHasScrolledToBottom()
    if (this.state.page < 200 && bottomState) {
      this.setState({
        bottom: bottomState,
      })
      this.loadMoreMarkdownSegments()
    }
  };

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>Approved External Research Use</h2>
              <p>
                This page lists the research statements, names, and institutions
                of investigators approved for access to controlled data. Open
                access data does not require the submission of a research
                statement, and is therefore not listed here.
              </p>
            </div>
          </section>
          <section className="row center-xs researchers-content">
            <div className="col-xs-12 col-sm-9">
              {printShowHideSections(
                this.props.markdown,
                this.props.token.sessionToken,
              )}
            </div>
          </section>
          <div className="row center-xs">
            <BarLoader color="#47357B" loading={this.state.loading} />
          </div>
        </div>
      </div>
    )
  }
}

ExternalResearchers.propTypes = {
  markdown: PropTypes.array.isRequired,
}

export default ExternalResearchers

import React, { Component } from "react"
import PropTypes from "prop-types"

import { BarLoader } from "react-spinners"
import { getWikiMarkdownSegments } from "../queries/getWikiData"
import { printSections } from "../model/HandleMarkdown"

class ExperimentalResources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    getWikiMarkdownSegments(
      "576287",
      "experimentalResources",
      this.props,
      "syn12666371",
      10,
    ).then(() => {
      this.setState({
        loading: false,
      })
    })
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
Experimental Resources
              </h2>
              <p>
                In addition to data and analysis, AMP-AD investigators
                contribute other experimental resources of value to the
                community. As these become available they will be listed on this
                page. Follow the links in the summary below for more details.
              </p>
            </div>
          </section>
          <section className="row center-xs researchers-content">
            <div className="col-xs-12 col-sm-9">
              {printSections(this.props.markdown, this.props)}
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

ExperimentalResources.propTypes = {
  markdown: PropTypes.array.isRequired,
}

export default ExperimentalResources

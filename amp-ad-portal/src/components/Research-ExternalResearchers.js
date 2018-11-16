import React, { Component } from "react"
import PropTypes from "prop-types"

import { BarLoader } from "react-spinners"
import { SynapseComponents } from "synapse-react-client"

class ExternalResearchers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="row about research-page">
        <div className="flex-row">
          <section className="flex-row center-xs child-page-hero">
            <div className="flex-col-9 between-xs content-row-width">
              <h2>Approved External Research Use</h2>
              <p>
                This page lists the research statements, names, and institutions
                of investigators approved for access to controlled data. Open
                access data does not require the submission of a research
                statement, and is therefore not listed here.
              </p>
            </div>
          </section>
          <section className="flex-row center-xs researchers-content page-content">
            <div className="flex-col-9 markdown-parent">
              <SynapseComponents.Markdown
                token={this.props.token.sessionToken}
                ownerId="syn2580853"
                wikiId="409843"
                errorMessageView={<div>error</div>}
                updateLoadState={() => {
                  this.setState({ loading: false })
                }}
              />
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

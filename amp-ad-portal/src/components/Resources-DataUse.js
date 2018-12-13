import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SynapseComponents } from 'synapse-react-client'

import { getMarkdown } from '../queries/getWikiData'

const ReactMarkdown = require('react-markdown')

class DataUse extends Component {
  state = {
    loading: false,
  };

  handleChange = (newState) => {
    this.setState(newState)
  };

  returnMarkdown = (token = this.props.token.sessionToken) => {
    if (token) {
      return (
        <SynapseComponents.Markdown
          token={token}
          ownerId="syn12666371"
          wikiId="585318"
          updateLoadState={() => this.handleChange({ loaded: true })}
        />
      )
    }
    if (!this.props.synapseLoaded && this.props.defaultData.dataInstructions) {
      return (
        <SynapseComponents.Markdown
          markdown={this.props.defaultData.dataInstructions.markdown}
          updateLoadState={() => this.handleChange({ loaded: true })}
        />
      )
    }
    return <div />
  };

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="flex-row child-page-hero center-xs">
            <div className="content">
              <h2>Data Access and Use Requirements</h2>
              <p>
                AMP-AD Knowledge Portal data and analyses are stored in Synapse,
                a collaborative research platform. Please follow the
                instructions below in order to gain access.
              </p>
            </div>
          </section>
          <div className="old-markdown container">
            <div className="flex-row">
              <div className="">
                <ReactMarkdown
                  source={this.props.markdown}
                  escapeHtml={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DataUse.propTypes = {
  markdown: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default DataUse
